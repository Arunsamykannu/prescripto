


import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import Login from "../pages/Login";






 export const AdminContext=createContext();



const AdminContextProvider=(props)=>{

    const [atoken,setAtoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'');
    const backendURL=process.env.REACT_APP_BACKEND_URL;
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashData]=useState(false)
    

    const getAllDoctors=async()=>{
       
        
        try{
            const {data}=await axios.post(`${backendURL}/api/admin/all-doctors`,{},{headers:{atoken}})
           
            if(data.success){
                setDoctors([...data.doctors])
               
            }
            else{
                toast.error(data.message)
            }
        }catch(err){
            toast.error(err.message)

        }
    }
    const changeAvailability=async(docId)=>{
        try{
            const {data}=await axios.post(`${backendURL}/api/admin/change-availability`,{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
                
            }else{
                toast.error(data.message)
            }

        }catch(err){
            toast.error(err.message)

        }

    }
    const getAllAppointments=async()=>{
        try{

            const {data}=await axios.get(`${backendURL}/api/admin/appointments`,{headers:{atoken}})
            if(data.success){
                setAppointments(data.appointments)
                
            }else{
                toast.error(data.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }


    const cancelAppointment=async(appointmentId)=>{
        try{
            const {data}=await axios.post(`${backendURL}/api/admin/cancel-appointment`,{appointmentId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }

        }catch(err){
            toast.error(err.message)
        }
    }


    const getDashData=async()=>{
        try{
            const {data}=await axios.get(`${backendURL}/api/admin/dashboard`,{headers:{atoken}})
            if(data.success){
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }

        }catch(err){
            toast.error(err.message)
        }
    }



    const value={
        atoken,setAtoken,backendURL,getAllDoctors,doctors,changeAvailability,appointments,setAppointments,getAllAppointments,cancelAppointment,dashData,getDashData
    }


    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider