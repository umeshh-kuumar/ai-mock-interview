import React from 'react'
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';

function InterviewItemCard({interview}) {

    const router = useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }

  return (
    <div className='glass animate-fade-in rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl'>
        <h2 className='mb-1 text-xl font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm font-medium text-muted-foreground'>
          {interview?.jobExperience} years experience
        </h2>
        <h2 className='mt-2 text-xs text-muted-foreground'>Created: {interview?.createdAt}</h2>
        <div className='mt-6 flex justify-between gap-4'>
            <Button size='sm' variant='outline' className="w-full rounded-xl"
            onClick={onFeedbackPress}
            >Feedback</Button>
            <Button size='sm' className='w-full rounded-xl shadow-md shadow-primary/20'
            onClick={onStart}
            >Start</Button>

        </div>
    </div>
  )
}

export default InterviewItemCard;