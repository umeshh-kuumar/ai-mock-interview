"use client"
import React, { useEffect, useState } from 'react'
import { getInterviewByMockId } from '@/app/actions/interviewActions';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft, ArrowRight, XCircle } from 'lucide-react';

function StartInterview({params}) {

  const [interviewData,setInterviewData]=useState();
  const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
  const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);

  useEffect(()=>{
    GetInterviewDetails();
  },[])

  const GetInterviewDetails = async () => {
    if (!params?.interviewId) return;

    try {
      const response = await getInterviewByMockId(params.interviewId);

      if (response?.success) {
        const resultData = response.data;
        if (resultData?.jsonMockResp) {
          const jsonMockResp = JSON.parse(resultData.jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(resultData);
        }
      } else {
        console.error("Interview fetch failed:", response?.error);
      }
    } catch (err) {
      console.error("Error in GetInterviewDetails:", err);
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 lg:px-8 anim-fade-up">
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
        <QuestionsSection 
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className='flex items-center justify-between mt-12 pt-8 border-t border-zinc-200 dark:border-white/[0.06]'>
        <div className="flex gap-4">
          {activeQuestionIndex > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              className="rounded-xl border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-zinc-100 h-12 px-6 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          {activeQuestionIndex != mockInterviewQuestion?.length - 1 ? (
            <Button 
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="rounded-xl h-12 px-8 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] text-white"
              style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 20px rgba(124,58,237,0.3)" }}
            >
              Next Question
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
              <Button 
                className="rounded-xl h-12 px-8 font-bold transition-all hover:scale-[1.02] active:scale-[0.98] bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/20"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Terminate Session
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default StartInterview;