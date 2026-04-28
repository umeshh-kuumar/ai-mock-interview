"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Bot, PencilLine, PlayCircle, Share2 } from "lucide-react";
import Header from "./Header";

function Hero() {
  return (
    <div>
      <img loading="lazy"
        width="1200"
        height="300"
        decoding="async"
        data-nimg="1"
        className="absolute z-[-10] w-full"
        style={{ color: "transparent" }}
        alt="Decorative grid background"
        src="/grid.svg"
      />

      <Header />
      <section className="z-50 animate-fade-in">
        <div className="mt-10 mx-auto max-w-screen-xl rounded-3xl border border-white/20 py-8 px-4 text-center shadow-2xl glass dark:border-slate-800 dark:glass-dark lg:py-16 lg:px-12">
          <h1 className="mb-4 animate-slide-up text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl" style={{ animationDelay: '0.1s' }}>
            Your Personal AI Interview Coach
          </h1>
          <p className="mb-8 animate-slide-up text-lg font-normal text-muted-foreground lg:text-xl sm:px-16 xl:px-48" style={{ animationDelay: '0.2s' }}>
            Double your chances of landing that job offer with our AI-powered
            interview prep
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="/sign-in"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-xl bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/30"
            >
              Get Started
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a href="https://youtu.be" className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/70 py-3 px-5 text-base font-medium text-foreground shadow-sm transition-all hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:hover:bg-slate-900">
              <PlayCircle className="mr-2 -ml-1 h-5 w-5" />
              Watch video
            </a>
          </div>
        </div>
      </section>
      <section className="z-50 mx-auto mt-8 max-w-screen-xl rounded-3xl border border-white/20 bg-white/80 px-4 py-8 text-center shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 lg:px-12 lg:py-16">
        <h2 className="text-3xl font-bold text-foreground">How it Works?</h2>
        <h2 className="text-md text-muted-foreground">
          Give mock interviews in just 3 simple steps
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={Bot}
            title="Set your role context"
            description="Tell MockMate your job role, tech stack, and experience level for personalized interview questions."
          />
          <Card
            icon={PencilLine}
            title="Practice with AI"
            description="Answer questions by voice and simulate a real interview environment with timed progression."
          />
          <Card
            icon={Share2}
            title="Review feedback"
            description="Get question-wise ratings, ideal answers, and improvement tips to sharpen your performance."
          />
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring focus:ring-primary/30"
          >
            Get Started Today
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Card({ icon: Icon, title, description }) {
  return (
    <div className="block rounded-2xl border border-white/30 bg-white/70 p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20 dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export default Hero;
