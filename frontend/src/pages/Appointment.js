import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets_frontend/assets'
import RecomendDoctors from '../components/RecomendDoctors';
import Footers from '../components/Footers'
import {toast} from 'react-toastify'
import axios from 'axios'


const Appointment = () => {
  const {docId}=useParams();
  const navigate=useNavigate()
  const {doctors,backendUrl,token ,getDoctorsData}=useContext(AppContext)
const [doctorsInfo,setDoctorsInfo]=useState({})
const [docSlots,setDocSlots]=useState([]);
const [slotIndex,setSlotIndex]=useState(0)
const [slotTime,setSlotTime]=useState('')
const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
 

const fetchDoctor=async()=>{
    const docinfo=doctors.find((val)=>{return val._id===docId})
    setDoctorsInfo(docinfo)
  
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);
  
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 
  
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlot = [];
  
      while (currentDate.getTime() < endTime.getTime()) { 
        let formatTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; 
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formatTime;
  
        const isAvailable = doctorsInfo?.slots_booked?.[slotDate]?.includes(slotTime) ? false : true; 
  
        if (isAvailable) {
          timeSlot.push({
            datetime: new Date(currentDate),
            time: formatTime,
          });
        }
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      if (timeSlot.length > 0) {
        setDocSlots(prev => [...prev, timeSlot]); 
      }
    }
  };
  
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book Appointment");
      return navigate("/login");
    }
    try {
      if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
        toast.error("No available slot selected"); 
        return;
      }
  
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1; 
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
  
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };



useEffect(()=>{
  fetchDoctor()
},[doctors,docId])

useEffect(()=>{
  getAvailableSlots()
},[doctorsInfo])
useEffect(()=>{
 ;
  
},[docSlots])

  return (
    <div >
      <div div className='flex flex-col sm:flex-row gap-4'>
      <div>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={doctorsInfo.image} alt='' />
      </div>

      <div className='flex-1 '>
      <div className='flex flex-1 flex-col  py-8  border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        
        <h1 className='flex gap-4 items-center font-semibold text-2xl tracking-wider text-gray-700'>{doctorsInfo.name}<img src={assets.verified_icon} alt='' /></h1>
        <div className='flex items-center gap-4 text-gray-500 text-sm mt-1'>
          <p>{doctorsInfo.degree} - {doctorsInfo.speciality} </p>
          <button className='rounded-full  px-2 py-0.5 bg-white  border border-gray-400 text-xs'>{doctorsInfo.experience}</button>
        </div>
        <div className='mt-3 text-sm text-gray-600 mb-3 '>
          <p className='font-semibold flex items-center gap-2'>About <img className='text-gray-600 w-3' src={assets.info_icon} alt='' /> </p>
          <p>{doctorsInfo.about}</p>
        </div>  
        <p className='text-gray-700 font-medium mt-4'>Appointment fee - <span className='text-black'>${doctorsInfo.fees}</span></p>
      </div>
      </div>
      
      
     
      </div>
      
      
      <div className='sm:ml-72 sm:pl-4  mt-4'>
        <p>Booking Slots</p>
        <div className='flex gap-4 overflow-x-scroll'>
          {
            docSlots.length && docSlots.map((item,index)=>{
              return(<div className={`border border-gray-300 rounded-full py-6 min-w-16 flex items-center flex-col px-2 cursor-pointer  mt-4 ${
                slotIndex === index ? 'text-white bg-primary' :''
              }`} key={index} onClick={()=>setSlotIndex(index)}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()] }</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
                
                
                 </div>)
            })
          }
        </div>
        <div className='flex gap-4 overflow-x-scroll mt-4 '>
          {
            docSlots.length && docSlots[slotIndex].map((item,index)=>{
              return(<div onClick={()=>setSlotTime(item.time)} className={`border border-gray-300 flex-shrink-0 text-sm font-light rounded-full py-2  flex items-center flex-col px-5 cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' :'' } `} key={index}>
                <p >{item.time}</p>

              </div>)
            })
          }
        </div>
        <button onClick={bookAppointment} className='py-3 px-6 rounded-full bg-primary text-white text-sm  mt-4 '>Book an Appointment</button>

      </div>
      <RecomendDoctors speciality={doctorsInfo.speciality}  docid={docId}/>
      <Footers />
   
    </div>
  )
}

export default Appointment