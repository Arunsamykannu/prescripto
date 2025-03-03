import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'


const Doctors = () => {
  const {speciality}=useParams()
  const [filterItems,setFilterItems]=useState([])
  const navigate=useNavigate()
  const {doctors}=useContext(AppContext);
  console.log(speciality)

  const applyFilter=()=>{
    if(speciality){
    setFilterItems( doctors.filter(val=> {return val.speciality===speciality}))
      
    }
    else{
      setFilterItems(doctors)
    }
  }


useEffect(()=>{
  applyFilter()
  
},[doctors,speciality])

  return (
    <div>
        <div className='flex '>
          <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>
            <div className='flex flex-col gap-5 text-gray-600 text-sm mt-5 mr-5'>
                <p onClick={()=>{speciality === 'General physician' ?navigate('/doctors'):navigate('/doctors/General physician')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality ==="General physician" ? "bg-indigo-100 text-black ":"bg-white"}`}>General physician</p>
                <p onClick={()=>{speciality === 'Gynecologist' ?navigate('/doctors'):navigate('/doctors/Gynecologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality ==="Gynecologist" ? "bg-indigo-100 text-black ":"bg-white"}`}>Gynecologist</p>
                <p onClick={()=>{speciality === 'Dermatologist' ?navigate('/doctors'):navigate('/doctors/Dermatologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality ==="Dermatologist" ? "bg-indigo-100 text-black ":"bg-white"}`}>Dermatologist</p>
                <p onClick={()=>{speciality === 'Pediatricians' ?navigate('/doctors'):navigate('/doctors/Pediatricians')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality ==="Pediatricians" ? "bg-indigo-100 text-black ":"bg-white"}`}>Pediatricians</p>
                <p onClick={()=>{speciality === 'Neurologist' ?navigate('/doctors'):navigate('/doctors/Neurologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality ==="Neurologist" ? "bg-indigo-100 text-black ":"bg-white"}`}>Neurologist</p>
                <p onClick={()=>{speciality === 'Gastroenterologist' ?navigate('/doctors'):navigate('/doctors/Gastroenterologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray300 rounded transition-all cursor-pointer ${speciality ==="Gastroenterologist" ? "bg-indigo-100 text-black ":"bg-white"}`}>Gastroenterologist</p>
            </div>
          </div>
        <div className='w-full grid grid-cols-auto mt-4 gap-y-6 gap-4 px-3 sm:px-0'>
          {
            filterItems.map((val,index)=>{
              return(
              <div key={val._id} onClick={()=>navigate(`/appointment/${val._id}`)} className='flex flex-col items-start justify-center rounded-xl border-blue-400 cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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

export default Doctors