
import NavFooter from '../Components/NavFooter'
// import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/cart';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [check, setCheck] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [cart, setCart] = useCart()

  // Getting all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
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
    // geting total page
    // getTotal()
  }, []);

  // Getting all products with page number and loadmore
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/v1/products/get-product");
      setLoading(false)
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
      setLoading(false)
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch products",
        icon: "error",
      });
    }
  };

  // Filtering function
  const handleFilter = (value, id) => {
    let all = [...check];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  };

  // Filtering products based on selected categories
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        check,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (check.length) {
      filterProduct(); // Filter products when categories are selected
    } else {
      getAllProducts(); // Get all products if no category is selected
    }
  }, [check]);

  return (
    <NavFooter>
      <div className="flex">
        <div className="flex flex-col w-[15%] py-4 px-4 gap-4 bg-zinc-400">
          <h1 className="font-semibold">Filter By Category</h1>
          <div className="flex flex-col gap-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="capitalize font-semibold"
              >
                {/* Checkbox ma always checked use garne, like e.target.checked not e.target.check */}
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* resetcheckbox ko lagi */}
          <div>
            <button className='py-1 px-2 bg-red-600 text-white  rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-red-400'
              onClick={() => window.location.reload()}>ResetCheckbox</button>
          </div>
        </div>

        <div className="w-full md:w-[85%] py-4 px-12">
          <h1 className="text-2xl font-bold text-center mb-4">All Products List</h1>
          <div className="md:grid md:grid-cols-4 grid-cols-1 gap-4 justify-center">
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
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart",JSON.stringify([...cart, p]))
                        Swal.fire({
                          icon: 'success',
                          title: 'Added to Cart!',
                          text: 'Your item has been added to the cart.',
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }}

                      className="bg-orange-400 text-black rounded hover:bg-yellow-200 py-1 px-2">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products available.</p>
            )}
          </div>
          {/* showing page number */}
          {/* <div className='my-2'>
          {
            products && products.length < total && (
              <button onClick={(e)=>{e.preventDefault();
              setPage(page + 1)}}
               className='bg-red-300 py-1 px-2'>{loading ? "Loading..." : "loadMore"}
               </button>
            )
          }
        </div> */}
        </div>



      </div>
    </NavFooter>
  );
};

export default Home;




