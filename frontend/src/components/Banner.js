import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate()
  return (
    <div className='bg-primary my-20 flex px-6 rounded-lg sm:px-10 md:px-10 lg:px-12  md:mx-10'>
        <div className='flex-1  sm:py-10 lg:pl-5 md:py-16 lg:py-20 '>
        <div className='text-white font-semibold lg:text-4xl md:text-xl'>
            <h1 >Book Appointment </h1>
            <h1 className='mt-2'>with 100+ Trusted Doctors</h1>
        </div>
                <button onClick={()=>{navigate('/Login');
                    window.scrollTo(0,0)
                }} className='bg-white text-sm md:text-base text-gray-600 py-3 px-8 mt-6 hover:translate-y-[-10px] transition-all duration-500 rounded-full '> create Account</button>
         
        </div>




        <div className='md:w-1/2 lg:w-[370px] hidden md:block relative '>
            <img className='w-full absolute right-0 bottom-0 max-w-md' src={assets.appointment_img} alt='' />
        </div>




    </div>
  )
}

export default Banner