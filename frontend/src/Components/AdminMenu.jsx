import React from 'react'
import { Link } from 'react-router-dom'
const AdminMenu = () => {
    return (
        <>
            <div className='flex flex-col'>
                <div className='text-xl font-semibold text-center '>
                    <h1 className='text-slate-700'>Admin Menus</h1>
                </div>
                <div className='flex flex-col gap-2 '>
                    <div className=' font-semibold bg-slate-200 hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
                        <Link
                            to="/dashboard/admin/product"
                        >
                            CreateProduct
                        </Link>

                    </div>

                    <div className=' font-semibold bg-slate-200 hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
                        <Link to="/dashboard/admin/category">CreateCategory</Link>

                    </div>

                    <div className=' font-semibold bg-slate-200 hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
                        <Link to="/dashboard/admin/user">AdminUsers</Link>

                    </div>
                    <div className=' font-semibold bg-slate-200 hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
                        <Link to="/dashboard/admin/products">ProductsList</Link>

                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminMenu