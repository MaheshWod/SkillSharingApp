// import React, { useState } from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {

    // const [value,setValue] = useState([])
  return (
    <>
        <form onSubmit = {handleSubmit} className="flex gap-4">
            <div>
                <input className="py-2 px-1 border border-gray-600 rounded" 
                type=' text'
                placeholder='Enter the new category'
                value={value}
                onChange={(e)=>setValue(e.target.value)}/>
            </div>
            <button className='bg-slate-400 py-1 px-2 hover:bg-slate-600 text-white rounded'>
                Submit
            </button>
        </form>
    </>
  )
}

export default CategoryForm