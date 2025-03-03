import React, { useContext, useState } from 'react'
import axios from 'axios'
import {assets} from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import {toast } from 'react-toastify'
import { DoctorsContext } from '../context/DoctorsContext'


const Login = () => {

    
const [state,setState]=useState("Admin")
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const {setAtoken,backendURL}=useContext(AdminContext)
const {setDtoken}=useContext(DoctorsContext)


const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try{
       
        if(state === 'Admin'){

            const {data}= await axios.post(backendURL+'/api/admin/login',{email,password})
            if(data.success){
                localStorage.setItem("atoken",data.token)
                setAtoken(data.token)
            }
            else{
                toast.error(data.message)
            }


        }
        else{
            const {data}=await axios.post(`${backendURL}/api/doctor/login`,{email,password})
            if(data.success){
                localStorage.setItem("dtoken",data.token)
                setDtoken(data.token)
              
                
            }
            else{
                toast.error(data.message)
            }
        }

    }catch(err){

    }
}

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>

        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl m-auto font-semibold '><span className='text-primary'>{state}</span>  Login</p>
            <div className='w-full'>
                <p>Email :</p>
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password :</p>
                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
            </div>
            <button className='mt-3 py-2 bg-primary text-white w-full rounded-md text-base '> Login </button>
            {
                state === "Admin" ? <p>Doctor login ? <span className='text-primary underline cursor-pointer' onClick={()=>setState("Doctor")}>Click here</span></p>:<p>Admin login ? <span className='text-primary underline cursor-pointer' onClick={()=>setState("Admin")}>Click here</span></p>
            }
        </div>




    </form>
  )
}

export default Login