import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import AdminMenu from "../../Components/AdminMenu";
import NavFooter from "../../Components/NavFooter";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`);
      if (data?.product) {
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setSelectedCategory(data.product.category?._id || "");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (params.slug) {
      getSingleProduct();
    }
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const { data } = await axios.put(`/api/v1/products/update-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        Swal.fire("Success!", "Product updated successfully", "success").then(() => {
          navigate("/dashboard/admin/products");
        });
      } else {
        Swal.fire("Error!", data.message, "error");
      }
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire("Error!", "Failed to update product", "error");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/v1/products/delete-product/${id}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success").then(() => {
          navigate("/dashboard/admin/products");
        });
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Swal.fire("Error!", "Failed to delete product", "error");
    }
  };

  return (
    <NavFooter>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 p-2">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4 p-2">
            <h1 className="text-2xl font-bold mb-4">Update Product</h1>
            <div className="w-full lg:w-3/4">
              <div className="mb-4">
                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg block text-center">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div className="mb-4">
                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product_photo" className="h-48 mx-auto" />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/products/product-photo/${id}`}
                      className="w-full h-48 object-cover"
                      alt={name || "Product Image"}
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Select
                  placeholder="Select Category"
                  className="w-full"
                  onChange={(value) => setSelectedCategory(value)}
                  value={selectedCategory}
                >
                  {categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavFooter>
  );
};

export default UpdateProduct;
