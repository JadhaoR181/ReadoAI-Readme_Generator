'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff, Github, Mail, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import API_BASE_URL from '@/config/api';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store token & user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Trigger navbar update without refresh
      window.dispatchEvent(new Event('storage'));

      toast.success(`Welcome back, ${user.name || 'User'}! 👋`, {
        duration: 3000,
      });

      // Redirect after short delay for better UX
      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Invalid email or password');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-gray-200 flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md space-y-6 backdrop-blur-sm bg-neutral-900/70 rounded-xl p-8 shadow-2xl border border-neutral-800">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back 🤖</h1>
          <p className="text-sm text-gray-400">Login to your ReadoAI account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-1 text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-3 top-[35px] text-gray-400 hover:text-gray-200"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gray-200 text-black font-semibold hover:bg-white transition duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Logging in...
              </>
            ) : (
              <>
                Login <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative text-center text-sm text-gray-400">
          <div className="absolute left-0 top-2 w-full border-t border-neutral-700" />
          <span className="relative bg-neutral-900 px-3">OR</span>
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2 text-sm border border-neutral-700">
            <Mail size={18} /> Continue with Google
          </button>
          <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2 text-sm border border-neutral-700">
            <Github size={18} /> Continue with GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link href="/register" className="text-gray-200 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
