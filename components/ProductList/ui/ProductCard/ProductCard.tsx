"use client";
import Image from "next/image";
import { Sneaker } from "../../lib/types";

interface CroductCardProps {
  product: Sneaker;
}
export default function ProductCard({ product }: CroductCardProps) {
  const addToCart = () => {
    ///
  };
  return (
    <div className="max-w-full h-[100%] rounded overflow-hidden shadow-lg">
      <div className="relative" style={{ paddingBottom: "60%" }}>
        <Image
          src={product.image}
          alt={product.model}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          quality={100}
        />
      </div>
      <div className="px-6 py-4 bg-slate-50">
        <div className="font-bold text-xl mb-2">{product.model}</div>
        <div className="mb-2">
          <p className="text-gray-700 text-base">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="font-bold text-xl">${product.price}</span>
            <button
              onClick={addToCart}
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
    </div>
  );
}
