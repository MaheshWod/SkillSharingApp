// import NavFooter from '../Components/NavFooter'
// import { useCart } from '../Context/cart'
// import { useAuth } from '../Context/auth'
// import { useNavigate } from 'react-router-dom'
// import { useState,useEffect } from 'react'
// import axios from 'axios'
// const CartPage = () => {
//   const [auth, setAuth] = useAuth()
//   const [cart, setCart] = useCart()
//   const navigate = useNavigate()


//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     try {
//       const sum = cart?.reduce((acc, item) => acc + Number(item.price || 0), 0);
//       setTotal(sum);
//     } catch (error) {
//       console.log(error);
//       setTotal(0); // Set to 0 in case of error
//     }
//   }, [cart]);
  
//   // Format the total price for display
//   const formattedTotalPrice = total.toLocaleString("en-US", {
//     style: "currency",
//     currency: "USD",
//   });
  
//   // Khalti Payment Initialization
//   const handleKhaltiPayment = async () => {
//     try {
//       const item = cart[0];
//       if (!item) {
//         alert('Cart is empty!');
//         return;
//       }
//       const website_url = window.location.origin;
  
//       const response = await axios.post('/api/v1/initialize', { // ध्यान दिनुहोस्: Backend server को सही URL प्रयोग गर्नुहोस्
//         itemId: item._id,
//         totalPrice: Number(item.price) || 0, // NaN वा undefined हुन नदिनुहोस्
//         website_url,
//       });
//   console.log(response)
//       if (response.data.success) {
//         window.location.href = response.data.payment.payment_url;
//       } else {
//         alert('Payment Initialization Failed');
//       }
//     } catch (error) {
//       console.error('Payment Initialization Error:', error);
//     }
//   };
  


    

    


//   // removing
//   const removeCartItems = (pid) => {
//     try {
//       let myCart = [...cart]
//       let index = myCart.findIndex((items) => items._id === pid)
//       myCart.splice(index, 1)
//       setCart(myCart)
//       localStorage.setItem("cart", JSON.stringify(myCart))
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <NavFooter>
//       <div className="grid grid-cols-2 item-center min-h-screen mx-10 my-4 gap-2 rounded shadow ">

//         <div className="space-y-4">
//           {cart.map((p) => (
//             <div
//               key={p._id}
//               className="grid grid-cols-2 h-80  border border-gray-300 rounded-lg overflow-hidden shadow-md"
//             >
//               <div>
//                 {p.photo ? (
//                   <img
//                     src={`/api/v1/products/product-photo/${p._id}`}
//                     className="object-cover"
//                     alt={p.name || 'Product Image'}
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                     <p className="text-gray-500">No Image</p>
//                   </div>
//                 )}
//               </div>
//               <div className="px-4">
//                 <div className="py-2">
//                   <h5 className="text-lg font-semibold">Name: {p.name || 'No Name'}</h5>
//                   <h4>Category: {p.category.name}</h4>
//                   <p className="text-gray-600 text-sm mt-2">Description: {p.description.slice(0, 30) || 'No Description'}...
//                   </p>
//                   <p className="text-gray-600 text-sm mt-2">Price: ${p.price || 'N/A'}</p>
//                 </div>
//                 <button
//                   onClick={() => removeCartItems(p._id)}
//                   className="bg-red-500 text-white rounded hover:bg-orange-500 py-1 px-2">
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>


//         <div className='px-4 mx-8'>
//           <div className='text-xl  font-semibold'>
//             <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
//           </div>
//           <div >
//             <h4>
//               {cart?.length
//                 ? `You have ${cart.length} items in your cart ${auth?.token ? '' : 'Please login to checkout'
//                 }`
//                 : 'Your Cart is Empty'}
//             </h4>
//           </div>

//           <div>
//             <h4 className='text-xl'>Car| Summary| Paymentt</h4>
//             <h4>Total:{formattedTotalPrice}</h4>
//           </div>

//           <button onClick={handleKhaltiPayment}
//            className='py-1 px-2 my-2 bg-slate-500 hover:bg-gray-600 text-white rounded'>
//             Payment
//           </button>
//         </div>

//       </div>
//     </NavFooter>
//   )
// }

// export default CartPage



import NavFooter from '../Components/NavFooter'
import { useCart } from '../Context/cart'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CartPage = () => {
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    try {
      const sum = cart?.reduce((acc, item) => acc + Number(item.price || 0), 0)
      setTotal(sum)
    } catch (error) {
      console.log(error)
      setTotal(0) 
    }
  }, [cart])

  const formattedTotalPrice = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

  // Khalti Payment Initialization
  const handleKhaltiPayment = async () => {
    try {
      const item = cart[0]
      if (!item) {
        alert('Cart is empty!')
        return
      }
      const website_url = window.location.origin

      // Use the correct backend API URL
      const response = await axios.post('/initialize', {
        itemId: item._id,
        totalPrice: Number(item.price) || 0,
        website_url,
      })

      console.log(response)
      if (response.data.success) {
        window.location.href = response.data.payment.payment_url
      } else {
        alert('Payment Initialization Failed')
      }
    } catch (error) {
      console.error('Payment Initialization Error:', error)
    }
  }

  // Removing items from cart
  const removeCartItems = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((items) => items._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem("cart", JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <NavFooter>
      <div className="grid grid-cols-2 item-center min-h-screen mx-10 my-4 gap-2 rounded shadow ">

        <div className="space-y-4">
          {cart.map((p) => (
            <div
              key={p._id}
              className="grid grid-cols-2 h-80 border border-gray-300 rounded-lg overflow-hidden shadow-md"
            >
              <div>
                {p.photo ? (
                  <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="object-cover"
                    alt={p.name || 'Product Image'}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No Image</p>
                  </div>
                )}
              </div>
              <div className="px-4">
                <div className="py-2">
                  <h5 className="text-lg font-semibold">Name: {p.name || 'No Name'}</h5>
                  <h4>Category: {p.category.name}</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Description: {p.description.slice(0, 30) || 'No Description'}...
                  </p>
                  <p className="text-gray-600 text-sm mt-2">Price: ${p.price || 'N/A'}</p>
                </div>
                <button
                  onClick={() => removeCartItems(p._id)}
                  className="bg-red-500 text-white rounded hover:bg-orange-500 py-1 px-2">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='px-4 mx-8'>
          <div className='text-xl font-semibold'>
            <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
          </div>
          <div>
            <h4>
              {cart?.length
                ? `You have ${cart.length} items in your cart ${auth?.token ? '' : 'Please login to checkout'
                }`
                : 'Your Cart is Empty'}
            </h4>
          </div>

          <div>
            <h4 className='text-xl'>Cart | Summary | Payment</h4>
            <h4>Total: {formattedTotalPrice}</h4>
          </div>

          <button 
            onClick={handleKhaltiPayment}
            className='py-1 px-2 my-2 bg-slate-500 hover:bg-gray-600 text-white rounded'>
            Payment
          </button>
        </div>

      </div>
    </NavFooter>
  )
}

export default CartPage

