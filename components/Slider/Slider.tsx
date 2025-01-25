"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const sliderData = [
  {
    title: "Step Into Style and Comfort",
    description:
      "Discover the perfect sneakers for every occasion. Elevate your look and feel the comfort with every step.",
    image: "/silder1.jpg",
  },
  {
    title: "Unmatched Style for the Bold",
    description:
      "Make a statement with sneakers that stand out. Fashion-forward designs for those who dare to be different.",
    image: "/slider2.jpg",
  },
  {
    title: "The Perfect Fit for Her",
    description:
      "Explore our latest collection of women's sneakers, combining comfort, style, and versatility for every woman.",
    image: "/slider3.png",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="md:h-[calc(100vh-4rem)] h-[calc(100vh-3rem)] flex lg:flex-row relative overflow-hidden">
      <div className="flex-1 relative bg-gray-900">
        <Image
          src={sliderData[currentSlide].image}
          alt="slider image"
          fill
          priority={currentSlide === 1}
          className="object-cover bg-black opacity-50"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-center z-[1] text-white">
        <main>
          <h2 className="text-4xl font-bold mb-8 leading-tight md:text-5xl">
            {sliderData[currentSlide].title}
          </h2>
          <p className="text-lg mb-16 md:text-xl">
            {sliderData[currentSlide].description}
          </p>
          <Link
            className="bg-gray-300 text-gray-600 px-6 py-4 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:bg-gray-600 hover:text-gray-300"
            href="/sneakers"
          >
            Shop Now
          </Link>
        </main>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
    </section>
  );
};

export default Slider;
