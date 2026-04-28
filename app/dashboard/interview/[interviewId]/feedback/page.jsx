"use client";
import React, { useEffect, useState } from "react";
import { getFeedbackByMockId } from '/app/actions/interviewActions';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const response = await getFeedbackByMockId(params.interviewId);

    if(response.success) {
      const result = response.data;
      setFeedbackList(result);

      // Calculate overall rating
      if (result.length > 0) {
        const totalRating = result.reduce(
          (sum, item) => sum + parseFloat(item.rating),
          0
        );
        const averageRating = (totalRating / result.length).toFixed(1);
        setOverallRating(averageRating);
      } else {
        setOverallRating("N/A"); // No feedback available
      }
    } else {
      setOverallRating("N/A");
    }
  };

  return (
    <div className="space-y-4 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-emerald-600">Congratulations!</h2>
      <h2 className="text-2xl font-bold">Here is your interview feedback</h2>

      {feedbackList?.length==0?
    <h2 className="rounded-xl border border-dashed border-primary/40 bg-white/50 p-4 text-base text-muted-foreground dark:border-primary/30 dark:bg-slate-900/40">
      No interview feedback recorded yet.
    </h2>  
    :
    <>
      <h2 className="my-3 text-lg text-primary">
        Your overall interview rating:{" "}
        <strong>{overallRating || "Loading..."}</strong>
      </h2>
      <h2 className="text-sm text-muted-foreground">
        Find below interview questions with correct answer, and feedback for
        improvement
      </h2>

      {feedbackList &&feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-5">
            <CollapsibleTrigger className="my-2 flex w-full justify-between gap-7 rounded-lg bg-secondary p-3 text-left">
              {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="rounded-lg border border-red-300/60 bg-red-50/70 p-2 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                  <strong>Rating : </strong>
                  {item.rating}
                </h2>
                <h2 className="rounded-lg border border-red-300/60 bg-red-50/70 p-2 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                  <strong>Your Answer : </strong>
                  {item.userAns}
                </h2>
                <h2 className="rounded-lg border border-emerald-300/60 bg-emerald-50/70 p-2 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <strong>Correct Answer : </strong>
                  {item.correctAns}
                </h2>
                <h2 className="rounded-lg border border-sky-300/60 bg-sky-50/70 p-2 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-200">
                  <strong>Feedback : </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        </>}
      <Button className="mt-2 rounded-xl" onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  )
}

export default Feedback;
