import React from "react";
import { Order } from "../../lib/types";
import { getStatusColor } from "../../lib/statusUtils";

export const MobileOrderCard = ({ order }: { order: Order }) => (
  <div className="mb-4 p-6 bg-gray-700 rounded-lg shadow-md">
    <p className="font-bold text-lg">
      Order ID: <span className="text-gray-300">{order.orderId}</span>
    </p>
    <p className="mt-2">
      Date: <span className="text-gray-300">{order.date}</span>
    </p>
    <p className="mt-2">
      Status:{" "}
      <span className={`${getStatusColor(order.status)}`}>{order.status}</span>
    </p>
    <p className="mt-2">
      Total Amount: <span className="text-gray-300">{order.totalAmount}</span>
    </p>
  </div>
);
