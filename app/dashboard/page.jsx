import React from 'react'
import AddNewInterview from "./_components/AddNewInterview"
import InterviewList from "./_components/InterviewList"


const Dashboard = () => {
  return (
    <div className='px-4 py-8 md:px-6 md:py-10'>
      <div className="glass rounded-3xl p-6 shadow-xl md:p-8">
        <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>Dashboard</h1>
        <p className='mt-2 max-w-2xl text-sm text-muted-foreground md:text-base'>
          Create role-specific mock interviews, practice with voice answers, and review personalized AI feedback.
        </p>

        <div className='mt-6 grid grid-cols-1 md:grid-cols-3'>
          <AddNewInterview />
        </div>
      </div>

      {/* Previous Interview */}
      <div className="mt-8">
        <InterviewList />
      </div>
    </div>
  )
}

export default Dashboard;
