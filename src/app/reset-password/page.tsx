"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email || !token) {
      toast.error("Missing token or email in URL");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/reset-password", {
        email,
        token,
        password,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(res.data.error || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-cyan-300 to-blue-950 px-4 py-10">
      <div className="w-full max-w-md bg-white/70 p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          Reset Your Password
        </h1>

        <input
          className="p-2 mb-3 w-full border border-blue-950 rounded-3xl"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="p-2 mb-3 w-full border border-blue-950 rounded-3xl"
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          className="px-6 py-2 bg-cyan-600 text-white rounded-3xl hover:bg-cyan-400"
          disabled={loading}
        >
          Reset Password
        </button>
      </div>
    </main>
  );
}
