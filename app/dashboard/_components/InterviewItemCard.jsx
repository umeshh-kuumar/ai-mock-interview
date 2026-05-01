import React from 'react'
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { Briefcase, Calendar, Star } from 'lucide-react';

function InterviewItemCard({interview}) {

    const router = useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }

  return (
    <div className='group relative glass rounded-[24px] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] flex flex-col h-full'>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform duration-500">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <Calendar className="w-3 h-3" />
            {interview?.createdAt}
          </div>
        </div>

        <h2 className='text-xl font-bold text-zinc-100 font-sora leading-tight mb-2 group-hover:text-violet-300 transition-colors'>
          {interview?.jobPosition}
        </h2>
        
        <div className="flex items-center gap-2 text-sm text-zinc-400 font-dm mb-6">
          <Star className="w-4 h-4 text-amber-500/60 fill-amber-500/20" />
          <span>{interview?.jobExperience} Years Experience</span>
        </div>

        <div className='mt-auto flex gap-3'>
            <Button variant='ghost' className="flex-1 rounded-xl border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-zinc-100 transition-all h-11 font-semibold"
            onClick={onFeedbackPress}
            >Analysis</Button>
            <Button className='flex-1 rounded-xl h-11 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]'
            style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 16px rgba(124,58,237,0.2)" }}
            onClick={onStart}
            >Launch</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard;