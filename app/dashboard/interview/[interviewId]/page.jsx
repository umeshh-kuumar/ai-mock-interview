"use client"
import { getInterviewByMockId } from '@/app/actions/interviewActions';
import { Lightbulb, WebcamIcon, Sparkles, Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Interview ({params}) {
    
    const [interviewData,setInterviewData] = useState(null);
    const [webCamEnabled,setWebCamEnabled]=useState(false);

    useEffect(()=>{
        GetInterviewDetails();
    },[])

    const GetInterviewDetails = async () => {
      if (!params?.interviewId) return;

      try {
        const response = await getInterviewByMockId(params.interviewId);
        if (response?.success) {
          setInterviewData(response.data);
        } else {
          console.error("Preparation fetch failed:", response?.error);
        }
      } catch (err) {
        console.error("Error in GetInterviewDetails:", err);
      }
    }

  return (
    <div className='max-w-6xl mx-auto py-12 px-6 lg:px-8 anim-fade-up'>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-600/10 border border-violet-200 dark:border-violet-500/20 flex items-center justify-center text-violet-500 dark:text-violet-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className='text-3xl font-extrabold md:text-4xl text-zinc-900 dark:text-zinc-50 font-sora tracking-tight'>Preparation Phase</h2>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>
        <div className="lg:col-span-3 space-y-8">
          <div className='rounded-[32px] p-8 md:p-10 shadow-xl dark:shadow-2xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] relative overflow-hidden'>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600" />
            
            <div className='space-y-6'>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-[0.2em]">Target Role</span>
                <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-sora'>{interviewData?.jobPosition}</h2>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-[0.2em]">Tech Stack</span>
                <p className='text-lg text-zinc-600 dark:text-zinc-300 font-dm leading-relaxed'>{interviewData?.jobDesc}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-[0.2em]">Experience</span>
                <p className='text-lg text-zinc-600 dark:text-zinc-300 font-dm'>{interviewData?.jobExperience} Years</p>
              </div>
            </div>
          </div>

          <div className='rounded-[28px] p-8 border border-amber-200 dark:border-amber-500/10 bg-amber-50 dark:bg-amber-500/[0.03] shadow-md dark:shadow-xl relative'>
            <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 mb-4 font-sora font-bold">
              <Lightbulb className="w-6 h-6" />
              <span>Expert Recommendations</span>
            </div>
            <p className='text-zinc-600 dark:text-zinc-400 font-dm leading-relaxed text-sm'>
              {process.env.NEXT_PUBLIC_INFORMATION || "Ensure your environment is quiet and well-lit. Speak clearly into the microphone. You'll receive real-time feedback after each response."}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className='relative aspect-video lg:aspect-square rounded-[32px] overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-2xl bg-zinc-100 dark:bg-zinc-900/50 flex flex-col items-center justify-center p-4 group'>
            { webCamEnabled ? (
              <Webcam 
                onUserMedia={()=>setWebCamEnabled(true)}
                onUserMediaError={()=>setWebCamEnabled(false)}
                mirrored={true}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <WebcamIcon className='w-10 h-10 text-zinc-400 dark:text-zinc-500' />
                </div>
                <h3 className="text-zinc-700 dark:text-zinc-300 font-sora font-bold mb-3">Camera Access Needed</h3>
                <p className="text-zinc-500 text-sm font-dm mb-6 max-w-[200px]">We use your camera for a more immersive interview experience.</p>
                <Button variant="outline" className="rounded-xl border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300" onClick={()=>setWebCamEnabled(true)}>
                  <Camera className="w-4 h-4 mr-2" />
                  Enable Setup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-end mt-12'>
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
          <Button className="h-14 px-12 rounded-2xl font-bold text-lg transition-all hover:scale-[1.05] active:scale-[0.95] text-white"
            style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 12px 32px rgba(124,58,237,0.4)" }}>
            Commence Interview
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview