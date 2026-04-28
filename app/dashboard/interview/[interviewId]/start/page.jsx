"use client"
import React, { useEffect, useState } from 'react'
import { getInterviewByMockId } from '/app/actions/interviewActions';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from "/components/ui/button";
import Link from 'next/link';




function StartInterview({params}) {

  const [interviewData,setInterviewData]=useState();
  const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
  const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);


  useEffect(()=>{
    GetInterviewDetails();

  },[])

  const GetInterviewDetails = async()=>{
    const response = await getInterviewByMockId(params.interviewId);
    
    if(response.success) {
      const resultData = response.data;
      const jsonMockResp = JSON.parse(resultData.jsonMockResp)
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(resultData);
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
        {/* {Questions} */}
        <QuestionsSection 
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />

      {/* Video/ Audio Recording */}
      <RecordAnswerSection
      mockInterviewQuestion={mockInterviewQuestion}
      activeQuestionIndex={activeQuestionIndex}
      interviewData={interviewData}
      />
      </div>
      <div className='flex flex-wrap justify-end gap-3'>
        {activeQuestionIndex>0&&
        <Button variant="outline" onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
        <Button className="bg-emerald-600 text-white hover:bg-emerald-700">End Interview</Button>
        </Link>}
        

      </div>
    </div>
  )
}

export default StartInterview;