'use client'
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { getInterviewsByUser } from '/app/actions/interviewActions';



function InterviewList() {
    const {user} = useUser();
    const [interviewList,setInterviewList] = useState([]);
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
        <div className="mb-4 flex items-end justify-between">
          <h2 className='text-xl font-semibold md:text-2xl'>Previous Mock Interviews</h2>
          <span className="text-sm text-muted-foreground">
            {interviewList?.length || 0} total
          </span>
        </div>
        {loading && (
          <div className="rounded-2xl border border-white/30 bg-white/50 p-6 text-sm text-muted-foreground dark:border-slate-800 dark:bg-slate-900/40">
            Loading your interviews...
          </div>
        )}
        {!loading && interviewList?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-primary/40 bg-white/50 p-6 text-sm text-muted-foreground dark:border-primary/30 dark:bg-slate-900/40">
            No interviews yet. Create your first mock interview to get started.
          </div>
        )}
        <div className='my-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {interviewList&&interviewList.map((interview,index)=>(
            <InterviewItemCard 
            interview={interview}
            key={index}/>
          ))}
        </div>
    </div>
  )
}

export default InterviewList