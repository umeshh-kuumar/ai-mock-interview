"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { saveUserAnswer } from "/app/actions/interviewActions";


function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(
        (prevAns) =>
          prevAns + results.map((result) => result.transcript).join(" ")
      );
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();

    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer)
    setLoading(true);

    const email = user?.primaryEmailAddress?.emailAddress;
    const response = await saveUserAnswer(
      interviewData?.mockId,
      mockInterviewQuestion[activeQuestionIndex]?.Question,
      mockInterviewQuestion[activeQuestionIndex]?.Answer,
      userAnswer,
      email
    );

    if (response.success) {
      toast("User Answer Record Sucessfully");
      setUserAnswer("");
      setResults([]);
    } else {
      toast("Error while saving answer");
    }
    
    setResults([]);
    setLoading(false);
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className="flex  flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="Webcam icon"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10 "
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <StopCircle />
            stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
