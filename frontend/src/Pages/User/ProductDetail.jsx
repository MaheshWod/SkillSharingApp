// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import NavFooter from "../../Components/NavFooter";

// const ProductDetails = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   // Initial product details
//   useEffect(() => {
//     if (params?.slug) {
//         getProduct();
//     } else {
//         console.error("Slug is undefined");
//     }
// }, []);

// console.log(params.slug)
//   // Fetch product details
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/products/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       console.log(data)
//       // getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch similar products
//   // const getSimilarProduct = async (pid, cid) => {
//   //   try {
//   //     const { data } = await axios.get(
//   //       `/api/v1/products/related-product/${pid}/${cid}`
//   //     );
//   //     setRelatedProducts(data?.products);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   return (
//     <NavFooter>
//       <div className="container mx-auto p-4">
//         <div className="flex flex-wrap md:flex-nowrap gap-8 mb-8">
//           {/* <div className="flex-1">
//             <img
//               src={`/api/v1/products/product-photo/${product._id}`}
//               alt={product.name}
//               className="w-full h-72 object-cover rounded-lg shadow-md"
//             />
//           </div> */}
//           <div className="flex-1">
//             <h1 className="text-3xl font-semibold mb-4">Product Details</h1>
//             <hr className="mb-4" />
//             {/* <p className="text-lg mb-2">Name: {product.name}</p>
//             <p className="text-lg mb-2">Description: {product.description}</p> */}
//             <p className="text-lg mb-2">
//               Price: {product?.price?.toLocaleString("en-US", {
//                 style: "currency",
//                 currency: "USD",
//               })}
//             </p>
//             <p className="text-lg mb-4">Category: {product?.category?.name}</p>
//             <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
//               ADD TO CART
//             </button>
//           </div>
//         </div>

//         <hr className="my-8" />
//         {/* <div>
//           <h4 className="text-2xl font-semibold mb-4">Similar Products ➡️</h4>
//           {relatedProducts.length < 1 && (
//             <p className="text-center">No Similar Products found</p>
//           )}
//           <div className="flex flex-wrap gap-4">
//             {relatedProducts?.map((p) => (
//               <div key={p._id} className="w-full md:w-1/4 p-2">
//                 <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                   <img
//                     src={`/api/v1/products/product-photo/${p._id}`}
//                     alt={p.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <h5 className="text-lg font-medium">{p.name}</h5>
//                       <h5 className="text-lg font-semibold text-green-600">
//                         {p.price.toLocaleString("en-US", {
//                           style: "currency",
//                           currency: "USD",
//                         })}
//                       </h5>
//                     </div>
//                     <p className="text-sm mb-4">
//                       {p.description.substring(0, 60)}...
//                     </p>
//                     <button
//                       className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
//                       onClick={() => navigate(`/product-detail/${p.slug}`)}
//                     >
//                       More Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div> */}
//       </div>
//     </NavFooter>
//   );
// };

// export default ProductDetails;


import { useLocation } from 'react-router-dom';
import NavFooter from '../../Components/NavFooter';

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>No product details available.</p>;
  }

  return (

    <NavFooter>

      <div className="p-4 bg-slate-100 my-4 shadow-md mx-16 rounded border">
        
        <div className='flex gap-4'>
          <img
            src={`/api/v1/products/product-photo/${product._id}`}
            alt={product.name}
            className="w-80 h-72 object-cover rounded"
          />
          <div className='px-2'>
          <h1 className="text-xl font-semibold  ">Name: <span className='font-semibold text-slate-600'>{product.name}</span></h1>
            <p className=" font-semibold">Category: <span className='capitalize text-slate-600'>{product.category.slug}</span>
            </p>
            <p className="text-lg font-semibold">Price: <span className='text-slate-600'>
                ${product.price}
              </span></p>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <button className="bg-orange-400 text-black rounded hover:bg-yellow-200 py-1 px-2 my-3">
              Add To Cart
            </button>

          </div>
        </div>
      </div>
    </NavFooter>
  );
};

export default ProductDetail;
