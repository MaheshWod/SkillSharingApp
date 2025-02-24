
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavFooter from "../../Components/NavFooter";

import axios from "axios";

const CategoryList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params.slug) getProductsByCat();
  }, [params.slug]);

  useEffect(() => {
    if (params.slug) getProductsByCat(); // Corrected function name
  }, [params.slug]);

  const getProductsByCat = async () => { // Corrected function name
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <NavFooter>
      <div className="my-2 mx-12 text-center">
        <h1 className="text-xl font-semibold">Category: <span className="text-slate-700">{category?.name}</span></h1>
        <h1 className="text-xl text-slate-500">({products?.length}-Category Found)</h1>


      </div>
      <div className="my-4 mx-14">
      <div className="md:grid md:grid-cols-5 grid-cols-1 gap-y-4 gap-2 justify-center">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              className="block w-64 border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-zinc-200"
            >
              {p.photo ? (
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name || "Product Image"}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image</p>
                </div>
              )}
              <div className="py-2 px-4">
                <h5 className="text-lg font-semibold">{p.name || "No Name"}</h5>
                <p className="text-gray-600 text-sm mt-2">
                  {p.description.slice(0, 30) || "No Description"}...
                </p>
                <p className="text-gray-600 text-sm mt-2">Price: ${p.price || "N/A"}</p>
              </div>
              <div className="flex justify-between px-4 mb-2 space-x-4">


                <button
                  onClick={() => navigate(`/products/${p.category.slug}`, { state: { product: p } })}
                  className="bg-zinc-400 text-black rounded hover:bg-slate-600 py-1 px-2 hover:text-white">
                  More Detail
                </button>
                <button className="bg-orange-400 text-black rounded hover:bg-yellow-200 py-1 px-2">
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
      </div>
    </NavFooter>
  );
};

export default CategoryList;


