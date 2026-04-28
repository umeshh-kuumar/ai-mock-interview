'use server'

import { db } from "/utils/db";
import { MockInterview, UserAnswer } from "/utils/schema";
import { chatSession } from "/utils/GeminiAIModel";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { eq, desc } from 'drizzle-orm';

export async function generateInterviewQuestions(jobPosition, jobDesc, jobExperience, userEmail) {
  const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on this information please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question with Answer in Json Format, Give "Question" and "Answer" as fields in JSON. Do not include any other markdown or text.`;

  try {
    const result = await chatSession.sendMessage(InputPrompt);
    let MockJsonResp = result.response.text();
    
    // Safety fallback just in case the model wraps in markdown
    MockJsonResp = MockJsonResp.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const resp = await db.insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: userEmail,
        createdAt: moment().format('DD-MM-yyyy')
      }).returning({ mockId: MockInterview.mockId });

    if (resp && resp[0]) {
      return { success: true, mockId: resp[0].mockId };
    }
    return { success: false, error: "Failed to save interview" };
  } catch (error) {
    console.error("Error generating interview:", error);
    return { success: false, error: error.message };
  }
}

export async function saveUserAnswer(mockId, question, correctAns, userAns, userEmail) {
  const feedbackPrompt = `Question: ${question}, User Answer: ${userAns}. Depending on the question and user answer, please give a rating (out of 10) for the answer and feedback as an area of improvement (in just 3 to 5 Lines) in JSON format with "rating" field and "feedback" field. Do not include any other markdown or text.`;

  try {
    const result = await chatSession.sendMessage(feedbackPrompt);
    let mockJsonResp = result.response.text();
    
    // Safety fallback
    mockJsonResp = mockJsonResp.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: mockId,
      question: question,
      correctAns: correctAns,
      userAns: userAns,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: userEmail,
      createdAt: moment().format("DD-MM-YYYY")
    });

    if (resp) {
      return { success: true };
    }
    return { success: false, error: "Failed to save answer" };
  } catch (error) {
    console.error("Error saving user answer:", error);
    return { success: false, error: error.message };
  }
}

export async function getInterviewsByUser(userEmail) {
  try {
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, userEmail))
      .orderBy(desc(MockInterview.id));
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return { success: false, error: error.message };
  }
}

export async function getInterviewByMockId(mockId) {
  try {
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, mockId));
    
    if (result.length > 0) {
      return { success: true, data: result[0] };
    }
    return { success: false, error: "Interview not found" };
  } catch (error) {
    console.error("Error fetching interview:", error);
    return { success: false, error: error.message };
  }
}

export async function getFeedbackByMockId(mockId) {
  try {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, mockId))
      .orderBy(UserAnswer.id);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return { success: false, error: error.message };
  }
}
