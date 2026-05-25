"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ThemeToggle from "/components/theme-toggle";

export default function SignUpPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn) return null;

  return (
    <section className="min-h-screen bg-background">
      <div className="fixed right-4 top-4 sm:right-6 sm:top-6 z-50">
        <ThemeToggle />
      </div>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left side image section */}
        <section className="relative hidden h-40 sm:h-48 md:h-64 bg-gray-900 lg:col-span-5 lg:flex lg:h-full lg:items-end xl:col-span-6">
          <img
            alt="Professional interview setup"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="relative z-10 p-6 sm:p-8 md:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Create your MockMate account
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-white/90 max-w-xs md:max-w-sm">
              Build interview confidence with guided question sets and
              performance insights.
            </p>
          </div>
        </section>

        {/* Right side form section */}
        <main className="flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 md:px-8 lg:col-span-7 lg:py-12 lg:px-8 xl:col-span-6 bg-background">
          <div className="mt-6 sm:mt-8">
            <SignUp />
          </div>
        </main>
      </div>
    </section>
  );
}
