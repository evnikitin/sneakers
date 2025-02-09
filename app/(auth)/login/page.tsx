"use client";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-gray-800 p-12 rounded-xl shadow-lg w-80 md:w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Log in to your account
        </h2>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center py-3 px-4 bg-gray-600 text-white rounded-full mb-4 hover:bg-gray-500 focus:outline-none transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="mr-1"
          >
            <path
              d="M19.625 12.2208C19.625 11.7208 19.5625 11.3458 19.5 10.9396H12.125V13.5958H16.5C16.3438 14.7521 15.1875 16.9396 12.125 16.9396C9.46875 16.9396 7.3125 14.7521 7.3125 12.0333C7.3125 7.68958 12.4375 5.68958 15.1875 8.34583L17.3125 6.31458C15.9688 5.06458 14.1875 4.28333 12.125 4.28333C7.8125 4.28333 4.375 7.75208 4.375 12.0333C4.375 16.3458 7.8125 19.7833 12.125 19.7833C16.5938 19.7833 19.625 16.6583 19.625 12.2208Z"
              fill="#fff"
            />
          </svg>
          Log in with Google
        </button>

        <button
          onClick={() => signIn("github")}
          className="w-full flex items-center justify-center py-3 px-4 bg-gray-600 text-white rounded-full mb-4 hover:bg-gray-500 focus:outline-none transition"
        >
          <svg
            className="mr-1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M4.37891 12.2273C4.37891 7.88955 7.78846 4.3833 12.0061 4.3833C16.2111 4.3833 19.6332 7.88955 19.6207 12.2273C19.6207 15.6946 17.4361 18.6295 14.4054 19.6686C14.0266 19.7466 13.8877 19.4997 13.8877 19.2919C13.8877 19.2057 13.8891 19.0551 13.8909 18.8539C13.8946 18.449 13.9002 17.8389 13.9002 17.1362C13.9002 16.3959 13.6604 15.9284 13.3825 15.6817C15.0873 15.4868 16.8678 14.8246 16.8678 11.8116C16.8678 10.9545 16.5774 10.2532 16.0848 9.70786C16.1605 9.5131 16.4259 8.70778 16.0091 7.62993C16.0091 7.62993 15.3651 7.4221 13.9128 8.43509C13.3066 8.26631 12.6501 8.17531 12.0061 8.17531C11.3621 8.17605 10.7209 8.26339 10.0992 8.43509C8.64714 7.4221 8.00313 7.62993 8.00313 7.62993C7.58629 8.70778 7.85154 9.5131 7.92726 9.70786C7.44734 10.2532 7.14446 10.9545 7.14446 11.8116C7.14446 14.8246 8.92488 15.4999 10.6171 15.6817C10.4024 15.8765 10.2002 16.2271 10.1372 16.7336C9.69519 16.9414 8.59655 17.279 7.91477 16.0843C7.91477 16.0843 7.51057 15.3311 6.74026 15.2791C6.74026 15.2791 5.99524 15.2791 6.68967 15.7596C6.68967 15.7596 7.19489 15.9933 7.53586 16.9024C7.53586 16.9024 7.97768 18.305 10.0994 17.8374C10.0994 18.2621 10.1047 18.6757 10.1084 18.9619C10.1104 19.1133 10.1119 19.2291 10.1119 19.292C10.1119 19.4997 9.97309 19.7466 9.59418 19.6685C6.56353 18.6297 4.37891 15.6946 4.37891 12.2273Z"
              fill="#fff"
            />
          </svg>
          Log in with GitHub
        </button>

        <div className="text-center text-sm text-gray-400 mt-6">
          <p>
            Have a question?{" "}
            <Link href="/contact" className="text-blue-400 hover:text-blue-500">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
