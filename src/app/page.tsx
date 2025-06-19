"use client";

import Link from "next/link";
import ProductsPage from "@/app/products/page";
const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOMEPAGE: "/homepage",
  PRODUCTS: "/products",
};
import { LampDemo } from "@/components/lamp";
import React from "react";


export default function ArtStoreHomePage() {
  return (
    <>
      
      <main > 
        <LampDemo /> 
        
      <div className="flex flex-row space-x-4 text-center font-serif font-bold justify-center bg-slate-950 px-50 align-middle py-5">
        <Link href="/homepage">
          <button className="px-2 py-3 align-middle bg-slate-950 text-white hover:bg-cyan-600 rounded-3xl transition-all">
            About Us
          </button>
        </Link>
        <Link href="/products">
          <button className="px-2 py-3 align-middle bg-slate-950 text-white hover:bg-cyan-600 rounded-3xl transition-all">
            Explore More
          </button>
        </Link>
        <Link href={ROUTES.LOGIN}>
          <button className="px-2 py-3 align-middle bg-slate-950 text-white hover:bg-cyan-600 rounded-3xl transition-all">
            Login
          </button>
        </Link>
        <Link href={ROUTES.SIGNUP}>
          <button className="px-2 py-3 align-middle bg-slate-950 text-white hover:bg-cyan-600 rounded-3xl transition-all">
            Signup
          </button>
        </Link>
      </div>
      <ProductsPage/> 
      </main>
      <footer className="bg-slate-950 text-white  text-center py-4">@2025 Dream in Color</footer>
    </>
  );
}


