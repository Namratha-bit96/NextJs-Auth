"use client";

import Link from "next/link";
const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
};
import { LampDemo } from "@/components/lamp";
import { motion } from "motion/react";
import React from "react";


export default function ArtStoreHomePage() {
  return (
    <>
      
      <header className="w-full bg-slate-950 text-white py-4 shadow-md fixed top-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h6 className="text-2xl align-middle font-Lato font-bold text-white-400"> Dream in Color</h6>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link href="/products" className="hover:text-cyan-300">
                Products
              </Link>
            </li>
            <li>
              <Link href={ROUTES.LOGIN} className="hover:text-cyan-300">
                Login
              </Link>
            </li>
            <li>
              <Link href={ROUTES.SIGNUP} className="hover:text-cyan-300">
                Signup
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


