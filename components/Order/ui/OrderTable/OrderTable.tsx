import React from "react";
import { getStatusColor } from "../../lib/statusUtils";
import { Order } from "../../lib/types";

export const OrderTable = ({ orders }: { orders: Order[] }) => (
  <table className="hidden md:table min-w-full bg-gray-800 border border-neutral-500 rounded-lg overflow-hidden">
    <thead>
      <tr className="bg-gray-700">
        <th className="py-3 px-6 text-left font-semibold text-gray-300">
          Order ID
        </th>
        <th className="py-3 px-6 text-left font-semibold text-gray-300">
          Date
        </th>
        <th className="py-3 px-6 text-left font-semibold text-gray-300">
          Status
        </th>
        <th className="py-3 px-6 text-left font-semibold text-gray-300">
          Total Amount
        </th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr
          key={order.orderId}
          className="border-b border-neutral-500 hover:bg-gray-700"
        >
          <td className="py-4 px-6 text-gray-200">{order.orderId}</td>
          <td className="py-4 px-6 text-gray-200">{order.date}</td>
          <td className={`py-4 px-6 ${getStatusColor(order.status)}`}>
            {order.status}
          </td>
          <td className="py-4 px-6 text-gray-200">{order.totalAmount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
