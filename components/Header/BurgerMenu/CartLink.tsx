"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CartLink = () => {
  return (
    <Link href="/cart" className="flex flex-col lg:flex-row items-center">
      Cart
      <Image src="/cart.svg" width={40} height={40} alt="cart icon" />
    </Link>
  );
};

export default CartLink;
