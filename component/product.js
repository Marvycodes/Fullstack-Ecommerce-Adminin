"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/component/Nav";
import Home from "@/component/sample";

export default function product() {
  return <Home>test result product</Home>;
}
