"use client"
import { getInterviewByMockId } from '/app/actions/interviewActions';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from "react-webcam";
import { Button } from '/components/ui/button';
import Link from 'next/link';


function Interview ({params}) {
    
    const [interviewData,setInterviewData] = useState(null);
    const [webCamEnabled,setWebCamEnabled]=useState(false);

    useEffect(()=>{
        GetInterviewDetails();
    },[])


    const GetInterviewDetails = async()=>{
      const response = await getInterviewByMockId(params.interviewId);
      if(response.success) {
        setInterviewData(response.data);
      }
    }

  return (
    <div className='my-10 space-y-6'>
      <h2 className='text-2xl font-bold md:text-3xl'>Let&apos;s Get Started</h2>

      <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
      

      <div className='my-5 flex flex-col gap-5 rounded-2xl border border-white/30 bg-white/50 p-5 shadow-sm dark:bg-slate-900/30'>
        
      <div className='flex flex-col gap-4 rounded-xl border border-white/40 p-5'>
        <h2 className='text-lg'><strong>Job Role / Position:</strong> {interviewData?.jobPosition}</h2>
        <h2 className='text-lg'><strong>Job Description / Tech Stack:</strong> {interviewData?.jobDesc}</h2>
        <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData?.jobExperience}</h2>
      </div>

        <div className='rounded-xl border border-yellow-300 bg-yellow-50 p-5'>
          <h2 className='flex items-center gap-2 text-yellow-700'><Lightbulb/><strong>Quick Tips</strong></h2>
          <h2 className='mt-3 text-sm text-yellow-800'>{process.env.NEXT_PUBLIC_INFORMATION}
          </h2>
        </div>
      </div>

      <div>
      { webCamEnabled? <Webcam 
      onUserMedia={()=>setWebCamEnabled(true)}
      onUserMediaError={()=>setWebCamEnabled(false)}
      mirrored={true}
      style={{
        height:300,
        width:300
      }}
      />
      :
      <>
      <WebcamIcon className='my-7 h-72 w-full rounded-xl border bg-secondary p-20'/>
      <Button variant="ghost" className="w-full" onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
      </>
      }
      </div>
      </div>


      <div className='flex items-end justify-end'>
        
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button className="rounded-xl px-8">Start Interview</Button>
        </Link>
      </div>
      

    </div>
  )
}

export default Interview 