
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Doctorslist = () => {
  
const {atoken,getAllDoctors,doctors,changeAvailability}=useContext(AdminContext)

useEffect(()=>{
  
  if(atoken){
    getAllDoctors()
   
  }

},[atoken])


  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 gap-y-6 pt-5'>
        {
          doctors.map((val,index)=>{
            return(<div className='border border-indigo-200 rounded-lg max-w-56 overflow-hidden cursor-pointer group' key={index}>
                <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={val.image} alt=''/>
                <div className='p-4'>
                  <p className='text-neutral-800 font-medium text-lg'>{val.name}</p>
                  <p className='text-zinc-600 text-sm '>{val.speciality}</p>
                  <div className='mt-2 flex items-center gap-1 text-sm'>
                    <input onChange={()=>changeAvailability(val._id)} type='checkbox' checked={val.available}/>
                    <p>Available</p>
                  </div>
                </div>
            </div>)
          })
        }
      </div>





    </div>
  )
}

export default Doctorslist