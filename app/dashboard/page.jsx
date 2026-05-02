import React from 'react'
import AddNewInterview from "./_components/AddNewInterview"
import InterviewList from "./_components/InterviewList"
import HowItWorks from "./_components/HowItWorks"
import Pricing from "./_components/Pricing"

const Dashboard = () => {
  return (
    <div className='px-4 py-12 md:px-6 lg:px-8 max-w-7xl mx-auto'>
      <section id="questions" className="scroll-mt-24">
        <div className="glass rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden anim-fade-up">
        {/* Abstract background blobs for premium feel */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl anim-orb" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl anim-orb-2" />

        <div className="relative z-10">
          <h1 className='text-4xl font-extrabold tracking-tight md:text-5xl text-zinc-50 font-sora'>
            Dashboard
          </h1>
          <p className='mt-4 max-w-2xl text-base text-zinc-400 md:text-lg font-dm'>
            Welcome back! Create role-specific mock interviews, practice with voice answers, and review personalized AI feedback to land your dream job.
          </p>

          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AddNewInterview />
          </div>
        </div>
      </div>
      </section>

      {/* Previous Interviews */}
      <div className="mt-16 anim-fade-up delay-2">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-50 font-sora">Recent Interviews</h2>
          <div className="h-px flex-1 bg-white/[0.06] mx-6 hidden sm:block" />
        </div>
        <InterviewList />
      </div>

      <section id="how-it-works" className="mt-24">
        <HowItWorks />
      </section>

      <section id="upgrade" className="mt-24">
        <Pricing />
      </section>
    </div>
  )
}

export default Dashboard;
