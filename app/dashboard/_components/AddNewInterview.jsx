"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "/components/ui/input";
import { Textarea } from "/components/ui/textarea"
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { generateInterviewQuestions } from "/app/actions/interviewActions";
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
          // In a real app we'd show a toast here
        }
        
        setLoading(false);
    }


  return (
    <div className="animate-fade-in">
      <div className="group flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-card/70 p-8 text-center shadow-sm backdrop-blur transition-all duration-300 hover:scale-[1.01] hover:border-primary hover:shadow-xl dark:border-primary/40 dark:bg-card/70"
      onClick={()=>setOpenDialog(true)}>
        <h2 className="text-xl font-semibold text-primary/90">+ Add New Interview</h2>
        <p className="mt-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          Generate tailored questions in under a minute.
        </p>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl border-border/80 bg-card/95 text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us about the role you are preparing for</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add the target role, tech stack, and years of experience so the interview can be personalized.
              </p>
              <div className="mt-7 my-3">
                <label className="text-sm font-medium text-foreground">Job Role / Position</label>
                <Input placeholder="Ex. Full Stack Developer" required
                className="border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground"
                onChange={(event)=>setJobPosition(event.target.value)}/>
              </div>
              <div className="my-3">
                <label className="text-sm font-medium text-foreground">Job Description / Tech Stack (Short)</label>
                <Textarea placeholder="Ex. React, NodeJs, MySql, Java" required
                className="border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground"
                onChange={(event)=>setJobDesc(event.target.value)}/>
              </div>
              <div className="my-3">
                <label className="text-sm font-medium text-foreground">Years of Experience</label>
                <Input placeholder="Ex.5" type="number" max="50" required
                className="border-border/80 bg-background/80 text-foreground placeholder:text-muted-foreground"
                onChange={(event)=>setJobExperience(event.target.value)}/>
              </div>
            </div>
            <div className="flex gap-5 justify-end mt-6">
              <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading?
                <>
                <LoaderCircle className="animate-spin"/>Generating...</>:'Generate Interview'
              }
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
