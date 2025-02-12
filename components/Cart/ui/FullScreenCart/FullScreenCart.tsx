"use client";
import Image from "next/image";

import React from "react";
import { ChangeQuantity } from "../ChangeQuantity/ChangeQuantity";
import { ICartProduct } from "@/app/_lib/types";
import { useCartActions } from "@/app/_lib/_hooks";

interface FullScreenCartProps {
  item: ICartProduct;
}

export const FullScreenCart = ({ item }: FullScreenCartProps) => {
  const { onDecrease, onIncrease, changeSize } = useCartActions();

  return (
    <div className="hidden md:grid grid-cols-[minmax(240px,_1fr)_3fr_2fr_1fr] gap-4 w-full items-center">
      <div className="relative sm:w-full sm:min-h-36 lg:w-full lg:h-44 mb-4 sm:mb-0 sm:mr-6">
        <Image
          src={item.product.image}
          alt={item.product.model}
          fill
          className="rounded-lg object-cover"
          quality={100}
        />
      </div>

      <div className="flex sm:block mt-4 sm:mt-0 flex-shrink-[2]">
        <h2 className="font-semibold text-base lg:text-lg text-gray-900">
          {item.product.model}
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Color: {item.product.color}
        </p>

        <div className="mt-2">
          <select
            id="size-select"
            value={item.size}
            onChange={(e) => changeSize(item.product.id, e.target.value)}
            className="mt-2 bg-gray-200 p-2 lg:p-3 rounded-md text-sm sm:text-base"
          >
            {item.product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ChangeQuantity
        quantity={item.quantity}
        onDecrease={() => onDecrease(item.product.id)}
        onIncrease={() => onIncrease(item.product.id)}
      />

      <div className="text-right mt-4 sm:mt-0">
        <p className="font-bold text-lg sm:text-xl text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
