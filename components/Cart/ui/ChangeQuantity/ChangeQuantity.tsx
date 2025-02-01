"use client";
import React from "react";

interface ChangeQuantityProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const ChangeQuantity = ({
  quantity,
  onDecrease,
  onIncrease,
}: ChangeQuantityProps) => {
  return (
    <div className="flex w-full md:w-auto flex-grow justify-between md:justify-evenly items-center gap-3 mt-4 md:mt-0">
      <button
        disabled={quantity === 1}
        onClick={onDecrease}
        className={`bg-gray-300 text-xl text-gray-700 p-5 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-colors ${
          quantity === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-400"
        }`}
      >
        -
      </button>
      <span className="text-base sm:text-lg font-semibold">{quantity}</span>
      <button
        onClick={onIncrease}
        className="bg-gray-300 text-xl text-gray-700 p-5 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-colors hover:bg-gray-400"
      >
        +
      </button>
    </div>
  );
};
