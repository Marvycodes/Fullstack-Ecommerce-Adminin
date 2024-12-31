"use client";

import Home from "@/component/sample";
import axios from "axios";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function deleteProducts() {
  const searchparam = useSearchParams();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  console.log(id);
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("http://localhost:5000/products/" + id)
      .then((response) => {
        setProductInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct(){
    await axios.delete("http://localhost:5000/products/" + id);
    goBack()
  }
  return (
    <Home>
      <h1 className="text-center">Do you really want to delete &nbsp;"{productInfo?.title}?"</h1>
      <div className="flex gap-2 justify-center">
      <button className="btn-red" onClick={deleteProduct}>Yes</button>
      <button onClick={goBack} className="btn-default">
        No
      </button></div>
    </Home>
  );
}
