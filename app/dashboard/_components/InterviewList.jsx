'use client'

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { getInterviewsByUser } from "@/app/actions/interviewActions";

function InterviewList() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (user) {
          GetInterviewList();
        } else {
          setLoading(false);
        }
    },[user])

    const GetInterviewList=async()=>{
        if(!user?.primaryEmailAddress?.emailAddress) return;
        
        const response = await getInterviewsByUser(user?.primaryEmailAddress?.emailAddress);

        if(response.success) {
          setInterviewList(response.data);
        } else {
          console.error("Error fetching interviews:", response.error);
        }
        setLoading(false);
    }

  return (
    <div>
        <div className="flex items-center gap-3 mb-8">
            <h2 className='font-bold text-2xl text-zinc-900 dark:text-zinc-100 font-sora'>Previous Sessions</h2>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-white/[0.06]" />
        </div>

        {loading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1,2,3].map((i) => (
                    <div key={i} className='h-[160px] rounded-[24px] bg-zinc-200 dark:bg-white/5 animate-pulse border border-zinc-300 dark:border-white/5' />
                ))}
            </div>
        ) : interviewList?.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {interviewList.map((interview, index)=>(
                    <InterviewItemCard 
                        interview={interview}
                        key={index}
                    />
                ))}
            </div>
        ) : (
            <div className="rounded-[32px] p-12 text-center border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
                <p className="text-zinc-400 dark:text-zinc-500 font-dm italic">No interview sessions found. Start a new one above.</p>
            </div>
        )}
    </div>
  )
}

export default InterviewList