// components/GeneratorSection.tsx
'use client';

import { useState } from 'react';

interface GeneratorSectionProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  handleGenerateClick: () => void;
}

export default function GeneratorSection({
  repoUrl,
  setRepoUrl,
  handleGenerateClick,
}: GeneratorSectionProps) {
  const [error, setError] = useState('');

  const validateAndGenerate = () => {
    const isValidGithubUrl = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/.test(repoUrl.trim());

    if (!isValidGithubUrl) {
      setError('❌ Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)');
      return;
    }

    setError('');
    handleGenerateClick();
  };

  return (
    <section
      id="main-section"
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-transparent text-white text-center"
    >
      <h2 className="text-2xl md:text-5xl font-semibold mb-3 md:mb-6 text-gray-200 tracking-wide text-center md:text-left px-4 md:px-0">
        Enter Your GitHub Repo URL
      </h2>

      <p className="text-sm text-gray-400 mb-6 max-w-xl px-2 md:px-0">
        Paste your GitHub repository link to auto-generate a professional README. Only public repos are supported.
      </p>

      <input
        type="text"
        placeholder="https://github.com/username/repo"
        value={repoUrl}
        onChange={(e) => {
          setRepoUrl(e.target.value);
          if (error) setError(''); // clear error while typing
        }}
        className="w-full max-w-xl px-6 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-2"
      />

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={validateAndGenerate}
        className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r cursor-pointer from-gray-300 to-gray-400 text-black font-semibold text-lg transition-all duration-400 ease-in-out transform hover:scale-110 hover:from-gray-400 hover:to-gray-600 shadow-md hover:shadow-lg"
      >
        Generate README
      </button>
    </section>
  );
}
    