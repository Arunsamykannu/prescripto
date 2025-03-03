import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RecomendDoctors = ({speciality,docid}) => {
    const {doctors}=useContext(AppContext)
    const [relDoctors,setRelDoctors]=useState([])
    const navigate=useNavigate()


    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctordata=doctors.filter((val)=>{return((val.speciality===speciality) && (val._id !== docid))})
            setRelDoctors(doctordata)
            console.log(relDoctors);
            
        }

    },[doctors,speciality,docid])


  return (
    <div className='mt-16  '>
         <div className=' flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 mb-2'>
        <h1 className='text-3xl  font-medium '>Top Doctors to Book</h1>
        <p className='text-sm  py-4'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto mt-4 gap-y-6 gap-4 px-3 sm:px-0'>
            {
                relDoctors.slice(0,5).map((val,index)=>{
                    return(
                        <div key={val._id} onClick={()=>{navigate(`/appointment/${val._id}`);window.scrollTo(0,0)}} className='flex flex-col items-start justify-center rounded-xl border-blue-400 cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                            <img className='bg-blue-50' src={val.image} alt=''/>
                           <div className='flex items-center gap-2 text-center text-sm text-green-500 py-3'>
                            <p className='w-2 h-2 rounded-full bg-green-500 '></p><p>Available</p>
                           </div> 
                            <h1 className='text-sm font-semibold'>{val.name}</h1>
                            <h1 className='text-sm font-light'>{val.speciality}</h1>
                        </div>

                    )
                })

            }
        </div>
        </div>
        
        
        
    </div>
  )
}

export default RecomendDoctors