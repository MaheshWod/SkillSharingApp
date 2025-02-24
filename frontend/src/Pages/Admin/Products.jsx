
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavFooter from "../../Components/NavFooter";
import AdminMenu from "../../Components/AdminMenu";
import Swal from "sweetalert2";

const Products = () => {
    const [products, setProducts] = useState([]);

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/products/get-product");
            console.log("Fetched Data:", data.products); // Debugging
            if (data?.success && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid data structure from API",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("API Fetch Error:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to fetch products",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <NavFooter>
            <div className="flex flex-col md:flex-row min-h-screen">
                <div className="w-full md:w-[18%] bg-gray-100 p-4">
                    <AdminMenu />
                </div>
                <div className="w-full md:w-[82%] p-4">
                    <h1 className="text-2xl font-bold text-center mb-4">All Products List</h1>

                    <div className="md:grid grid-cols-4 gap-4 justify-center">
                        {products.length > 0 ? (
                            products.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/products/${p.slug}`}
                                    className="block w-72 border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
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

                                    <div className="p-4">
                                        <h5 className="text-lg font-semibold">{p.name || "No Name"}</h5>
                                        <p className="text-gray-600 text-sm mt-2">
                                            {p.description.slice(0,30) || "No Description"}...
                                        </p>
                                        <p className="text-gray-600 text-sm mt-2">
                                            Price: ${p.price || "N/A"}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No products available.</p>
                        )}
                    </div>
                </div>
            </div>
        </NavFooter>
    );
};

export default Products;



