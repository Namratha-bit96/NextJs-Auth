

import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const cards = [
  {
    id: "1",
    title: "Misty Forest",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
    description: "Explore the serene forest with our adventure kit.",
  },
  {
    id: "2",
    title: "Valley of life",
    src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop",
    description: "Discover peaceful valleys with every step you take.",
  },
  {
    id: "3",
    title: "Sala behta hi jayega",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop",
    description: "A humorous trek through unexpected paths.",
  },
  {
    id: "4",
    title: "Camping",
    src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop",
    description: "Camp like a pro with the best outdoor gear.",
  },
  {
    id: "5",
    title: "Mid Forest Road",
    src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop",
    description: "Inspiring paths await those who explore the unknown.",
  },
  {
    id: "6",
    title: "Lonely Human",
    src: "https://assets.aceternity.com/the-first-rule.png",
    description: "A mysterious journey into the first rule of the wild.",
  },
];

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = cards.find((p) => p.id === params.id);

  if (!product) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.src}
        alt={product.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold font-serif mb-2">{product.title}</h1>
      <p className="text-lg text-gray-700">{product.description}</p>
    </div>
  );
}
