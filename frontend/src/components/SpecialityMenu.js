import React, { useContext } from 'react'
import {specialityData} from '../assets/assets_frontend/assets'
import {Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const SpecialityMenu = () => {
  const {setNavStatus}=useContext(AppContext);
  return (
    <div id="speciality" className='flex flex-col items-center gap-4 py-16 text-gray-800 '>
      <h1 className='text-center text-3xl font-medium'>Find by Speciality</h1>
      <p className='text-center w-1/3 text-sm'>Simply browse through our extensive list of trusted doctors,schedule your appointment hassle-free.</p>
      <div className='flex justify-center items-center gap-4 w-full pt-5 overflow-scroll'>
        {
          specialityData.map((val,index)=>{
            return(<Link onClick={()=>{window.scrollTo(0,0);
              setNavStatus("ALL DOCTORS")
            }} to={`/doctors/${val.speciality}`} key={index}>
            <div className='flex flex-col items-center justify-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
              <img className="w-16 sm:w-24 mb-2" src={val.image} alt='' />
              <p>{val.speciality}</p>
            </div>
            </Link>)
          })
        }
      </div>        
        
        
        
        
    </div>
  )
}

export default SpecialityMenu