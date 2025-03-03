import React, { useContext,useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets_admin/assets'
import { DoctorsContext } from '../context/DoctorsContext'

const Sidebar = () => {

    const {atoken}=useContext(AdminContext)
    const {dtoken}=useContext(DoctorsContext)
    const [navStatus,setNavStatus]=useState('')
  return (
    <div className='min-h-screen bg-white b0rder-r'>
        {
            atoken?<ul className='text-[#515151] mt-5'>
                <Link   to='/admin-dashboard'>
                   <li onClick={(e)=>setNavStatus(e.target.innerText)} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${navStatus === "Dashboard" ?'bg-[#F2F3FF] border-r-4 border-primary' :''} `}>
                       <img src={assets.home_icon} alt="" />
                       <p>Dashboard</p>
                 </li>
                    
                   
                </Link>
                <Link to='/all-appointments'>
                    <li onClick={(e)=>setNavStatus(e.target.innerText)} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${navStatus === "Appointments" ?'bg-[#F2F3FF] border-r-4 border-primary' :''} `}>
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                    </li>
                     
                </Link>
                <Link to='/add-doctor'>
                   <li onClick={(e)=>setNavStatus(e.target.innerText)} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${navStatus === "Add Doctor" ?'bg-[#F2F3FF] border-r-4 border-primary' :''} `}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Doctor</p>
                    </li>
                   
                </Link>
                <Link to='/Doctors-list'>
                    <li onClick={(e)=>setNavStatus(e.target.innerText)} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${navStatus === "Doctors List" ?'bg-[#F2F3FF] border-r-4 border-primary' :''} `}>
                     <img src={assets.people_icon} alt="" />
                     <p>Doctors List</p>
                     </li>
                     
                </Link>
            </ul>:""
        }
        {
             dtoken?<ul className='text-[#515151] mt-5'>
             <Link   to='/doctor-dashboard'>
                <li onClick={(e)=>setNavStatus(e.target.innerText)} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${navStatus === "Dashboard" ?'bg-[#F2F3FF] border-r-4 border-primary' :''} `}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
              </li>
                 
                
             </Link>
             <Link to='/doctor-appointment'>
                 <li onClick={(e)=>setNavStatus(e.target.innerText)} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${navStatus === "Appointments" ?'bg-[#F2F3FF] border-r-4 border-primary' :''} `}>
                 <img src={assets.appointment_icon} alt="" />
                 <p className='hidden md:block'>Appointments</p>
                 </li>
                  
             </Link>
           
             <Link to='/Doctor-profile'>
                 <li onClick={(e)=>setNavStatus(e.target.innerText)} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer  ${navStatus === "Profile" ?'bg-[#F2F3FF] border-r-4 border-primary' :''} `}>
                  <img src={assets.people_icon} alt="" />
                  <p className='hidden md:block'>Profile</p>
                  </li>
                  
             </Link>
         </ul>:""
        
        }






    </div>
  )
}

export default Sidebar