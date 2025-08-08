"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import lottie from "lottie-web";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const lightningRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load Lottie animation
  useEffect(() => {
    if (lightningRef.current) {
      const anim = lottie.loadAnimation({
        container: lightningRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lightning-logo.json",
      });
      return () => anim.destroy();
    }
  }, []);

  // Load user data from localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // Navigate to profile
  const handleProfileClick = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    router.push("/profile");
  };

  // Logout
  const handleLogout = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "How It Works", id: "how-it-works" },
    { label: "Features", id: "features" },
    { label: "Contact", id: "contact" },
  ];

  const userInitial = user?.name?.[0] || user?.email?.[0] || "?";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[transparent]/70 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="relative flex items-center">
          <div
            ref={lightningRef}
            className="absolute -top-5 -left-6 w-24 h-24 rotate-45 pointer-events-none z-10"
          />
          <button
            onClick={() =>
              document.getElementById("landingSection")?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-300 text-2xl font-bold tracking-wide relative z-20"
          >
            Reado<span className="text-gray-500">AI</span>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-[15px] font-medium">
          {navLinks.map(({ id, label }) => (
            <button
              key={label}
              onClick={() => scrollToId(id)}
              className="relative px-2 py-1 text-gray-300 hover:text-white transition group"
            >
              {label}
              <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-gray-200 transition-all group-hover:w-full"></span>
            </button>
          ))}

          <Link
            href="https://github.com/JadhaoR181/"
            target="_blank"
            className="relative px-2 py-1 text-gray-300 hover:text-white transition group"
          >
            GitHub
            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-gray-200 transition-all group-hover:w-full"></span>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-700 mx-2" />

          {/* User or Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="group relative w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-black font-bold"
              >
                {userInitial.toUpperCase()}
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-40 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg py-2"
                >
                  <button
                    onClick={handleProfileClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-800"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-800"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-black font-bold">
                L
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 hover:text-white transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-neutral-900 bg-opacity-80 px-6 py-4 space-y-4 text-gray-300"
        >
          {navLinks.map(({ id, label }) => (
            <button
              key={label}
              onClick={() => scrollToId(id)}
              className="block text-base font-medium hover:text-white"
            >
              {label}
            </button>
          ))}
          <Link
            href="https://github.com/JadhaoR181/"
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className="block text-base font-medium hover:text-white"
          >
            GitHub
          </Link>

          {user ? (
            <>
              <button
                onClick={handleProfileClick}
                className="block w-full text-left text-base font-medium hover:text-white"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-base font-medium text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-base font-medium hover:text-white"
            >
              Login
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
  