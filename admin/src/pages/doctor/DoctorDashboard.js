import React, { useContext, useEffect } from 'react'
import { DoctorsContext } from '../../context/DoctorsContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'
import { AdminContext } from '../../context/AdminContext'

const DoctorDashboard = () => {

const {dtoken,dashData,setDashData,getDashData}=useContext(DoctorsContext)
const {slotDateFormat}=useContext(AppContext)
const {cancelAppointment,completeAppointment}=useContext(DoctorsContext)

useEffect(()=>{
  if(dtoken){
    getDashData()

  }
},[dtoken])

  return dashData && (
    <div className='m-5'>

        <div className='flex flex-wrap gap-3'>
              <div className='flex items-center gap-2 py-3 px-4 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.earning_icon} alt=''/>
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData.earnings}</p>
                  <p className='text-gray-400'>Earnings</p>
                </div>
              </div>
              <div className='flex  py-3 px-4 items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.appointments_icon} alt=''/>
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                  <p className='text-gray-400'>appointments</p>
                </div>
              </div>
              <div className='flex  py-3 px-4 items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.patients_icon} alt=''/>
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                  <p className='text-gray-400'>Patients</p>
                </div>
              </div>
      
            </div>
             <div className='bg-white '>
                    <div className='flex items-center gap-2.5 py-4 px-4 mt-10 rounded-t border'>
                      <img src={assets.list_icon} alt=''/>
                      <p>Latest Bookings</p>
                    </div>
                    <div className='pt-4 border border-t-0 '>
                      {
                        dashData.latestappointment.map((val,index)=>{
                          return(<div className='flex items-center gap-3 px-6 py-3 hover:bg-gray-300 ' key={index}>
                            <img className='rounded-full w-10' src={val.userData.image} alt="" />
                            <div className='flex-1 text-sm'>
                              <p className='text-gray-800 font-medium'>{val.docData.name}</p>
                              <p className='text-gray-600'>{slotDateFormat(val.slotDate)}</p>
                            </div>
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
           








    </div>
  )
}

export default DoctorDashboard