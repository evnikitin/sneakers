import { Sneaker } from "@/components/ProductList/lib/types";

export interface CartItem {
  product: Sneaker;
  quantity: number;
  size: string;
}
