import { OrderStatus } from "./types";

export const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Completed]: "text-green-500",
  [OrderStatus.Pending]: "text-yellow-500",
  [OrderStatus.Shipped]: "text-blue-500",
  [OrderStatus.Canceled]: "text-red-500",
};

// Функция для получения цвета по статусу
export const getStatusColor = (status: OrderStatus): string => {
  return statusColors[status] || "text-gray-500"; // по умолчанию серый
};
