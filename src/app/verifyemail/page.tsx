"use client";

import { LampDemo } from "@/components/lamp";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get("token");

  if (urlToken) {
    setToken(urlToken);
  } else {
    setLoading(false);  
    setError(true);     
  }
}, []);


  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/verifyemail", { token });

      if (res.data.success) {
        setVerified(true);
      } else {
        setError(true);
      }
    } catch (error: any) {
      console.error("Verification failed:", error.response?.data || error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <><div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-cyan-300 to-blue-950 px-4 py-6">
          <h1 className="text-3xl font-bold mb-4"></h1>

          {loading && <p className="text-blue-950 text-lg">Verifying your email...</p>}

          {verified && (
              <div className="text-shadow-cyan-200 text-center">
                  <h2 className="text-xl mb-2">Your email has been successfully verified!</h2>
                  <Link href="/login" className="text-shadow-cyan-400 underline">Go to Login</Link>
              </div>
          )}

          {!loading && error && (
              <div className="text-red-400 text-center">
                  <h2 className="text-xl mb-2">Invalid or expired token.</h2>
                  <Link href="/signup" className="text-blue-300 underline">Sign Up Again</Link>
              </div>
          )}
      </div><main>
              <LampDemo />
          </main></>
  );
}

