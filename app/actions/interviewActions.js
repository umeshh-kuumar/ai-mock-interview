'use server'

import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { chatModel, chatConfig } from "@/utils/GeminiAIModel";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { eq, desc, and } from 'drizzle-orm';

function parseFeedbackJson(rawText) {
  const cleanedText = rawText
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
  const jsonStart = cleanedText.indexOf('{');
  const jsonEnd = cleanedText.lastIndexOf('}');
  const jsonText = jsonStart >= 0 && jsonEnd >= jsonStart
    ? cleanedText.slice(jsonStart, jsonEnd + 1)
    : cleanedText;

  return JSON.parse(jsonText);
}

function normalizeRating(rating) {
  if (typeof rating === 'number') {
    return String(rating);
  }

  if (typeof rating === 'string') {
    const match = rating.match(/(\d+(\.\d+)?)/);
    return match ? match[0] : "0";
  }

  return "0";
}

async function generateAnswerFeedback(question, userAns) {
  const feedbackPrompt = `Question: ${question}, User Answer: ${userAns}. 
  Evaluate this and provide JSON: { "rating": number, "feedback": string }.`;

  try {
    const result = await chatModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: feedbackPrompt }] }],
      generationConfig: chatConfig,
    });

    const parsedFeedback = parseFeedbackJson(result.response.text());

    return {
      feedback: parsedFeedback?.feedback || "Evaluation complete.",
      rating: normalizeRating(parsedFeedback?.rating),
    };
  } catch (error) {
    console.error("Feedback generation failed. Saving answer without AI feedback:", error);
    return {
      feedback: "Your answer was saved, but AI feedback could not be generated. Please try again later.",
      rating: "0",
    };
  }
}

export async function generateInterviewQuestions(jobPosition, jobDesc, jobExperience, userEmail) {
  const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depending on this information, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with ideal answers in JSON format. 
  Each object should have "question" and "answer" fields.
  Return STRICTLY a JSON array. No markdown, no extra text.`;

  try {
    const result = await chatModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: InputPrompt }] }],
        generationConfig: chatConfig,
    });
    
    let MockJsonResp = result.response.text();
    MockJsonResp = MockJsonResp.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    try {
        JSON.parse(MockJsonResp);
    } catch (e) {
        return { success: false, error: "AI generated invalid JSON. Please try again." };
    }

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
    return { success: false, error: "Failed to create interview in DB." };
  } catch (error) {
    console.error("Action Error (generate):", error);
    return { success: false, error: error.message };
  }
}

export async function saveUserAnswer(mockId, question, correctAns, userAns, userEmail) {
  if (!mockId || !question || !userAns) {
    console.error("Save attempt with missing data:", { mockId, question, userAns });
    return { success: false, error: "Missing required fields for saving." };
  }

  let existingAnswer = null;
  try {
    const existing = await db.select().from(UserAnswer)
        .where(and(
            eq(UserAnswer.mockIdRef, mockId),
            eq(UserAnswer.question, question)
        ));
    
    if (existing.length > 0) {
        existingAnswer = existing[0];
    }
  } catch (e) {
    console.warn("Existing answer check failed, proceeding with insert.");
  }

  try {
    const aiFeedback = await generateAnswerFeedback(question, userAns);
    const answerValues = {
      mockIdRef: mockId,
      question: question,
      correctAns: correctAns || "N/A",
      userAns: userAns,
      feedback: aiFeedback.feedback,
      rating: aiFeedback.rating,
      userEmail: userEmail,
      createdAt: moment().format("DD-MM-YYYY")
    };

    if (existingAnswer) {
      const resp = await db.update(UserAnswer)
        .set(answerValues)
        .where(and(
          eq(UserAnswer.mockIdRef, mockId),
          eq(UserAnswer.question, question)
        ))
        .returning({ id: UserAnswer.id });

      if (resp && resp.length > 0) {
        console.log("Successfully updated answer in DB:", resp[0].id);
        return { success: true, message: "Answer updated." };
      }
    }

    const resp = await db.insert(UserAnswer).values(answerValues).returning();

    if (resp && resp.length > 0) {
      console.log("Successfully saved to DB:", resp[0].id);
      return { success: true };
    }
    return { success: false, error: "Database rejected the insertion." };
  } catch (error) {
    console.error("Action Error (save):", error);
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
    return { success: false, error: "Not found." };
  } catch (error) {
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
    return { success: false, error: error.message };
  }
}
