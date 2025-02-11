"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartLink from "./CartLink";
import { UserLinks } from "../UserLinks/UserLinks";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Sneakers", url: "/sneakers" },
  { id: 3, title: "Contact", url: "/contact" },
];

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const switchMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
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
        <div className="absolute z-20 left-0 top-12 md:top-16 flex flex-col justify-center items-center text-center bg-gray-600 text-gray-300 w-full h-[calc(100vh-3rem)] text-3xl gap-8">
          {links.map((item) => (
            <Link key={item.id} href={item.url} onClick={switchMenu}>
              {item.title}
            </Link>
          ))}
          <UserLinks />
          <div onClick={switchMenu}>
            <CartLink />
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
