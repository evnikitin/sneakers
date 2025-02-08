"use client";

import { useMemo, useState } from "react";
import sneakers from "../../lib/mock";
import Image from "next/image";
import { useCartActions } from "@/app/_lib/_hooks";
import { toast, ToastContainer } from "react-toastify";
import styles from "./Product.module.css";

interface ProductProps {
  id: number;
}

const Product = ({ id }: ProductProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { onAddToCart } = useCartActions();

  const sneaker = useMemo(() => {
    return sneakers.find((product) => product.id === id);
  }, [id]);

  if (!sneaker) {
    return <div>Товар не найден</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Choose size");
      return;
    }

    onAddToCart(sneaker, selectedSize, quantity);
    toast.success("Product has been added to your cart!");
  };

  return (
    <div className="min-h-screen mx-auto p-6">
      <div
        className={`${styles.grid_template} grid max-w-[1350px] mx-auto  gap-8`}
      >
        <div
          className={`${styles.grid_image} relative flex justify-center items-start`}
        >
          <div className=" max-h-[500px] w-full lg:w-[650px] pb-[60%] relative overflow-hidden">
            <Image
              src={sneaker.image}
              alt={sneaker.model}
              fill
              className="transition-all rounded-lg transform hover:scale-110 hover:translate-y-4 duration-500 ease-in-out animate-highlight"
            />
          </div>
        </div>
        <div
          className={`${styles.grid_description} w-full flex flex-col justify-center`}
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            {sneaker.model}
          </h1>
          <p className="text-xl text-gray-600 mt-2"> Brand: {sneaker.brand}</p>
          <p className="text-lg font-semibold text-gray-900 mt-4">
            Price: ${sneaker.price}
          </p>
          <p className="mt-4 text-gray-700">{sneaker.description}</p>
        </div>
        <div
          className={`${styles.grid_actions} flex flex-col justify-start lg:flex-row lg:justify-between lg:items-end xl:flex-col xl:items-start`}
        >
          <div>
            <span className="text-lg font-semibold text-gray-800">
              Available Sizes:
            </span>
            <div className="mt-2 flex gap-4 flex-wrap">
              {sneaker.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-gray-300 text-gray-900"
                      : "bg-gray-100 text-gray-600"
                  } hover:bg-gray-200 transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                -
              </button>
              <input
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                min="1"
                className="w-16 text-center border-gray-300 rounded p-2"
              />
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-fit py-2 px-9 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="colored"
      />
    </div>
  );
};

export default Product;
