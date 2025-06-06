"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { LampDemo } from "@/components/lamp";
import { motion } from "motion/react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
      
        await axios.get("/api/users/logout"); 
        toast.success("Logout successful!");
      } catch (error: any) {
        toast.error("Logout failed!");
        console.error(error);
      } finally {
        router.push("/login"); 
      }
    };

    handleLogout();
  }, [router]);

  return (
    <><div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cyan-200">
          <h1 className="text-3xl font-bold text-blue-950">Logging you out...</h1>

      </div>
      <main>
              <LampDemo />
          </main></>
  );
}
