import React from 'react'
import { Link } from 'react-router-dom'
const UserMenu = () => {
    return (
        <>
            <div className='flex flex-col'>
                <div className='text-xl font-semibold text-center '>
                    <h1 className='text-slate-700'>Private-User-Menus</h1>
                </div>
                <div className='flex flex-col gap-2 '>
                    <div className=' font-semibold bg-slate-200 hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
                        <Link
                            to="/dashboard/user/order"
                        >
                            Orders
                        </Link>

                    </div>

                    <div className=' font-semibold bg-slate-200 hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
                        <Link to="/dashboard/user/profile">Profile</Link>

                    </div>
                    <div className=' font-semibold bg-slate-200 hover:bg-zinc-400 py-1 px-0 text-center hover:text-white'>
                        <Link to="/dashboard/user">Back To Menu</Link>

                    </div>

                   

                </div>
            </div>
        </>
    )
}

export default UserMenu