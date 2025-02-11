"use client";
import React from "react";

interface CheckoutCardProps {
  countOfItems: number;
  totalPrice: number;
  onAddOrder: () => void;
}

export const CheckoutCard = ({
  countOfItems,
  totalPrice,
  onAddOrder,
}: CheckoutCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col h-[fit-content] sm:mx-[20%] sm:my-0 xl:m-0 lg:col-span-3 xl:col-span-2 ">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
      Cart Summary
    </h2>

    <div className="text-lg sm:text-xl text-gray-700 mb-2">
      <p className="text-gray-400 text-sm sm:text-base">
        Total items: {countOfItems}
      </p>
      <div className="flex justify-between">
        <p className="font-semibold inline text-lg sm:text-xl">Total Price:</p>
        <p className="font-semibold inline text-lg sm:text-xl">
          ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>

    <button
      onClick={onAddOrder}
      className="bg-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg shadow-md hover:bg-gray-700 transition ease-in-out duration-200 transform hover:scale-105 mt-4 w-full lg:w-auto"
    >
      Purchase Order
    </button>
  </div>
);
