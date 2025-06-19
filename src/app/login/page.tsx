"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful!");
      router.push("/products");
    } catch (error: any) {
      console.error("Login failed:", error.message);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password } = user;
    setButtonDisabled(!(email && password));
  }, [user]);

  return (
    <main className="min-h-screen flex items-center font-serif justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md bg-cyan/70 p-8 rounded-3xl shadow-xl">
        <h1 className="  text-3xl text-center font-bold text-white mb-6">
          Login
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-3xl bg-blue-100 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

         <div className="w-full flex justify-end">
  <Link
    href="/reset-password"
    className="text-white underline font-bold mb-0.5"
  >
    Forgot Your Password?
  </Link>
</div>

          
        <input
          className="w-full p-3 mb-6 rounded-3xl  bg-blue-100 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
          type="password"
          placeholder="Password"
          value={user.password}
          
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />



        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full p-3 font-semibold rounded-3xl transition duration-200 ${
            buttonDisabled || loading
              ? "bg-blue-200 text-blue-950 cursor-not-allowed"
              : "bg-cyan-600 text-white hover:bg-cyan-400"
          }`}
        >
          {buttonDisabled ? "Fill all fields" : loading ? "Processing..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link href="/signup" className="underline text-white hover:text-cyan-400">
            Signup here
          </Link>
        </p>
      </div>
    </main>
  );
}

