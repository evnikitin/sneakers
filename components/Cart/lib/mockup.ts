import { CartItem } from "./types";
import sneakers from "@/components/ProductList/lib/mock";

export const cart: CartItem[] = [
  {
    product: sneakers[0],
    quantity: 2,
    size: sneakers[0].sizes[2],
  },
  {
    product: sneakers[8],
    quantity: 1,
    size: sneakers[3].sizes[2],
  },
];
