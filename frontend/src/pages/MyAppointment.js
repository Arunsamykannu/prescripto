import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Footers from '../components/Footers'
import axios from'axios'
import {toast } from 'react-toastify'

const MyAppointment = () => {
   const {doctors,token,backendUrl,getDoctorsData}=useContext(AppContext)
   const [appointments,setAppointments]=useState([])
   const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const cancelAppointment=async(appointmentId)=>{
    try{
      console.log(appointmentId)


      const {data}=await axios.post(`${backendUrl}/api/user/cancel-appointment`,{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointment()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
     
    } catch(err){
      toast.error(err.message)
        
    }

  }

   const slotDateFormat=(slotDate)=>{

    const date_Array=slotDate.split('_');

    return date_Array[0]+"  "+month[Number(date_Array[1]-1)]+" " +date_Array[2]

   }

  const getUserAppointment=async()=>{
    
    try{
     
      const {data}=await axios.get(`${backendUrl}/api/user/appointments`,{headers:{token}})
      if(data.success){
        setAppointments(data.appointment.reverse()) 
        console.log(data.appointment)
      }

    }catch(err){
      toast.error(err.message)

    }






}

useEffect(()=>{
  if(token){
  getUserAppointment()
  }
},[token])



  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700  border-b '>My Appointment</p>
      <div>
        {appointments.map((val,index)=>{
          return(<div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={val.docData.image} alt=''/>
            </div>
            <div className='flex-1'>
              <p className='text-neutral-800 font-semibold '>{val.docData.name}</p>
              <p>{val.speciality}</p>
              <p className='mt-1 font-medium text-zinc-700'>Address :</p>
              <p className='text-xs'>{val.docData.address.line1}</p>
              <p className='text-xs'>{val.docData.address.line2}</p>
              <p className='mt-1 text-xs'><span className='text-sm text-neutral-700 font-medium '>Date & Time</span>{slotDateFormat(val.slotDate)} | {val.slotTime} </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
             {!val.cancelled && val.payment && !val.isCompleted &&<button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online </button>}
              {!val.cancelled && !val.payment  && !val.isCompleted && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300' onClick={()=>cancelAppointment(val._id)}>Cancel Appointment </button>}
              {val.cancelled && !val.isCompleted &&<button className='sm:min-w-48 py-2 border border-red-500 text-red-500 rounded'>Appointment Cancelled</button>}
              {val.isCompleted&&<button className='min-w-48 border border-gray-500 py-2 rounded text-green-500' >Completed </button>}
            </div>
          </div>)
        })}
      </div>




        <Footers/>

    </div>
  )
}

export default MyAppointment