"use client";
import  {useRouter} from "next/navigation"
import Home from "@/component/sample";
import axios from "axios";
import { useState } from "react";

export default function newProducts() {
  const [formdata, setFormdata] = useState({
    title: " ",
    description: " ",
    price: " ",
  });
  console.log(formdata);
 const [goToProducts, setGoToProducts] = useState(false)
  function handleChange(event) {
    setFormdata((prevFormdata) => {
      return {
        ...prevFormdata,
        [event.target.name]: event.target.value,
      };
    });
  }
  const router = useRouter()
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      title: formdata.title,
      description: formdata.description,
      price: formdata.price,
    };
    await axios.post("http://localhost:5000/products/add", data);
    setGoToProducts(true)

  }
  if(goToProducts){
    return router.push('/products')
  }
  return (
    <Home>
      <form onSubmit={handleSubmit}>
        <h1>New Product</h1>

        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          name="title"
          value={formdata.title}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          placeholder="description"
          name="description"
          value={formdata.description}
          onChange={handleChange}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          name="price"
          value={formdata.price}
          onChange={handleChange}
        />
        <button className="btn-primary">Save</button>
      </form>
    </Home>
  );
}
