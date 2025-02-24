import React from 'react'
import NavFooter from './NavFooter'

const ContactUs = () => {
  return (
    <NavFooter>
      <div className='my-8 mx-24 bg-slate-50 shadow-md rounded  border'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <img src='/images/contact.jpg ' alt='' className=' rounded-l'/>
          </div>
          <form className='space-y-4 p-4'>
          <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
              <label className='text-slate-500 font-semibold'>First Name</label>
              <input required
              type='text'
              name='fullname'
              placeholder='Enter the full name'
              className='p-2  rounded border border-slate-400'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-slate-500 font-semibold'>Last Name</label>
              <input required
              type='text'
              name='lastname'
              placeholder='Enter the last name'
              className='p-2 rounded border border-slate-400'
              />
            </div>
          </div>
            <div className='flex flex-col gap-1'>
              <label className='text-slate-500 font-semibold'>Email</label>
              <input required
              type='email'
              name='email'
              placeholder='skillsharing123@gmail.com'
              className='p-2 rounded border border-slate-400'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-slate-500 font-semibold'>Message</label>
              <textarea
               required
              type='text'
              name='message'
              
              placeholder='Enter the your message'
              className='p-2 rounded border border-slate-400'
              />
            </div>
            <button className='py-2 px-8 bg-slate-500 hover:bg-zinc-300 text-white hover:text-black font-semibold rounded-md'>Send</button>
          </form>
        </div>
      </div>
    </NavFooter>
  )
}

export default ContactUs