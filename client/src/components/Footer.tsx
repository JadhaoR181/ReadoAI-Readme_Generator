"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function Footer() {
  const githubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (githubRef.current) {
      const anim = lottie.loadAnimation({
        container: githubRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/github-icon.json", // Make sure this is in your /public folder
      });

      return () => anim.destroy(); // Cleanup
    }
  }, []);

  return (
    <footer className="w-full border-t border-neutral-800 bg-[#0f0f0f] text-gray-400 text-sm py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left */}
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Reado AI</span>. All rights
          reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-5">
          <Link
            href="https://github.com/JadhaoR181/"
            target="_blank"
            className="hover:text-white transition flex items-center gap-1"
          >
            <div ref={githubRef} className="w-6 h-6" />
            GitHub
          </Link>

          <Link href="#features" className="hover:text-white transition">
            Features
          </Link>
          <Link
            href="mailto:jadhaor181@gmail.com"
            className="hover:text-white transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
