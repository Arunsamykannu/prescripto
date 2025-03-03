import React from 'react'
import {assets} from '../assets/assets_frontend/assets'


const Header = () => {
 

  return (
    <div className='flex flex-col  md:flex-row bg-primary flex-wrap rounded-lg px-6 md:px-10 lg:px-20'>
        
        <div className='flex flex-col justify-center items-start gap-4 py-10 m-auto md:py-[10vw] mb-[-30px] md:w-1/2'>
            <p className='font-bold text-4xl text-white '>Book Appointment   <br/> with trusted Doctors</p>
            <div className='flex flex-col md:flex-row items-center font-light text-white gap-3 text-sm'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p className='text-[10px]'>Simply browse through our extensive list of trusted doctors,<br className='sm:block hidden' /> schedule your appointment hassle-free.</p>
            </div>
            <a href="#speciality" className='flex items-center justify-center bg-white gap-3 px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105  transition-all duration-300'>
                  Book Appointment
                 <img className='w-3' src={assets.arrow_icon} alt=""/>
            </a>
        </div>
      

        {/* right section */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0  rounded-lg' src={assets.header_img} alt='' />
        </div>
        
        
        
    </div>
  )
}

export default Header