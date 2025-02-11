export interface Sneaker {
  id: number;
  model: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
  color: string;
}

export enum CartActions {
  addToCart = "ADD_TO_CART",
  remove = "REMOVE_FROM_CART",
  updateQuantity = "UPDATE_QUANTITY",
  changeSize = "CHANGE_SIZE",
  deleteAll = "DELETE_ALL",
}

export interface ICartProduct {
  product: Sneaker;
  quantity: number;
  size: string;
}

export enum OrderStatus {
  Completed = "Completed",
  Pending = "Pending",
  Shipped = "Shipped",
  Canceled = "Canceled",
}

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  price: number;
  userEmail: string;
  products: ICartProduct[];
};
