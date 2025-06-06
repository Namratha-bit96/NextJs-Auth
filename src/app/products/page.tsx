import Image from "next/image";
import { notFound } from "next/navigation";

const products = [
  {
    id: 1,
    title: "Sunset Serenity",
    price: "₹2,499",
    description: "A calming view of a sunset over tranquil waters.",
    imageUrl: "/images/art1.jpg",
  },
  {
    id: 2,
    title: "Mystic Mountains",
    price: "₹3,199",
    description: "Misty mountain range with an ethereal glow.",
    imageUrl: "/images/art2.jpg",
  },
  {
    id: 3,
    title: "Ocean Bliss",
    price: "₹1,999",
    description: "A peaceful moment by the waves of a tropical sea.",
    imageUrl: "/images/art3.jpg",
  },
  
];

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((item) => item.id === parseInt(params.id));

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden">
        <div className="relative w-full md:w-1/2 h-96">
          <Image
            src={product.imageUrl}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-l-xl"
          />
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-pink-600">{product.title}</h1>
            <p className="text-purple-800 mt-4">{product.description}</p>
            <p className="text-xl text-pink-500 font-semibold mt-6">
              {product.price}
            </p>
          </div>
          <button className="mt-6 bg-pink-400 text-white py-2 px-4 rounded-full hover:bg-pink-500 transition w-fit">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
