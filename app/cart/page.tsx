import Cart from "@/components/Cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function Home() {
  return <Cart></Cart>;
}
