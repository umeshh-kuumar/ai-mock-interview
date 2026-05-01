"use client";
import React, { useEffect, useState } from "react";
import { getFeedbackByMockId } from '@/app/actions/interviewActions';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Trophy, Star, MessageSquare, CheckCircle2, Home, BarChart3, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    try {
      const response = await getFeedbackByMockId(params.interviewId);

      if (response.success) {
        const result = response.data;
        setFeedbackList(result);

        if (result.length > 0) {
          const ratings = result
            .map(item => {
              const val = parseFloat(item.rating);
              return isNaN(val) ? null : val;
            })
            .filter(r => r !== null);

          if (ratings.length > 0) {
            const totalRating = ratings.reduce((sum, r) => sum + r, 0);
            const averageRating = (totalRating / ratings.length).toFixed(1);
            setOverallRating(averageRating);
          } else {
            setOverallRating("N/A");
          }
        } else {
          setOverallRating("N/A");
        }
      } else {
        console.error("Feedback fetch failed:", response.error);
      }
    } catch (err) {
      console.error("Unexpected error in Feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 lg:px-8 anim-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] font-sora">
              Evaluation Finalized
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-zinc-50 font-sora tracking-tight leading-tight">Performance Analysis</h1>
          <p className="text-zinc-400 font-dm max-w-md">Your personalized AI evaluation and growth path based on industry standards.</p>
        </div>

        <div className="glass rounded-[32px] px-8 py-7 border-white/10 bg-zinc-900/40 shadow-2xl flex items-center gap-6 relative overflow-hidden group min-w-[240px]">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-inner">
            <Trophy className="w-7 h-7" />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1 font-sora">Aggregate Score</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black text-zinc-50 font-sora leading-none tracking-tighter">
                {loading ? "..." : (overallRating || "0.0")}
              </span>
              <span className="text-zinc-500 font-bold text-lg">/10</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-20 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : feedbackList?.length === 0 ? (
        <div className="glass rounded-[40px] p-16 text-center border-white/5 bg-white/[0.01] shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-zinc-700" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-200 font-sora mb-3">No Feedback Metrics Found</h2>
            <p className="text-zinc-500 font-dm max-w-sm mx-auto leading-relaxed">
              We couldn't find any recorded answers for this session. Make sure to complete the interview questions before viewing the report.
            </p>
            <Button 
                onClick={() => router.replace("/dashboard")}
                variant="outline"
                className="mt-8 rounded-xl border-white/10 bg-white/5 text-zinc-400 hover:text-zinc-100"
            >
                Start New Interview
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8 px-2">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] font-sora">Sectional Analysis</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          </div>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="group overflow-hidden rounded-2xl border border-white/[0.03] transition-all duration-300">
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-6 glass rounded-2xl p-6 text-left border-white/5 hover:border-white/10 transition-all duration-300 group-data-[state=open]:rounded-b-none group-data-[state=open]:bg-zinc-900/60 group-data-[state=open]:border-violet-500/20">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-center text-xs font-black text-zinc-500 group-hover:text-violet-400 transition-colors shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-bold text-zinc-200 font-sora text-base md:text-lg tracking-tight line-clamp-1">{item.question}</h4>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-zinc-100 font-sora">{item.rating}</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-zinc-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="glass rounded-b-2xl border-t-0 border-white/5 bg-zinc-950/80 p-6 md:p-8 space-y-8 anim-fade-up">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 p-6 rounded-2xl bg-violet-600/[0.02] border border-violet-500/10 shadow-inner flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 mb-4">
                       <Star className="w-6 h-6 fill-violet-400" />
                    </div>
                    <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-2 block">Performance Score</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-zinc-50 font-sora tracking-tighter">{item.rating}</span>
                        <span className="text-zinc-600 font-bold">/10</span>
                    </div>
                  </div>

                  <div className="md:col-span-8 p-6 rounded-2xl bg-fuchsia-600/[0.02] border border-fuchsia-500/10 shadow-inner">
                    <div className="flex items-center gap-3 text-fuchsia-400 mb-4">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] font-sora">Development Notes</span>
                    </div>
                    <p className="text-zinc-300 font-dm leading-relaxed text-[15px]">{item.feedback}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-[24px] bg-zinc-900/60 border border-white/[0.03] shadow-lg">
                    <div className="flex items-center gap-3 text-zinc-500 mb-4">
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      <span className="text-[10px] font-bold uppercase tracking-widest font-sora">Your Session Input</span>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-violet-600/20 rounded-full" />
                        <p className="text-zinc-400 text-sm md:text-base font-dm leading-relaxed italic pl-4">&ldquo;{item.userAns}&rdquo;</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-[24px] bg-emerald-500/[0.02] border border-emerald-500/10 shadow-inner">
                    <div className="flex items-center gap-3 text-emerald-400/80 mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest font-sora">Target Implementation</span>
                    </div>
                    <p className="text-zinc-200 text-sm md:text-base font-dm leading-relaxed">{item.correctAns}</p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}

      <div className="mt-20 flex justify-center pb-12">
        <Button 
          onClick={() => router.replace("/dashboard")}
          className="h-16 px-12 rounded-[22px] font-bold transition-all hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(124,58,237,0.3)] active:scale-[0.98] flex items-center gap-3 text-lg"
          style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)" }}
        >
          <Home className="w-6 h-6" />
          Dashboard Overview
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
