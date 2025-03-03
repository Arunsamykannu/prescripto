import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import Footers from '../components/Footers'

const Contact = () => {
  return (
    <div>

      <div className='text-lg text-gray-700 font-medium mt-8 text-center'>
        <p>CONTACT <span className='text-gray-500'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row justify-center mt-8 gap-10 '>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt=''/>
        <div className='text-sm flex flex-col gap-5 mt-5 text-gray-500 justify-center items-start'>
          <p className='font-semibold text-gray-700'>OUR OFFICE</p>
          <p>00000 Willms Station <br/>
          Suite 000, Washington, USA</p>
          <p>Tel: (000) 000-0000 <br/>
          Email: greatstackdev@gmail.com</p>
          <p className='font-semibold text-gray-700'>CAREERS AT PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border border-gray-500 py-4 px-6 hover:bg-black hover:text-white transition-all duration-500  '>Explore Jobs</button>
        </div>
       
      </div>



      <Footers />


    </div>
  )
}

export default Contact