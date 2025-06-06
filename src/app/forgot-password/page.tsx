"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/request-reset", { email });

      if (res.data.success) {
        toast.success("Password reset email sent!");
        router.push("/login");
      } else {
        toast.error(res.data.error || "Failed to send email");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-300 to-blue-950 px-4 py-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-900">
          Forgot Password
        </h2>
        <input
          type="email"
          className="w-full border p-2 rounded-lg mb-4"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-950 text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </main>
  );
}
