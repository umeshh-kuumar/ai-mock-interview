"use client";
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle, Loader2, Sparkles, Keyboard, Video, VideoOff, Save } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { saveUserAnswer } from "@/app/actions/interviewActions";
import { Textarea } from "@/components/ui/textarea";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [interimResult, setInterimResult] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const [webCamEnabled, setWebCamEnabled] = useState(true);
  
  // Anti-stale closure and concurrency locks
  const [isPendingSubmit, setIsPendingSubmit] = useState(false);
  const isProcessingRef = useRef(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const interimTranscriptRef = useRef("");
  const shouldSubmitOnEndRef = useRef(false);
  
  const { user } = useUser();

  

  const getCurrentTranscript = useCallback(() => {
    return `${finalTranscriptRef.current} ${interimTranscriptRef.current}`
      .replace(/\s+/g, " ")
      .trim();
  }, []);

  // 1. Core Database Submission
  const submitAnswer = async (answerText) => {
    if (loading || !answerText || answerText.trim().length < 5) {
      if (answerText && answerText.trim().length < 5) {
         toast.warning("Response too short. Please speak more.");
      }
      return;
    }

    const email = user?.primaryEmailAddress?.emailAddress;
    const currentQuestion = mockInterviewQuestion?.[activeQuestionIndex];
    const qText = currentQuestion?.question || currentQuestion?.Question;
    const aText = currentQuestion?.answer || currentQuestion?.Answer;

    if (!interviewData?.mockId || !qText) {
      toast.error("Interview data is still loading. Please try again.");
      return;
    }

    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setLoading(true);
    
    try {
      const response = await saveUserAnswer(
        interviewData?.mockId,
        qText,
        aText,
        answerText.trim(),
        email
      );

      if (response.success) {
        toast.success(response.message === "Answer updated."
          ? "Response updated in database."
          : "AI Analysis Complete: Response Saved.");
        setUserAnswer("");
        finalTranscriptRef.current = "";
        interimTranscriptRef.current = "";
        setInterimResult("");
      } else {
        toast.error(response.error || "Persistence error. Use manual mode.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
      isProcessingRef.current = false;
    }
  };


  const submitPendingVoiceAnswer = (transcriptOverride) => {
    const finalVal = (transcriptOverride || getCurrentTranscript()).trim();
    shouldSubmitOnEndRef.current = false;
    setIsPendingSubmit(false);

    if (finalVal.length >= 5) {
      setUserAnswer(finalVal);
      submitAnswer(finalVal);
    } else {
      toast.warning("Response too short. Please speak more.");
    }
  };

  // 3. Robust Native Speech Implementation
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Browser STT not supported. Switching to text mode.");
      setIsManualInput(true);
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      if (final) {
        finalTranscriptRef.current = `${finalTranscriptRef.current} ${final}`
          .replace(/\s+/g, " ")
          .trim();
      }
      interimTranscriptRef.current = interim.trim();
      setUserAnswer(finalTranscriptRef.current.trim());
      setInterimResult(interimTranscriptRef.current);
    };

    recognition.onerror = (event) => {
      if (event.error !== 'aborted') {
          console.error("Microphone error:", event.error);
          if (event.error === 'not-allowed') {
            toast.error("Microphone access denied. Please allow permissions.");
          }
      }
      setIsRecording(false);
      if (shouldSubmitOnEndRef.current) {
        submitPendingVoiceAnswer();
      } else {
        setIsPendingSubmit(false);
      }
    };

    recognition.onend = () => {
      const shouldSubmit = shouldSubmitOnEndRef.current;
      const transcript = getCurrentTranscript();

      setIsRecording(false);
      setInterimResult("");

      if (transcript) {
        setUserAnswer(transcript);
      }
      interimTranscriptRef.current = "";

      if (shouldSubmit) {
        submitPendingVoiceAnswer(transcript);
      }
    };

    return recognition;
  };

  // 4. Safe Start/Stop Logic (Fixes "already started" crash)
  const StartStopRecording = () => {
    if (isRecording) {
      setIsPendingSubmit(true);
      shouldSubmitOnEndRef.current = true;
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        console.warn("Soft catch on stop:", e);
        submitPendingVoiceAnswer();
        setIsRecording(false);
      }
    } else {
      const existingTranscript = getCurrentTranscript() || userAnswer.trim();
      if (existingTranscript.length >= 5) {
        submitAnswer(existingTranscript);
        return;
      }

      // Complete reset before starting
      setUserAnswer("");
      setInterimResult("");
      finalTranscriptRef.current = "";
      interimTranscriptRef.current = "";
      setIsPendingSubmit(false);
      shouldSubmitOnEndRef.current = false;
      isProcessingRef.current = false;
      
      // Cleanup old instance if it exists
      if (recognitionRef.current) {
         try { recognitionRef.current.abort(); } catch (e) {}
      }

      const recognition = initSpeechRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        try {
          recognition.start();
          setIsRecording(true);
        } catch (e) {
          console.error("Hardware STT Start Error:", e);
          // Only switch to manual if it's a fatal crash, not a race condition
          if (e.name !== 'InvalidStateError') {
             setIsManualInput(true);
          } else {
             toast.info("Microphone is warming up. Please click again.");
          }
        }
      }
    }
  };

  const handleManualSave = () => {
    submitAnswer(userAnswer);
  };

  const toggleInputMode = () => {
    if (isRecording) {
      shouldSubmitOnEndRef.current = false;
      setIsPendingSubmit(false);
      try { recognitionRef.current?.stop(); } catch (e) {}
      setIsRecording(false);
    }
    setIsManualInput(!isManualInput);
  };

  const voiceTranscriptReady = !isManualInput
    && !isRecording
    && !isPendingSubmit
    && userAnswer.trim().length >= 5;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-video rounded-[32px] overflow-hidden glass border-white/10 shadow-2xl bg-zinc-950 flex flex-col items-center justify-center group">
        <div className="absolute inset-0 z-0 opacity-20">
            <Image src={"/webcam.png"} fill alt="Webcam placeholder" className="object-cover grayscale" />
        </div>
        
        {webCamEnabled ? (
            <Webcam mirrored={true} className="relative z-10 w-full h-full object-cover rounded-2xl" />
        ) : (
            <div className="relative z-10 flex flex-col items-center gap-3 text-zinc-700">
                <VideoOff className="w-12 h-12" />
                <span className="text-[10px] font-bold font-sora tracking-widest uppercase">Visual Stream Off</span>
            </div>
        )}

        <div className="absolute top-6 left-6 z-20">
            <Button 
                variant="ghost" 
                size="icon" 
                className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all"
                onClick={() => setWebCamEnabled(!webCamEnabled)}
            >
                {webCamEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </Button>
        </div>

        {isRecording && (
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-600/90 backdrop-blur-md border border-rose-500/50 anim-blink shadow-[0_0_20px_rgba(225,29,72,0.3)]">
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest font-sora">Recording</span>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center w-full max-w-sm gap-5">
        {!isManualInput ? (
            <Button
                disabled={loading || isPendingSubmit}
                onClick={StartStopRecording}
                className={`w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isRecording 
                    ? "bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-900/40 scale-[1.02]" 
                    : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-zinc-100"
                }`}
            >
                {loading || isPendingSubmit ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : isRecording ? (
                    <><StopCircle className="w-6 h-6" /><span>Finish & Save</span></>
                ) : voiceTranscriptReady ? (
                    <><Save className="w-6 h-6 text-emerald-400" /><span>Save Voice Answer</span></>
                ) : (
                    <><Mic className="w-6 h-6 text-violet-400" /><span>Record Voice</span></>
                )}
            </Button>
        ) : (
            <div className="w-full space-y-4 anim-fade-up">
                <Textarea 
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer for AI evaluation..."
                    className="min-h-[120px] rounded-2xl bg-white/5 border-white/10 text-zinc-100 placeholder:text-zinc-700 focus:ring-violet-500/50 py-4"
                />
                <Button 
                    onClick={handleManualSave}
                    disabled={loading || userAnswer.length < 5}
                    className="w-full h-14 rounded-xl font-bold transition-all shadow-lg hover:scale-[1.01]"
                    style={{ background: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)" }}
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Evaluate Text Answer"}
                </Button>
            </div>
        )}
        
        <button 
            onClick={toggleInputMode}
            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-[0.3em] flex items-center gap-2"
        >
            {isManualInput ? <Mic className="w-3 h-3" /> : <Keyboard className="w-3 h-3" />}
            {isManualInput ? "Switch to Voice" : "Switch to Keyboard"}
        </button>
      </div>

      {(userAnswer || interimResult) && !isManualInput && (
        <div className="mt-12 w-full max-w-2xl anim-fade-up">
          <div className="glass rounded-[24px] p-6 border-white/5 bg-white/[0.02] relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
               <Sparkles className="w-4 h-4 text-violet-400" />
               <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-sora">Live Transcription Feed</span>
            </div>
            
            <p className="text-zinc-300 font-dm leading-relaxed min-h-[60px] text-[15px]">
              {userAnswer}
              <span className="text-zinc-500 italic"> {interimResult}</span>
              {isRecording && <span className="inline-block w-1 h-4 ml-1 bg-violet-500/50 anim-blink" />}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;
