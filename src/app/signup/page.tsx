"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 201 || response.status === 200) {
        toast.success("Signup successful!");
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { username, email, password } = user;
    setButtonDisabled(!(username && email && password));
  }, [user]);

  return (
    <main className="min-h-screen flex items-center font-serif justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md bg-cyan/70 p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl text-center font-bold text-white mb-6">
          Signup
        </h1>

        <input
          className="w-full p-3 mb-4 rounded-3xl bg-blue-100 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded-3xl bg-blue-100 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          className="w-full p-3 mb-6 rounded-3xl bg-blue-100 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full p-3 font-semibold rounded-3xl transition duration-200 ${
            buttonDisabled || loading
              ? "bg-blue-200 text-blue-950 cursor-not-allowed"
              : "bg-cyan-600 text-white hover:bg-cyan-400"
          }`}
        >
          {buttonDisabled ? "Fill all fields" : loading ? "Processing..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm text-white">
          Already have an account?{" "}
          <Link href="/login" className="underline text-white hover:text-blue-800">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
