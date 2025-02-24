// import React from 'react'
// import { Link } from 'react-router-dom'
// import { CiStar } from "react-icons/ci";

// const CategorySkill = () => {

//   const skilldetails = [
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/typing.jpg',
//       price: 200,
//       discount: 25,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturiLorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturiLorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/programming.jpg',
//       price: 300,
//       discount: 45,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/cooking.jpg',
//       price: 500,
//       discount: 15,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/keyword.jpg',
//       price: 900,
//       discount: 55,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/keyword.jpg',
//       price: 900,
//       discount: 55,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/keyword.jpg',
//       price: 900,
//       discount: 55,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/keyword.jpg',
//       price: 900,
//       discount: 55,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/keyword.jpg',
//       price: 900,
//       discount: 55,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/keyword.jpg',
//       price: 900,
//       discount: 55,
//     },
//     {
//       title: 'WebDevlopment',
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.",
//       image: '/skills/keyword.jpg',
//       price: 900,
//       discount: 55,
//     },
//   ]

//   const categorybutton = [
//     {
//       title: "Python Developer"
//     },
//     {
//       title: "Web Developer"
//     },
//     {
//       title: "Java Developer"
//     },
//     {
//       title: "Frontend Developer"
//     },
//     {
//       title: "Backend Developer"
//     },
//     {
//       title: "Cooking "
//     },
//     {
//       title: " Developer"
//     },
//   ]
//   return (
//     <>
//       <div className='my-2 mx-8 p-4  '>

//         <div className='flex my-3'>
//           {
//             categorybutton.map((item, index) => (
//               <div key={index} className=''>
//                 <button className='bg-slate-500 hover:bg-zinc-500 py-2 px-6 rounded-full m-2'>{item.title}</button>
//               </div>
//             ))
//           }
//         </div>


//         <div className=' grid grid-cols-4 gap-8 '>
//           {
//             skilldetails.map((item, index) => (
//               <div key={index} className='flex flex-col border shadow-lg rounded bg-neutral-200'>
//                 <img src={item.image} alt='' className='rounded-t h-64' />
//                 <Link to={'/detail'} state={item}>
//                   <div className='p-2 '>
//                     <label className=' font-semibold '>{item.title}</label>
//                     <p className='text-slate-600'>{item.description.slice(0, 50)}....</p>
//                     <div className='flex gap-2'>
//                       <label className='font-semibold text-xl text-zinc-900'>${item.price - ((item.price * item.discount) / 100)}</label>
//                       <del className='text-red-500 text-xl'>${item.price}</del>
//                       <label className='text-xl'>({item.discount}%off)</label>
//                     </div>
//                   </div>


//                   <div className='flex flex-col px-2'>
//                     <label className='text-red-500 flex'>
//                       <p className='mb-1'>Rating:</p>
//                       <span className='flex mt-[3px] gap-1'><CiStar className=' text-red-600' />
//                       <CiStar className=' text-red-600' />
//                       <CiStar className=' text-red-600' />
//                       <CiStar className=' text-red-600' />
//                       <CiStar className=' text-red-600' /></span>
//                     </label>
//                     <label>SoldOut : 5</label>
//                   </div>
//                 </Link>


//               </div>
//             ))
//           }
//         </div>
//       </div>
//     </>
//   )
// }

// export default CategorySkill