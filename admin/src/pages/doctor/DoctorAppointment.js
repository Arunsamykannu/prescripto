import React, { useContext, useEffect } from 'react'
import { DoctorsContext } from '../../context/DoctorsContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointment = () => {

  const {dtoken,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(DoctorsContext)
  const {calculateAge,slotDateFormat}=useContext(AppContext)
  useEffect(()=>{
    if(dtoken){
      getAppointments()
    }
  },[dtoken])



  return  (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b '>
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fee</p>
        <p>Action</p>
        </div>
        {
          appointments.map((val,index)=>{
            return(<div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2 '>
                <img className='w-8 rounded-full' src={val.userData.image} alt=''/>
                <p>{val.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline py-1 border border-primary px-2 rounded-full'>{val.payment?'online' :'cash'}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(val.userData.dob)}</p>
              <p>{slotDateFormat(val.slotDate)} ,{val.slotTime}</p>
              <p>${val.amount}</p>
              {
                val.cancelled?<p className='text-red-400 text-xs font-medium'>cancelled</p>:val.isCompleted?<p className='text-xs font-medium text-green-500'>completed</p>: <div className='flex'>
                <img onClick={()=>cancelAppointment(val._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt=''/>
                <img onClick={()=>completeAppointment(val._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt=''/>
              </div>

              }
             
            </div>)
          })
        }
      </div>






    </div>
  )
}

export default DoctorAppointment