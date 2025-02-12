"use client";
import Image from "next/image";

import React from "react";
import { ChangeQuantity } from "../ChangeQuantity/ChangeQuantity";
import { ICartProduct } from "@/app/_lib/types";
import { useCartActions } from "@/app/_lib/_hooks";

interface MobileCartProps {
  item: ICartProduct;
}

export const MobileCart = ({ item }: MobileCartProps) => {
  const { onDecrease, onIncrease, changeSize } = useCartActions();

  return (
    <div className="md:hidden mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="mx-auto">
          <div className="mb-2 flex items-center">
            <div className="flex sm2:flex-row flex-col items-center gap-3">
              <Image
                src={item.product.image}
                className="rounded-lg object-cover h-36"
                alt={item.product.model}
                width={200}
                height={150}
              />
              <h2 className="font-semibold text-center">
                {item.product.model}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between border-b py-5">
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Brand</p>
          <p className="font-medium">{item.product.brand}</p>
        </div>
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Color</p>
          <p className="font-medium">{item.product.color}</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-between border-b py-5">
        <div className="flex w-1/2 flex-col">
          <p className="text-xs">Size</p>
          <select
            id="size-select"
            value={item.size}
            onChange={(e) => changeSize(item.product.id, e.target.value)}
            className="mt-2 bg-gray-200 p-2 lg:p-3 rounded-md text-base w-fit"
          >
            {item.product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-1/2 flex-col">
          <p className="text-xs mb-2">Price</p>
          <p className="font-medium text-xl">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      <ChangeQuantity
        quantity={item.quantity}
        onDecrease={() => onDecrease(item.product.id)}
        onIncrease={() => onIncrease(item.product.id)}
      />
    </div>
  );
};
