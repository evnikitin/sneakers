import Link from "next/link";
import * as React from "react";

const Footer = () => {
  return (
    <footer className="bottom-0 w-full h-12 md:h-16 text-neutral-500 px-4 lg:px-20 xl:px-40 bg-gray-300 uppercase font-bold flex justify-between items-center  ">
      <Link className="text-neutral-500 text-xl" href="/">
        AXOLOTL
      </Link>
      <p>© ALL RIGHTS RESERVED</p>
    </footer>
  );
};

export default Footer;
