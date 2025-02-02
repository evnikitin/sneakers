"use client";
import { cart } from "../lib/mockup";
import { CheckoutCard, FullScreenCart, MobileCart } from "@/components/Cart";
import Image from "next/image";

export const Cart = () => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          <div className="xl:col-span-4 lg:col-span-3 space-y-6">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="relative md:flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl"
              >
                <div className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-700 hover:text-red-500">
                  <Image
                    src="/bin.png"
                    alt="delete"
                    width={25}
                    height={25}
                    onClick={() => {}}
                  />
                </div>
                <FullScreenCart item={item} />
                <MobileCart item={item} />
              </div>
            ))}
          </div>

          <CheckoutCard
            countOfItems={cart.reduce(
              (total, item) => total + item.quantity,
              0
            )}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </div>
  );
};
