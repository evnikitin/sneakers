import ProductList from "@/components/ProductList/ui/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sneakers",
};

export default function Home() {
  return (
    <>
      <ProductList></ProductList>
    </>
  );
}
