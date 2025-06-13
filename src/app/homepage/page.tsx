"use client";

import Link from "next/link";
import { ROUTES } from "../api/users/homepage/route";
import { LampDemo } from "@/components/lamp";
import { motion } from "motion/react";
import React from "react";


export default function ArtStoreHomePage() {
  return (
    <>
     
      <main > 
        <LampDemo />
      </main>
    </>
  );
}
