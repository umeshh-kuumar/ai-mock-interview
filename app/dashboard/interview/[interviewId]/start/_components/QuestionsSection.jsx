import { Lightbulb, Volume2, Sparkles } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('sorry your browser does not support text to speech')
    }
  } 
  
  return (
    mockInterviewQuestion && (
      <div className="flex flex-col h-full">
        <div className="glass rounded-[32px] p-8 border-white/10 shadow-2xl bg-zinc-900/50 flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-3xl" />
          
          <div className="flex flex-wrap gap-3 mb-8">
            {mockInterviewQuestion.map((_, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  activeQuestionIndex === index
                    ? "bg-violet-600 border-violet-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] scale-105"
                    : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/20"
                }`}
              >
                Q{index + 1}
              </div>
            ))}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest font-sora">Current Inquiry</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-zinc-100 font-sora leading-relaxed mb-6">
              {mockInterviewQuestion[activeQuestionIndex]?.question || mockInterviewQuestion[activeQuestionIndex]?.Question}
            </h2>

            <button 
              onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question || mockInterviewQuestion[activeQuestionIndex]?.Question)}
              className="group flex items-center gap-2 text-zinc-400 hover:text-violet-400 transition-colors text-sm font-medium"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-600/10 group-hover:border-violet-500/30 transition-all">
                <Volume2 className='w-5 h-5'/>
              </div>
              <span>Listen to Question</span>
            </button>
          </div>

          <div className="mt-12 glass rounded-2xl p-6 border-violet-500/10 bg-violet-500/[0.03]">
            <div className="flex gap-3 items-center text-violet-400 mb-2 font-bold text-sm">
              <Lightbulb className="w-5 h-5" />
              <span>Operational Note</span>
            </div>
            <p className="text-xs md:text-sm text-zinc-500 font-dm leading-relaxed">
              Activate the microphone to record your response. MockMate will analyze your input and provide a comparative analysis against ideal industry standards.
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
