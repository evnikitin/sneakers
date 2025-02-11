import React from "react";
import { getStatusColor } from "../../lib/statusUtils";
import { Order, OrderStatus } from "@/app/_lib/types";

interface MobileOrderCardProps {
  order: Order;
  isAdmin: boolean;
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

export const MobileOrderCard = ({
  order,
  isAdmin,
  onStatusChange,
}: MobileOrderCardProps) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB");

  return (
    <div className="mb-4 p-6 bg-gray-700 rounded-lg shadow-md">
      <p className="font-bold text-lg">
        Order ID: <span className="text-gray-300">{order.id}</span>
      </p>
      <p className="mt-2">
        Date: <span className="text-gray-300">{formattedDate}</span>
      </p>
      <p className="mt-2">
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
      </p>
      <p className="mt-2">
        Total Amount: <span className="text-gray-300">${order.price}</span>
      </p>
      {isAdmin && (
        <p className="mt-2">
          User Email: <span className="text-gray-300">{order.userEmail}</span>
        </p>
      )}

      <div className="mt-4">
        {order.products.map((item, index) => (
          <p key={index} className="text-gray-300">
            {item.product.model} (x{item.quantity}, Size: {item.size})
          </p>
        ))}
      </div>
    </div>
  );
};
