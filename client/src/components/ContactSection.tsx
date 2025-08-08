'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="w-full py-20 px-6 md:px-10 bg-[transparent] backdrop-blur text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-10 text-gray-100">
        💬 Get in Touch
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left content with personal info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h3 className="text-2xl font-semibold text-gray-200">Let`s Connect</h3>
          <p className="text-base text-gray-400">
            Feel free to reach out to me for collaborations, freelance projects,
            or any questions regarding development or tech.
          </p>
          <div className="space-y-2 text-gray-400">
            <p><span className="font-medium text-white">Name:</span> Ravindra Jadhav</p>
            <p><span className="font-medium text-white">Email:</span> jadhaor181@gmail.com</p>
            <p><span className="font-medium text-white">Location:</span> Mumbai, Maharashtra</p>
            <p><span className="font-medium text-white">GitHub:</span> <a href="https://github.com/JadhaoR181" target="_blank" className="hover:underline text-gray-400">github.com/JadhaoR181</a></p>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 bg-[transparent] p-8 rounded-xl border border-[#2b2b2b] shadow-sm"
        >
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#121212] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#121212] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 rounded bg-[#121212] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Your message or question"
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r cursor-pointer from-gray-300 to-gray-400 text-black font-semibold text-m transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-gray-400 hover:to-gray-600 shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
