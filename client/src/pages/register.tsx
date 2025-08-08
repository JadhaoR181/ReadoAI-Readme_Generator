'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Github, Mail, UserPlus, AlertTriangle, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import API_BASE_URL from '@/config/api';

export default function UserRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
  name: formData.name,
  email: formData.email,
  password: formData.password,
});


      toast.success('Registered successfully! Redirecting...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-neutral-950 via-neutral-900 to-black text-gray-200 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md space-y-6 backdrop-blur-sm bg-neutral-900/70 rounded-xl p-8 shadow-2xl border border-neutral-800">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create an Account 🚀</h1>
          <p className="text-sm text-gray-400">Join ReadoAI and build smarter READMEs</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm border border-red-500 rounded px-3 py-2 bg-red-500/10">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gray-200 text-black font-semibold hover:bg-white transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Registering...
              </>
            ) : (
              <>
                Register <UserPlus className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative text-center text-sm text-gray-400">
          <div className="absolute left-0 top-2 w-full border-t border-neutral-700" />
          <span className="relative bg-neutral-900 px-3">OR</span>
        </div>

        {/* Social Signup */}
        <div className="space-y-3">
          <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2 text-sm border border-neutral-700">
            <Mail size={18} /> Sign up with Google
          </button>
          <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2 text-sm border border-neutral-700">
            <Github size={18} /> Sign up with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-gray-200 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
