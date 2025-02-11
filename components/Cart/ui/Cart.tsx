"use client";
import { CheckoutCard, FullScreenCart, MobileCart } from "@/components/Cart";
import Image from "next/image";
import { useCartActions } from "@/app/_lib/_hooks";
import { useCart } from "@/app/_lib/store";
import { Order, OrderStatus } from "@/app/_lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const addOrder = async (
  newOrder: Omit<Order, "id" | "userEmail" | "createdAt">
) => {
  const response = await fetch("http://localhost:3000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });

  if (!response.ok) {
    throw new Error("Error has been occurred");
  }

  return response.json();
};

export const Cart = () => {
  const { status } = useSession();
  const { state } = useCart();
  const router = useRouter();
  const { deleteItem, deleteAll } = useCartActions();

  const totalPrice = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const mutation = useMutation({
    mutationFn: addOrder,
  });

  const handleAddOrder = () => {
    if (status === "unauthenticated") {
      console.log(status);
      router.push("/login");
    } else {
      const newOrder = {
        price: totalPrice,
        products: state.items,
        status: OrderStatus.Pending,
      };

      mutation.mutate(newOrder);
      deleteAll();
      localStorage.removeItem("cartState");
      router.push("/orders");
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        Your Shopping Cart
      </h1>

      {state.items.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          <div className="xl:col-span-4 lg:col-span-3 space-y-6">
            {state.items.map((item) => (
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
                    onClick={() => deleteItem(item.product.id)}
                  />
                </div>
                <FullScreenCart item={item} />
                <MobileCart item={item} />
              </div>
            ))}
          </div>

          <CheckoutCard
            onAddOrder={handleAddOrder}
            countOfItems={state.items.reduce(
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
