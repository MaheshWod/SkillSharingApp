import React from 'react'
import NavFooter from '../../Components/NavFooter'
import AdminMenu from '../../Components/AdminMenu'
import { Link } from 'react-router-dom'
const Users = () => {
  return (
    <>
      <NavFooter>

        <div className="grid grid-cols-[15%_85%] my-4 mx-4 shadow-md border">
          <div>
            <AdminMenu />
            <div className=' font-semibold border hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
              <Link to="/dashboard/admin">Back To Admin</Link>

            </div>
          </div>
          <div>
            <h1>UserAdmin</h1>
          </div>
        </div>

      </NavFooter>
    </>)
}

export default Users