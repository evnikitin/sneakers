"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartLink from "./CartLink";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Clothes", url: "/clothes" },
  { id: 3, title: "Working Hours", url: "/hours" },
  { id: 4, title: "Contact", url: "/contact" },
];

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const switchMenu = () => {
    setIsOpen(!isOpen);
  };

  //получение информации о том, залогинен ли пользователь
  const hasUser = false;
  return (
    <div className="md:hidden">
      {isOpen ? (
        <Image
          src="/close.png"
          alt="burger_menu"
          width={25}
          onClick={switchMenu}
          height={25}
        />
      ) : (
        <Image
          src="/burger-menu-left.svg"
          alt="burger_menu"
          width={25}
          height={25}
          onClick={switchMenu}
        />
      )}
      {isOpen && (
        <div className="absolute left-0 top-12 flex flex-col justify-center items-center text-center bg-gray-600 text-gray-300 w-full h-[calc(100vh-3rem)] text-3xl gap-8">
          {links.map((item) => (
            <Link key={item.id} href={item.url} onClick={switchMenu}>
              {item.title}
            </Link>
          ))}
          {hasUser ? (
            <Link href="/orders" onClick={switchMenu}>
              Orders
            </Link>
          ) : (
            <Link href="/login" onClick={switchMenu}>
              Login
            </Link>
          )}
          <div onClick={switchMenu}>
            <CartLink />
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
