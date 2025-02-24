// import React from 'react'
// import NavFooter from '../../Components/NavFooter'
// import AdminMenu from '../../Components/AdminMenu'
// const UserDashboard = () => {
//   return (
// <>
// <NavFooter>
// <div className=' px-2'>
//       <div className='grid grid-cols-2'>
//       <div className=''>
//       <h1>Admin Menu</h1>
//         <AdminMenu/>
//       </div>
//       <div>
//         <h1>UserDashboard</h1>
//       </div>
//       </div>
//     </div>

// </NavFooter></>  )
// }

// export default UserDashboar
import React from 'react'
import NavFooter from '../../Components/NavFooter'
import { useAuth } from '../../Context/auth'
import UserMenu from './UserMenu'
const UserDashboard = () => {
  const [auth] = useAuth()
  return (
<>
<NavFooter>
<div className='grid grid-cols-[15%_85%] my-4  mx-4 shadow-md border gap-4'>
      <div>
        <UserMenu/>
      </div>
    <div className='flex flex-col '>
      <h1 className='text-xl font-semibold capitalize'>Name: {auth?.user?.name}</h1>
      <h1>Email: {auth?.user?.email}</h1>
      <h1>PhoneNumber: {auth?.user?.phone}</h1>
    </div>
  </div>
</NavFooter>
</>  )
}

export default UserDashboard