"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FocusCards } from "@/components/ui/focus-cards";
import { LampDemo } from "@/components/lamp";
import { Card } from "@/components/ui/focus-cards";
const cards = [
  {
    id: "1",
    title: "Misty Forest",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Valley of life",
    src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Blue Ocean",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Camping",
    src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Mid Forest Road",
    src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Lonely Human",
    src: "https://assets.aceternity.com/the-first-rule.png",
  },
];

export default function ProductsPage() {
  return (
  <main className="flex flex-col bg-slate-950 font-serif min-h-screen rounded-1xl p-4">
  
        <FocusCards cards={cards} />
      
      </main>
  );
}
