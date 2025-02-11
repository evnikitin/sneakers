import React from "react";
import { getStatusColor } from "../../lib/statusUtils";
import { Order, OrderStatus } from "@/app/_lib/types";

interface OrderTableProps {
  orders: Order[];
  isAdmin: boolean;
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderTable = ({
  orders,
  isAdmin,
  onStatusChange,
}: OrderTableProps) => {
  return (
    <table className="hidden md:table min-w-full bg-gray-800 border border-neutral-500 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-700">
          <th className="py-3 pl-6 text-left font-semibold text-gray-300">
            Order ID
          </th>
          <th className="py-3 pl-6 text-left font-semibold text-gray-300">
            Date
          </th>
          <th className="py-3 pl-6 text-left font-semibold text-gray-300">
            Status
          </th>
          {isAdmin ? (
            <th className="py-3 pl-6 text-left font-semibold text-gray-300">
              User Email
            </th>
          ) : (
            <th className="py-3 pl-6 text-left font-semibold text-gray-300">
              Total Amount
            </th>
          )}
          <th className="py-3 pl-6 text-left font-semibold text-gray-300">
            Products
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString(
            "en-GB"
          );

          return (
            <tr
              key={order.id}
              className="border-b border-neutral-500 hover:bg-gray-700"
            >
              <td className="py-4 pl-6 text-gray-200">{order.id}</td>
              <td className="py-4 pl-6 text-gray-200">{formattedDate}</td>
              <td className="py-4 pl-6 ">
                {isAdmin ? (
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onStatusChange?.(order.id, e.target.value as OrderStatus)
                    }
                    className="bg-gray-700 text-gray-200 border border-neutral-500 rounded-lg p-1"
                  >
                    {Object.values(OrderStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                )}
              </td>
              <td className="py-4 pl-6 text-gray-200">${order.price}</td>
              {isAdmin && (
                <td className="py-4 pl-6 text-gray-200">{order.userEmail}</td>
              )}
              <td className="py-4 pl-6 text-gray-200">
                {order.products.map((item, index) => (
                  <div key={index} className="text-gray-300">
                    {item.product.model} (x{item.quantity}, Size: {item.size})
                  </div>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
