"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CartLink = () => {
  const countOfOrders = 5;
  return (
    <Link href="/cart" className="flex gap-1 items-center">
      <Image src="/cart.svg" width={40} height={40} alt="cart icon" />
      Cart ({countOfOrders})
    </Link>
  );
};

export default CartLink;
