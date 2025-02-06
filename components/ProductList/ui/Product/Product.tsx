"use client";

import { CartActions, ICartProduct, useCart } from "@/app/_lib/store";
import { useState } from "react";
import sneakers from "../../lib/mock";
import Image from "next/image";
import { Modal } from "@/components/Modal";

interface ProductProps {
  id: number;
}

const Product = ({ id }: ProductProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const sneaker = sneakers.find((product) => product.id === Number(id));
  if (!sneaker) {
    return <div>Товар не найден</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setModalMessage("Пожалуйста, выберите размер.");
      setIsModalOpen(true);
      return;
    }

    const cartItem: ICartProduct = {
      product: sneaker,
      quantity,
      size: selectedSize,
    };

    dispatch({ type: CartActions.addToCart, payload: cartItem });
    setModalMessage("Товар добавлен в корзину!");
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-screen-lg min-h-screen mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Изображение товара */}
        <div className="w-full lg:w-[500px] xl:w-[600px] relative flex justify-center items-center">
          <div className="w-full h-0 pb-[80%] md:pb-[60%] lg:pb-[80%] relative overflow-hidden">
            <Image
              src={sneaker.image}
              alt={sneaker.model}
              layout="fill"
              objectFit="cover"
              className="transition-all rounded-lg transform hover:scale-110 hover:translate-y-4 duration-500 ease-in-out animate-highlight"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{sneaker.model}</h1>
          <p className="text-xl text-gray-600 mt-2">{sneaker.brand}</p>
          <p className="text-lg font-semibold text-gray-900 mt-4">
            ${sneaker.price}
          </p>
          <p className="mt-4 text-gray-700">{sneaker.description}</p>

          {/* Выбор размера */}
          <div className="mt-6">
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
            <span className="text-lg font-semibold text-gray-800">
              Quantity:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                -
              </button>
              <input
                type="number"
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
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Добавить в корзину
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Product;
