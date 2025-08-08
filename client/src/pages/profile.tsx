"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "@/config/api";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Unauthorized");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("Session expigray. Please login again.");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleEditProfile = () => {
    toast("Edit Profile feature coming soon!", { icon: "✏️" });
  };

  const handleChangePassword = () => {
    toast("Change Password coming soon!", { icon: "🔒" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <Toaster position="top-right" />

      {/* Home Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition border border-gray-600 text-sm"
      >
        Home
      </button>

      {/* Profile Card */}
      <div className="max-w-md w-full p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={handleEditProfile}
            className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition shadow"
          >
            Edit Profile
          </button>
          <button
            onClick={handleChangePassword}
            className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition shadow"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
