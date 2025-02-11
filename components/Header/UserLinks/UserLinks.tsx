import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

export const UserLinks = () => {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <div className="flex flex-col gap-8 lg:flex-row items-center lg:gap-4">
          <Link href="/orders" aria-label="View your orders">
            Orders
          </Link>
          <button
            onClick={() => signOut()}
            aria-label="Sign out from your account"
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <Link href="/login" aria-label="Log in to your account">
          LOG In
        </Link>
      )}
    </>
  );
};
