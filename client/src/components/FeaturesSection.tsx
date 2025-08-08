// components/FeatureHighlights.tsx
import { motion } from "framer-motion";
import {
  FileText,
  Eye,
  Settings,
  Smartphone,
  Loader,
  Code2,
} from "lucide-react";

const features = [
  {
    icon: <FileText className="w-8 h-8 text-indigo-400" />,
    title: "Auto README Generator",
    desc: "Instantly generate professional README files with AI-driven markdown structure.",
  },
  {
    icon: <Eye className="w-8 h-8 text-pink-400" />,
    title: "Live Preview Panel",
    desc: "Real-time markdown rendering with beautiful formatting and syntax.",
  },
  {
    icon: <Settings className="w-8 h-8 text-emerald-400" />,
    title: "Customizable Options",
    desc: "Pick and choose what sections to include — install, usage, license, and more.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-yellow-400" />,
    title: "Responsive Design",
    desc: "Fully responsive layout that works on desktop and mobile seamlessly.",
  },
  {
    icon: <Loader className="w-8 h-8 text-cyan-400 animate-spin-slow" />,
    title: "Shimmer Loader",
    desc: "Smooth shimmer animation during generation phase for delightful UX.",
  },
  {
    icon: <Code2 className="w-8 h-8 text-red-400" />,
    title: "Modern Stack",
    desc: "Powered by React, Next.js, TailwindCSS, Markdown, and Lottie.",
  },
];

export default function FeatureHighlights() {
  return (
    <section id ="features" className="w-full py-20 px-6 md:px-10 bg-[transparent] text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-10 mb-14 text-gray-100">
        ⚡ Feature Highlights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] border border-[#333] hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-100">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
