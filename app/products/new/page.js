"use client";
import { useRouter } from "next/navigation";
import Home from "@/component/sample";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function newProducts() {
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [formdata, setFormdata] = useState({
    title: " ",
    description: " ",
    price: " ",
  });
  const [images, setImages] = useState([]);
  const [productProperties, setProductProperties] = useState({});
  console.log(formdata);
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7000/categories/").then((result) => {
      setCategories(result.data);
    });
  }, []);
  function handleChange(event) {
    setFormdata((prevFormdata) => {
      return {
        ...prevFormdata,
        [event.target.name]: event.target.value,
      };
    });
  }
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      title: formdata.title,
      description: formdata.description,
      price: formdata.price,
      images: images,
      category: category,
      productProperties: productProperties,
    };
    await axios.post("http://localhost:5000/products/add", data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    return router.push("/products");
  }
  async function uploadImages(event) {
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post(
        "http://localhost:5000/products/addproduct",
        data
      );
      console.log(res.data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }
  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catinfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catinfo.properties);
    while (catinfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catinfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catinfo = parentCat;
    }
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
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
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          {" "}
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => {
              return <option value={c._id}>{c.name}</option>;
            })}
        </select>
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div className="">
              <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
              <div>
                <select
                  value={productProperties[p.name]}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-2">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => {
                return (
                  <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                    <img src={link} alt="" className="rounded-lg h-24 w-24" />
                  </div>
                );
              })}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
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
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>
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
