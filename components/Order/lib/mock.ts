import { Order, OrderStatus } from "./types";

export const orders: Order[] = [
  {
    orderId: "ORD12345",
    date: "2025-01-15",
    status: OrderStatus.Completed,
    totalAmount: "$120.00",
  },
  {
    orderId: "ORD12346",
    date: "2025-01-17",
    status: OrderStatus.Pending,
    totalAmount: "$75.00",
  },
  {
    orderId: "ORD12347",
    date: "2025-01-20",
    status: OrderStatus.Shipped,
    totalAmount: "$200.00",
  },
  {
    orderId: "ORD12348",
    date: "2025-01-22",
    status: OrderStatus.Canceled,
    totalAmount: "$50.00",
  },
];
