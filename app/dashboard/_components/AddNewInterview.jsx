"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { LoaderCircle, Plus, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { generateInterviewQuestions } from "@/app/actions/interviewActions";

function AddNewInterview() {
    const [openDialog,setOpenDialog]= useState(false)
    const [jobPosition,setJobPosition]= useState("");
    const [jobDesc,setJobDesc]= useState("");
    const [jobExperience,setJobExperience]= useState("");
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const {user}= useUser();

    const onSubmit=async(e)=>{
      setLoading(true);
        e.preventDefault()

        const email = user?.primaryEmailAddress?.emailAddress;
        
        const response = await generateInterviewQuestions(jobPosition, jobDesc, jobExperience, email);

        if(response.success){
          setOpenDialog(false);
          router.push('/dashboard/interview/'+response.mockId)
        } else {
          console.error("Error generating interview:", response.error);
        }
        
        setLoading(false);
    }

  return (
    <div>
      <div className="group relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-white/[0.08] bg-zinc-900/50 p-8 text-center shadow-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-zinc-900/80 hover:border-violet-500/30"
      onClick={()=>setOpenDialog(true)}>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-fuchsia-600/5 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-white/10 group-hover:border-violet-500/50 shadow-lg">
          <Plus className="w-8 h-8 text-violet-400" />
        </div>
        
        <h2 className="relative z-10 text-xl font-bold text-zinc-100 font-sora">+ Create New</h2>
        <p className="relative z-10 mt-3 text-sm text-zinc-400 font-dm max-w-[180px] leading-relaxed group-hover:text-zinc-300">
          Tailored AI questions generated in seconds.
        </p>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl border-white/10 bg-zinc-950 p-0 overflow-hidden rounded-[28px] shadow-2xl">
          <div className="p-8 md:p-10">
            <DialogHeader className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span className="text-sm font-bold tracking-widest text-violet-400 uppercase font-sora">Interview Architect</span>
              </div>
              <DialogTitle className="text-3xl font-extrabold text-zinc-50 font-sora">Role Preparation</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={onSubmit} className="space-y-6">
              <p className="text-zinc-400 font-dm leading-relaxed">
                Define the target role and tech stack. Our AI will curate a personalized interview experience based on your specific requirements.
              </p>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300 ml-1">Target Position</label>
                <Input placeholder="e.g. Senior Frontend Engineer" required
                className="h-12 border-white/10 bg-white/5 text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:ring-violet-500/50"
                onChange={(event)=>setJobPosition(event.target.value)}/>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300 ml-1">Tech Stack & Description</label>
                <Textarea placeholder="e.g. React, TypeScript, Tailwind, Next.js" required
                className="min-h-[100px] border-white/10 bg-white/5 text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:ring-violet-500/50 py-3"
                onChange={(event)=>setJobDesc(event.target.value)}/>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300 ml-1">Years of Experience</label>
                <Input placeholder="e.g. 5" type="number" max="50" required
                className="h-12 border-white/10 bg-white/5 text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:ring-violet-500/50"
                onChange={(event)=>setJobExperience(event.target.value)}/>
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)} 
                className="text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-xl px-6 h-12">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}
                className="h-12 px-8 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
                  {loading?
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="w-5 h-5 animate-spin"/>
                      <span>Architecting...</span>
                    </div>
                    : 'Generate Session'
                  }
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
