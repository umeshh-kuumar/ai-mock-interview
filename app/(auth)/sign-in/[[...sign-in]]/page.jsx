'use client'

import { SignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ThemeToggle from "/components/theme-toggle"

export default function SignInPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/dashboard')
    }
  }, [isSignedIn, router])

  if (isSignedIn) return null

  return (
    <section className="min-h-screen bg-background">
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Professional interview setup"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Welcome to AI Interview Mocker</h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Practice realistic interview rounds, improve your confidence, and get instant AI-backed feedback.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-xl rounded-2xl border border-white/30 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:p-8">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Sign in to continue</h1>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Pick up your interview practice where you left off.
            </p>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  )
}