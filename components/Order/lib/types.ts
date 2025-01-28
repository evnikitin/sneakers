export enum OrderStatus {
  Completed = "Completed",
  Pending = "Pending",
  Shipped = "Shipped",
  Canceled = "Canceled",
}

export type Order = {
  orderId: string;
  date: string;
  status: OrderStatus;
  totalAmount: string;
};
