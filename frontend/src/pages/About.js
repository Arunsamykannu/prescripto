import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
import Footers from '../components/Footers'
const About = () => {
  
  return (
    <div className='teaxt-gray-700 mt-10'>
      <p className='flex gap-4 justify-center text-lg'><span className='text-gray-400'>ABOUT</span> <span className=''>US</span></p>
      <div className='flex flex-col md:flex-row gap-12 mt-6'>

        <div className=''>
          <img className=' w-full md:max-w-[360px]' src={assets.about_image} alt='' />

        </div>


        <div className='flex flex-col md:w-2/4 gap-6 text-sm justify-center '>
          <p className='mt-2'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          
          <p className=''>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>   
          <p className='font-semibold '>Our Vision</p> 
          <p className=''>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>

        </div>





      </div>
      <div className='text-lg my-10'>
        <p>WHY CHOOSE US</p>
      </div>
      <div className='flex flex-col md:flex-row  mb-20'>
        <div className='flex flex-col py-8 px-10 md:px-16 md:py-16 border gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <p className='font-semibold'>EFFICIENCY: </p>
          <p> Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='flex flex-col py-8 px-10 md:px-16 md:py-16 border gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <p className='font-semibold'>CONVENIENCE: </p>
          <p> Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='flex flex-col py-8 px-10 md:px-16 md:py-16 border gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <p className='font-semibold'>PERSONALIZATION:</p>
           <p> Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
      <Footers />



    </div>
  )
}

export default About