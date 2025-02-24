import React from 'react'
import NavFooter from '../../Components/NavFooter'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
const Order = () => {
    return (
        <>
            <NavFooter>
                <div className="grid grid-cols-[15%_85%] my-4 mx-16 shadow-md border">
                    <div className='px-2 py-1'>
                        <UserMenu />
                       
                    </div>
                    <div className='px-2 py-1'>
                        <h1>Orders</h1>
                    </div>
                </div>
            </NavFooter>
        </>)
}

export default Order