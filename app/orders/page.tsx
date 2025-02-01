import { orders } from "@/components/Order/lib/mock";
import { MobileOrderCard, OrderTable } from "@/components/Order/ui";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Orders",
};

const OrdersPage = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="m-auto max-w-7xl mx-auto bg-gray-800 text-gray-200 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Order History</h2>

        <OrderTable orders={orders} />

        <div className="block md:hidden">
          {orders.map((order) => (
            <MobileOrderCard key={order.orderId} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
