"use client";
import Image from "next/image";
import { MouseEvent } from "react";
import Link from "next/link";
import { Sneaker } from "@/app/_lib/types";
import { useCartActions } from "@/app/_lib/_hooks";
import { toast } from "react-toastify";

interface CroductCardProps {
  product: Sneaker;
}
export default function ProductCard({ product }: CroductCardProps) {
  const { onAddToCart } = useCartActions();

  const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart(product, product.sizes[0], 1);
    toast.success("Product has been added to your cart!");
  };
  return (
    <Link
      href={`/sneakers/${product.id}`}
      className="max-w-full block h-[100%] rounded overflow-hidden shadow-lg"
    >
      <div className="relative object-cover pb-[60%]">
        <Image
          src={product.image}
          alt={product.model}
          fill
          className="rounded-t-lg"
          quality={100}
        />
      </div>
      <div className="px-6 py-4 bg-slate-50 h-[inherit]">
        <div className="font-bold text-xl mb-2">{product.model}</div>
        <div className="mb-2">
          <p className="text-gray-700 text-base">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="font-bold text-xl">${product.price}</span>
            <button
              onClick={(e) => addToCart(e)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {product.brand}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {product.color}
          </span>
        </div>
        <p className="text-lg pb-2 text-gray-700">Размеры</p>
        <div className="pb-4">
          {product.sizes.map((size, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
