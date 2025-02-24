import { Link } from 'react-router-dom'
import { useCart } from '../Context/cart.js';
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/auth.js';
import { useState, useEffect } from 'react';
import SearchInput from './Form/SearchInput.jsx';
import Category from '../Pages/User/CategoryLinks.jsx';
import { Badge } from 'antd'


const NavFooter = ({ children }) => {

  // for cart
  const [cart] = useCart()

  const [account, setAccount] = useState(false)
  const [auth, setAuth] = useAuth()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const links = [
    {
      name: "About",
      to: '/about'
    },
    {
      name: "ContactUs",
      to: '/contact'
    }
  ];

  useEffect(() => {
    if (auth?.user && location.pathname === '/login') {
      navigate(`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`);
    }

    // If the user is logged in and visits the login page, redirect them to the home page
    if (auth?.user && location.pathname === '/login') {
      // Redirect to home page

    }
    else {
    }

  }, [auth, location, navigate]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem('auth')
    navigate('/')
  }
  console.log(localStorage.getItem("auth"));


  // category

  return (
    <>
      <div className='bg-zinc-400  w-full shadow-md fixed top-0 z-50'>
        <div className='flex justify-between items-center mx-12 py-2'>
          <h1 className='font-bold text-xl'><Link to={'/'}>M-W</Link></h1>
          {/* Search button */}
          <div className='flex justify-center items-start'>
            <div className="my-4 relative">
              <SearchInput
                type="text"
                placeholder="Search Skills"
                className="py-2 px-3 w-96 bg-white text-black outline-none rounded-full"
              />
           
            </div>

            {/* yasma category  */}

            <div className="relative mt-4 mx-3 ">
              <button
                onClick={() => setCategoryOpen((prev) => !prev)}
                className="text-black font-bold hover:bg-zinc-300  px-4 py-2 rounded-full"
              >
                Category
              </button>

              {categoryOpen && (
                <div className="absolute border w-52 z-50 bg-slate-100 rounded shadow-md top-[60px]  space-y-1">
                  <Category />
                </div>
              )}
            </div>



            <div className='flex'>
              {links.map((item, index) => (
                <div key={index} className="p-6">
                  {/* Apply dynamic classes for bgColor and hoverColor */}
                  <Link
                    to={item.to}
                    className="text-black font-bold hover:bg-zinc-300  px-4 py-2 rounded-full"
                  >
                    {item.name}
                  </Link>
                </div>

              ))}
              <div className="flex justify-center items-center gap-12 font-bold text-black ">
                {/* SignUp link */}
                {
                  !auth.user &&
                  <>
                    <Link to={'/login'}>
                      <label className='mx-4 py-2 px-4 rounded-full hover:bg-zinc-300 hover:text-black'>
                        Login
                      </label>
                    </Link>
                    <Link to={'/signup'}>
                      <label className='bg-slate-500 text-white py-2 px-4 rounded-full hover:bg-zinc-300 hover:text-black'>
                        SignUp
                      </label>
                    </Link>
                  </>
                }
                {/* yasma logout and profile dekhauxa */}
                {
                  auth.user &&
                  <>
                    <button
                      onClick={() => setAccount((prev) => !prev)}
                      className="py-2 px-4 bg-slate-600 rounded-full hover:bg-gray-300 text-white hover:text-black font-bold capitalize"
                    >
                      {auth.user.name.slice(0, 1)}
                    </button>

                    {/* Account Box or dropdown box */}
                    {account && (
                      <div className="absolute bg-slate-100 rounded right-1  p-4  shadow-md top-20 space-y-1">
                        <h2 className='font-semibold text-center capitalize'>{auth.user.name}</h2>
                        <p className='font-semibold text-zinc-600'>{auth.user.email}</p>
                        {/* <p>{auth.user?.token ? "Token is available" : "No token found"}</p> */}

                        <div className='space-y-2'>
                          <div className='w-full  bg-zinc-500 hover:bg-zinc-300 text-white hover:text-black rounded-full text-center py-1 '>
                            <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                              }`}>
                              <label>Dashboard</label>
                            </Link>

                          </div>
                        
                          <button
                            onClick={handleLogout}
                            className="w-full  py-1 px-2 bg-slate-700 text-white rounded-full hover:bg-red-600"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                }
              

                <div>


                  <Badge count={cart?.length} showZero> <Link to='/cart'>
                    Cart
                  </Link>
                  </Badge>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="pt-[88px]"> {/* Adjust padding to match navbar height */}
        {children}
      </div>





      {/* footer section */}
      <footer className="bg-slate-900 text-gray-400 py-10">
        <div className=" mx-12 grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
              itaque unde facere repellendus, odio et iste voluptatum aspernatur
              ratione mollitia tempora eligendi maxime est, blanditiis accusamus.
            </p>
            <div className="space-y-2">
              <p className='flex gap-2 items-center'>
                <FaPhone /> <span>+977-9868421078</span>
              </p>
              <p className='flex gap-2 items-center'>
                <MdOutlineMail /> <span>hellodigitalpathshala14@gmail.com</span>
              </p>
            </div>
            <div className="mt-4 flex relative justify-center items-center">
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="py-2 px-3 w-full bg-gray-800 text-white outline-none rounded-full"
              />
              <button className="px-5 py-[6px] absolute bg-orange-500 hover:bg-orange-700 text-white rounded-full right-[3px]">
                Send
              </button>
            </div>

          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Latest Skills</h3>
            <ul className="space-y-4 flex flex-col justify-center items-center">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex  justify-center space-x-2">
                  <span className="text-blue-400 mt-1"><MdOutlineDoubleArrow /></span>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere unde omnis veniam porro excepturi.
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Tranding Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className='w-[160px] h-[120px] bg-slate-200 rounded-xl shadow-md overflow-hidden'><img src='/x.jpg' alt='' className='rounded-xl object-cover ' /></div>
              <div className='w-[160px] h-[120px] bg-slate-200 rounded-xl shadow-md overflow-hidden'><img src='/y.jpg' alt='' className='rounded-xl object-cover ' /></div>
              <div className='w-[160px] h-[120px] bg-slate-200 rounded-xl shadow-md overflow-hidden'><img src='/z.jpg' alt='' className='rounded-xl object-cover ' /></div>
              <div className='w-[160px] h-[120px] bg-slate-200 rounded-xl shadow-md overflow-hidden'><img src='/x.jpg' alt='' className='rounded-xl object-cover ' /></div>


            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 mx-12 pt-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 text-sm">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <Link to="/about" className="hover:text-white">
                About
              </Link>

              <Link to="/services" className="hover:text-white">
                Services
              </Link>

              <Link to="/contact" className="hover:text-white">
                Contacts
              </Link>
            </div>
            <p className="text-sm mt-4 md:mt-0">© 2025 Mahesh@wod</p>
          </div>
        </div>
      </footer>



    </>
  );
}

export default NavFooter;
