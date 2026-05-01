"use client";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";
import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import CTABanner from "./CTABanner";
import Footer from "./Footer";

const FAQS = [
  { q: "How does the AI interview simulation work?", a: "MockMate uses advanced LLMs to generate role-specific questions based on your job title, tech stack, and experience level. You answer via voice or text, and the AI evaluates your response in real time." },
  { q: "What kinds of interviews can I practice?", a: "We cover technical interviews (DSA, system design), behavioral (STAR method), HR rounds, and domain-specific rounds for roles like frontend, backend, data science, and product management." },
  { q: "How is feedback generated?", a: "After each answer, the AI scores you on clarity, depth, and relevance. It also provides an ideal answer, key points you missed, and specific improvement tips." },
  { q: "Is my interview data private?", a: "Absolutely. Your sessions are stored securely and never shared with third parties. You can delete your data at any time from your account settings." },
  { q: "Can I use MockMate for free?", a: "Yes! The free plan gives you 5 mock interviews per month. Upgrade to Pro for unlimited sessions, advanced analytics, and industry-specific question banks." },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Nav scrolled={scrolled} />
      <HeroSection />
      <Stats />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ faqs={FAQS} openFaq={openFaq} setOpenFaq={setOpenFaq} />
      <CTABanner />
      <Footer />
    </div>
  );
}

