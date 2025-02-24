import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
// import CategorySkill from './Pages/CategorySkill'
import ContactUs from './Components/ContactUs'
import About from './Components/About'
import ForgotPassword from './Pages/ForgotPassword'
import PrivateRoute from './Components/PrivateRoute'
import UserDashboard from './Pages/User/UserDashboard'
import AdminRoute from './Components/AdminRoute'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateProduct from './Pages/Admin/CreateProduct'
import CreateCategory from './Pages/Admin/CreateCategory'
import Users from './Pages/Admin/Users'
import Profile from './Pages/User/Profile'
import Order from './Pages/User/Order'
import Products from './Pages/Admin/Products'
import UpdateProduct from './Pages/Admin/UpdateProduct'
import Search from './Pages/User/Search'
import ProductDetail from './Pages/User/ProductDetail'
import CategoryLinks from './Pages/User/CategoryLinks'
import CategoryList from './Pages/User/CategoryList'
import CartPage from './Pages/CartPage'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path="/dashboard" element={<PrivateRoute />}>

            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/order" element={<Order />} />

          </Route>
          {/* // Example in App.js or your routing configuration */}
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/category" element={<CategoryLinks />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:slug" element={<CategoryList />} />


          <Route path="/search" element={<Search />} />
          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/product' element={<CreateProduct />} />
            <Route path='admin/category' element={<CreateCategory />} />
            <Route path='admin/users' element={<Users />} />
            <Route path='admin/products' element={<Products />} />
            <Route path='admin/products/:slug' element={<UpdateProduct />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          {/* <Route path='/categoryskill' element={<CategorySkill />} /> */}
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/search' element={<Search />} /> */}
        </Routes>
      </BrowserRouter>
    </>)
}

export default App


