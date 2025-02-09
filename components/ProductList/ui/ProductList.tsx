"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { generatePageNumbers } from "../lib/generatePaginationNumbers";
import { ToastContainer } from "react-toastify";
import { Sneaker } from "@/app/_lib/types";

const PRODUCTS_PER_PAGE = 9;

interface ProductListProps {
  sneakers: Sneaker[];
}

export default function ProductList({ sneakers }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      localStorage.setItem("currentPage", JSON.stringify(currentPage));
    } else {
      localStorage.removeItem("currentPage");
    }
  }, [currentPage]);

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
          <article className="w-full" key={sneaker.id}>
            <ProductCard product={sneaker} />
          </article>
        ))}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          theme="colored"
        />
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
                  window.scrollTo(0, 0);
                  setCurrentPage(page);
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
