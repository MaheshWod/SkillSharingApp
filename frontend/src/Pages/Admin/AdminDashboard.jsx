import React from 'react'
import NavFooter from '../../Components/NavFooter'
import AdminMenu from '../../Components/AdminMenu'
import { useAuth } from '../../Context/auth'
const AdminDashboard = () => {

  const [auth] = useAuth()
  return (
<NavFooter>
  <div className='grid grid-cols-[15%_85%] my-4  mx-4 shadow-md border gap-4'>
      <div>
        <AdminMenu/>
      </div>
    <div className='flex flex-col '>
      <h1 className='text-xl font-semibold capitalize'>Name: {auth?.user?.name}</h1>
      <h1>Email: {auth?.user?.email}</h1>
      <h1>PhoneNumber: {auth?.user?.phone}</h1>
    </div>
  </div>
</NavFooter>  )
}

export default AdminDashboard

