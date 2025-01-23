import * as React from "react";
import styles from "./Header.module.css";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Link from "next/link";
import CartLink from "./BurgerMenu/CartLink";

const Header = () => {
  //получение информации о том, залогинен ли пользователь
  const hasUser = false;
  return (
    <header className="h-12 md:h-16 text-neutral-500 bg-gray-300 uppercase font-bold flex ">
      <nav className="flex justify-between items-center w-full px-4">
        <div className="hidden md:flex flex-1 gap-4">
          <Link href="/">Homepage</Link>
          <Link href="/clothes">Clothes</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex-1 md:text-center text-xl text-neutral-600 font-bold">
          <h1 className={styles.animate_title}>
            <Link href="/">AXOLOTL</Link>
          </h1>
        </div>
        <div className="hidden md:flex flex-1 gap-4 items-center justify-end">
          {hasUser ? (
            <Link href="/orders">Orders</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
          <CartLink />
        </div>
        <BurgerMenu />
      </nav>
    </header>
  );
};

export default Header;
