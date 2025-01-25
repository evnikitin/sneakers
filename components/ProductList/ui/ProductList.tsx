import sneakers from "../lib/mock";
import { ProductCard } from "./ProductCard";

export default function ProductList() {
  //получение товаров
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-6">
      {sneakers.map((sneaker) => (
        <div className="w-full " key={sneaker.id}>
          <ProductCard product={sneaker} />
        </div>
      ))}
    </main>
  );
}
