'use client';

import { motion } from 'framer-motion';
import {
  ClipboardList,
  Sparkles,
  MonitorSmartphone,
  Download,
} from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList className="w-6 h-6 text-indigo-400" />,
    title: 'Paste Your Repo URL',
    desc: 'Start by providing your GitHub repository link. That`s all we need.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-pink-400" />,
    title: 'AI Writes README',
    desc: 'Our AI understands your project and writes a clean, informative README.',
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-emerald-400" />,
    title: 'Instant Live Preview',
    desc: 'See your README rendered in real time before downloading.',
  },
  {
    icon: <Download className="w-6 h-6 text-yellow-400" />,
    title: 'Download Instantly',
    desc: 'One-click download. Add it to your GitHub repo or share it anywhere.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-20 px-6 md:px-10 bg-transparent text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-10 mb-14 text-gray-100">
        🛠️ How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 max-w-5xl mt-10 mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start gap-6 p-8 bg-[#1f1f1f] border border-neutral-800 rounded-xl shadow-md hover:shadow-lg hover:border-indigo-500/40 transition-all duration-300"
          >
            <div className="flex-shrink-0 ">{step.icon}</div>
            <div>
              <h3 className="text-l font-semibold text-gray-200 mb-2">
                {step.title}
              </h3>
              <p className="text-md text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
