"use client";

import Link from "next/link";
import { ROUTES } from "../api/users/homepage/route";
import { LampDemo } from "@/components/lamp";
import { motion } from "motion/react";
import React from "react";


export default function ArtStoreHomePage() {
  return (
    <>
       
      <main className="min-h-screen flex items-center font-serif justify-center bg-slate-950 px-4 py-10"> 
        

        <div className="p-10 font-serif text-white text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
<p className="mt-3 space-y-4 text-lg">
  Welcome to our Art Store — a vibrant digital space where creativity meets craftsmanship. We believe that art has the power to transform spaces, evoke emotions, and tell stories that words cannot.
  <br />
  Our platform is dedicated to showcasing a diverse collection of artworks, from serene landscapes and abstract expressions to bold modern pieces, all carefully curated for art lovers and collectors alike.
  <br />
  At the heart of our mission is the desire to support emerging artists by providing them with a platform to share their vision with the world. Whether you're looking to decorate your home, gift a masterpiece, or simply get inspired, our store offers a seamless experience to explore and purchase authentic artwork. Join us in celebrating creativity — one brushstroke at a time.
</p>
        </div>
      </main>
      <footer className="bg-slate-950 text-white  text-center py-4">@2025 Dream in Color</footer>
    </>
  );
}
