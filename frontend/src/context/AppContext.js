import { createContext, useEffect } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'

import { doctors } from "../assets/assets_frontend/assets";
import { useState } from "react";

const AppContext=createContext()



const AppContextProvider=(props)=>{



    const [doctors,setDoctors]=useState([])
    const [navStatus,setNavStatus]=useState("");
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
    const [userData,setUserData]=useState('')

    const backendUrl=process.env.REACT_APP_BACKEND_URL;


    const getDoctorsData=async()=>{
        try{
            const {data}=await axios.get(`${backendUrl}/api/doctor/list`)
           
            if(data.success){
                setDoctors(data.doctors)

            }else{
                toast.error(data.message)
            }

        }catch(err){
            toast.error(err.message)
        }
    }



    const loadProfileData=async()=>{
        try{
            const {data}=await axios.get(`${backendUrl}/api/user/get-profile`,{headers:{token}})
           
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }

        }catch(err){

        }
    }


useEffect(()=>{
    getDoctorsData()
},[])
useEffect(()=>{
    if(token){
    loadProfileData()
    }else{
        setUserData('')
    }
},[token])








    const value={
        doctors,navStatus,setNavStatus,token,setToken,backendUrl,loadProfileData,userData,setUserData,getDoctorsData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export  {AppContextProvider,AppContext};