"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/reset-password", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(res.data.error || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md bg-white/70 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl text-blue-950 font-bold mb-4">Reset Password</h1>

        <input
          className="w-full p-2 mb-3 border border-blue-800 rounded-3xl"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 border border-blue-800 rounded-3xl"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 border border-blue-800 rounded-3xl"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full py-2 bg-blue-950 text-white rounded hover:bg-cyan-500"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </main>
  );
}

