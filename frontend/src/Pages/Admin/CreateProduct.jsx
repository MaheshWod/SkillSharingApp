

import React, { useState, useEffect } from "react";
import NavFooter from "../../Components/NavFooter";
import AdminMenu from "../../Components/AdminMenu";
import Swal from "sweetalert2";
import axios from "axios";
// import { useAuth } from "../../Context/auth";
import {useNavigate } from "react-router-dom";


const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  // const [auth,setAuth] = useAuth()
  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
        // Swal.fire({
        //   title: "Success!",
        //   text: "Categories fetched successfully",
        //   icon: "success",
        // });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch categories",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);
  // console.log(productData)
      const { data } = await axios.post("/api/v1/products/create-product", productData);
      if (data?.success) {
        // console.log(data)

        Swal.fire({
          title: "Success!",
          text: "Product created successfully",
          icon: "success",
        })
          navigate("/dashboard/admin/products");
      
      } else {
        Swal.fire({
          title: "Error!",
          text: data?.message || "Failed to create product",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };
  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const productData = new FormData();
  //     productData.append("name", name);
  //     productData.append("description", description);
  //     productData.append("price", price);
  //     productData.append("photo", photo);
  //     productData.append("category", category);
  
  //     // Debugging: Log the form data entries
  //     for (let pair of productData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  
  //     const { data } = await axios.post("/api/v1/auth/products/create-product", productData);
  
  //     if (data?.success) {
  //       Swal.fire({
  //         title: "Success!",
  //         text: "Product created successfully",
  //         icon: "success",
  //       });
  //       navigate("/dashboard/admin/products");
  //     } else {
  //       Swal.fire({
  //         title: "Error!",
  //         text: data?.message || "Failed to create product",
  //         icon: "error",
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: error.response?.data?.message || "Something went wrong!",
  //       icon: "error",
  //     });
  //   }
  // };
  
  
  return (
    <NavFooter>
      <div className="flex min-h-screen">
        {/* Admin Menu - 20% Width */}
        <div className="w-1/5 bg-gray-200 p-4">
          <AdminMenu />
        </div>

        {/* Form Section - 80% Width */}
        <div className="w-4/5 p-6">
          <h1 className="text-2xl font-bold mb-4">Create Product</h1>

          <form onSubmit={handleCreate} className="space-y-4 w-full max-w-lg">
            {/* Category Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Select a Category
              </label>
              <select
                className="w-full border p-2 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Choose a category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Photo
              </label>
              <input
                type="file"
                className="w-full border p-2 rounded"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
            </div>

            {/* Image Preview */}
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Product Preview"
                  className="w-32 h-32 object-cover mx-auto"
                />
              </div>
            )}

            {/* Product Name */}
            <div>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Product Price */}
            <div>
              <input
                type="number"
                className="w-full border p-2 rounded"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                CREATE PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </NavFooter>
  );
};

export default CreateProduct;
