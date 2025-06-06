"use client";

import Link from "next/link";
import { ROUTES } from "../api/users/homepage/route";
import { LampDemo } from "@/components/lamp";
import { motion } from "motion/react";
import React from "react";


export default function ArtStoreHomePage() {
  return (
    <>
      {/* Navigation Bar */}
      <header className="w-full bg-slate-900 text-white py-4 shadow-md fixed top-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-cyan-400">Dream in Color</h1>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link href="/products" className="hover:text-cyan-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="/logout" className="hover:text-cyan-300">
                Logout
              </Link>
            </li>
            
          </ul>
        </nav>
      </header>

    
      <main > 
        <LampDemo />
      </main>
    </>
  );
}
