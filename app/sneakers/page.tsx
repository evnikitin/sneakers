import ProductList from "@/components/ProductList/ui/ProductList";
import { Metadata } from "next";
import { Sneaker } from "../_lib/types";

export const metadata: Metadata = {
  title: "Sneakers",
};

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/sneakers", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data ");
  }
  return res.json();
};

export default async function Home() {
  const sneakers: Sneaker[] = await getData();
  return (
    <>
      <ProductList sneakers={sneakers}></ProductList>
    </>
  );
}
