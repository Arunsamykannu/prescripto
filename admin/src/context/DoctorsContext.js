import { createContext, useState } from "react";
import {toast} from 'react-toastify'

import axios from 'axios'


 export const DoctorsContext=createContext();



const DoctorsContextProvider=(props)=>{

    const backendUrl=process.env.REACT_APP_BACKEND_URL;
    const [dtoken,setDtoken]=useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):'')
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)

    const getAppointments=async()=>{
        try{
            const {data}=await axios.get(`${backendUrl}/api/doctor/appointments`,{headers:{dtoken}})
            if(data.success){
                setAppointments(data.appointment.reverse())
              
                
            }else{
                toast.error(data.message)
            }

        }catch(err){
            toast.error(err.message)

        }
    }

 const completeAppointment=async(appointmentId)=>{
    try{
        const {data}=await axios.post(`${backendUrl}/api/doctor/complete-appointment`,{appointmentId},{headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }

    }catch(err){
        toast.error(err.message)

    }

 }


 const cancelAppointment=async(appointmentId)=>{
    try{
        const {data}=await axios.post(`${backendUrl}/api/doctor/cancel-appointment`,{appointmentId},{headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }

    }catch(err){
        toast.error(err.message)

    }

 }

 const getDashData=async()=>{
    try{
        const {data}=await axios.get(`${backendUrl}/api/doctor/dashboard`,{headers:{dtoken}})
        if(data.success){
            setDashData(data.dashData)
          
        }else{
            toast.error(data.message)
        }

    }catch(err){
        toast.error(err.message)


    }
 }



 const getProfileData=async()=>{
    try{
        const {data}=await axios.get(`${backendUrl}/api/doctor/profile`,{headers:{dtoken}})
        if(data.success){
            setProfileData(data.profiledata)
           
            
        }

    }catch(err){
        toast.error(err.message)
    }
 }



    const value={
        dtoken,setDtoken,backendUrl,appointments,setAppointments,getAppointments,completeAppointment,cancelAppointment,dashData,getDashData,setDashData,profileData,setProfileData,getProfileData

    }

    return(
        <DoctorsContext.Provider value={value}>
            {props.children}
        </DoctorsContext.Provider>
    )
}

export default DoctorsContextProvider