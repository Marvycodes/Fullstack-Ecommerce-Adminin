"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/component/Nav";
import { useState } from "react";
import Link from "next/link";

export default function Home({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    return (
      <section className="bg-byGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Sign in
          </button>
          <button
            onClick={() => signOut()}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Sign out
          </button>
        </div>
      </section>
    );
  }
  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
        <Link href="/" className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
            />
          </svg>
          <span>EcommerceAdmin</span>
        </Link></div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className=" flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
