"use client";

import { useState } from "react";
import sneakers from "../lib/mock";
import { ProductCard } from "./ProductCard";
import { generatePageNumbers } from "@/app/utils";

const PRODUCTS_PER_PAGE = 9;

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = sneakers.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sneakers.length / PRODUCTS_PER_PAGE);

  const productList = generatePageNumbers(totalPages, currentPage);

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)]">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-6">
        {currentProducts.map((sneaker) => (
          <div className="w-full" key={sneaker.id}>
            <ProductCard product={sneaker} />
          </div>
        ))}
      </main>

      <div className="flex justify-center items-center gap-1 p-4">
        {productList.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => {
                if (typeof page === "number") {
                  setCurrentPage(page); // Устанавливаем только число
                }
              }}
              className={`px-4 py-2 rounded-full text-white ${
                page === currentPage ? "bg-gray-500 " : "bg-gray-400"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}
