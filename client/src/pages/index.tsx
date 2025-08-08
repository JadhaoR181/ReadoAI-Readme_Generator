"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import lottie from "lottie-web";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import "github-markdown-css/github-markdown-dark.css";
import { Toaster, toast } from "react-hot-toast";
import { FiRefreshCcw, FiDownload } from "react-icons/fi";
import FeaturesSection from '@/components/FeaturesSection';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import HowItWorks from "@/components/HowItWorks";
import GeneratorSection from "@/components/GeneratorSection";

export default function Home() {
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [loading, setLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [readmeContent, setReadmeContent] = useState(
    `# 📘 Sample README\n\nThis is where your README will show...`
  );
  const [showPreview, setShowPreview] = useState(false);



const handleGenerateClick = () => {
  if (!repoUrl.trim()) {
    toast.error("Please enter a valid GitHub repository URL.");
    return;
  }
  setLoading(true); // <-- start shimmer
  setShowPreview(true);

  setTimeout(() => {
    previewRef.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      setReadmeContent(`# ${repoUrl}`);
      setLoading(false); // <-- stop shimmer after content loads
    }, 2000);
  }, 300);
};


  const handleClosePreview = () => {
    setShowPreview(false);
    const section = document.getElementById("main-section");
    setTimeout(() => {
      section?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleDownload = () => {
    const blob = new Blob([readmeContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
  };

  const scrollToTop = () => {
    const section = document.getElementById("landingSection");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMain = () => {
    const section = document.getElementById("main-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize(); // check once on mount
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

useEffect(() => {
  if (bgRef.current) {
    const animationPath = isMobile
      ? "/mobile-bg.json"
      : "/circuit-bg.json";

    const bgAnim = lottie.loadAnimation({
      container: bgRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: animationPath,
    });

    return () => bgAnim.destroy();
  }
}, [isMobile]); // re-run when screen size changes

  useEffect(() => {
    if (fgRef.current) {
      const fgAnim = lottie.loadAnimation({
        container: fgRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/github-cat.json",
      });
      return () => fgAnim.destroy();
    }
  }, []);

  useEffect(() => {
    if (scrollButtonRef.current) {
      const scrollAnim = lottie.loadAnimation({
        container: scrollButtonRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/slide-up-arrow.json", // Make sure this file exists in /public
      });
      return () => scrollAnim.destroy();
    }
  }, []);

  useEffect(() => {
  const body = document.body;
  if (showPreview) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }

  // Clean up on unmount
  return () => {
    body.style.overflow = "";
  };
}, [showPreview]);


  return (
    <>
      <Head>
        <title>Reado AI | Futuristic README Generator</title>
      </Head>

      {/* Animated Background */}
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full -z-10 opacity-30 brightness-150"
      />

      {/* Landing Section */}
      <section
        id="landingSection"
        className="flex flex-col items-center justify-center min-h-screen px-4 bg-transparent text-white"
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          <Navbar/>
          <div
            ref={fgRef}
            className="w-36 h-36 md:w-52 md:h-52 mb-10 drop-shadow-[0_0_20px_rgba(200,200,200,0.3)]"
          />

          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400">
            <Typewriter
              words={["Reado AI_"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={150}
              deleteSpeed={150}
              delaySpeed={1000}
            />
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
            Generate polished, AI-powered README files with ease — simple,
            futuristic, GitHub-style.
          </p>

          <button
            onClick={scrollToMain}
            className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r cursor-pointer from-gray-300 to-gray-400 text-black font-semibold text-lg hover:from-gray-350 hover:to-gray-450 transition-all duration-400 ease-in-out transform hover:scale-110 shadow-md hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Main Section */}
       <GeneratorSection
  repoUrl={repoUrl}
  setRepoUrl={setRepoUrl}
  handleGenerateClick={handleGenerateClick}
/>


      {/* README Preview Panel */}
     <AnimatePresence>
  {showPreview && (
    <motion.section
  ref={previewRef}
  id="preview-panel"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 50 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
  className="w-full px-4 py-20 bg-[#0d0d0d]/90 backdrop-blur-xl text-white relative z-20"
>
  <Toaster position="top-right" />
  
  <div className="max-w-6xl mx-auto">
    {/* Heading */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-4 mb-6 gap-4">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight mb-1">
          📄 README Preview
        </h2>
        <p className="text-sm text-gray-400">
          Your generated README in Markdown format.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(readmeContent);
            toast.success("Copied to clipboard!");
          }}
          className="text-sm bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#333] hover:border-cyan-500 px-4 py-1.5 rounded-md transition-all duration-200 shadow-sm"
        >
          📋 Copy
        </button>
        <button
          onClick={handleClosePreview}
          className="text-sm bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#333] hover:border-red-500 px-4 py-1.5 rounded-md transition-all duration-200 shadow-sm"
        >
          ✖ Close
        </button>
      </div>
    </div>

    {/* Preview Markdown Box */}
    <div className="markdown-body text-sm md:text-base leading-relaxed w-full max-w-6xl h-[60vh] overflow-y-auto px-4 py-4 rounded-xl bg-[#0d0d0d] border border-[#222] scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
  {loading ? (
        <div className="w-full space-y-4 animate-pulse">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-4 rounded bg-gradient-to-r from-[#2a2a2a] via-[#3b3b3b] to-[#2a2a2a]"
            ></div>
          ))}
          <div className="h-4 w-1/2 rounded bg-gradient-to-r from-[#2a2a2a] via-[#3b3b3b] to-[#2a2a2a]" />
        </div>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {readmeContent}
        </ReactMarkdown>
      )}
    </div>

    {/* Bottom Buttons */}
    <div className="mt-10 flex flex-wrap justify-center gap-6 z-10">
      <button
        onClick={handleClosePreview}
        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-gray-300 to-gray-400 text-black font-semibold text-m transition-all duration-300 transform hover:scale-105 hover:from-gray-400 hover:to-gray-600 shadow-md"
      >
        <FiRefreshCcw className="text-lg" />
        <span>Generate Again</span>
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-gray-300 to-gray-400 text-black font-semibold text-m transition-all duration-300 transform hover:scale-105 hover:from-gray-400 hover:to-gray-600 shadow-md"
      >
        <FiDownload className="text-lg" />
        <span>Download .md</span>
      </button>
    </div>
  </div>
</motion.section>

  )}
</AnimatePresence>


<HowItWorks/>
       {/* Features Section */}
      <FeaturesSection />

      {/* Floating Scroll-to-Top Button */}
      <button
  onClick={scrollToTop}
  style={{
    position: "fixed",
    bottom: "1.75rem",
    right: "1.75rem",
    zIndex: 9999,
    background: "rgba(255, 255, 255, 0.15)", // lighter glass background
    
    borderRadius: "9999px",
    width: "45px",
    height: "45px",
    boxShadow: "0 4px 12px rgba(200, 250, 250, 0.05)", // lighter shadow
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    backdropFilter: "blur(12px)",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
  aria-label="Scroll to top"
>
  <div
    ref={scrollButtonRef}
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 0 6px rgba(250,250,250, 0.9))", // lighter glow
    }}
  />
</button>

<ContactSection/>

<Footer/>

    </>
  );
}
