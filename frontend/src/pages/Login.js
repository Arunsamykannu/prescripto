import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Login = () => {


  const {token,setToken,backendUrl}=useContext(AppContext);
const [state,setState]=useState('Sign up')
const [email,setEmail]=useState('')
const[password,setPassword]=useState('')
const [name,setName]=useState('')
const navigate=useNavigate();


const handleSubmit=async(event)=>{
  event.preventDefault();
  
  try{
    if(state==='Sign up'){
      const {data}=await axios.post(`${backendUrl}/api/user/register`,{name,email,password})
      if(data.success){
        localStorage.setItem('token',data.token);
        setToken(data.token)
      } 
      else{
        toast.error(data.message)
      }
    }else{
      const {data}=await axios.post(`${backendUrl}/api/user/login`,{email,password})
      if(data.success){
        localStorage.setItem('token',data.token);
        setToken(data.token)
      } 
      else{
        toast.error(data.message)
      }

    }

  }catch(err){
    toast.error(err.message)

  }



}
useEffect(()=>{
  if(token){
    navigate('/')
  }
},[token])


  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center  '> 
    <div className='flex flex-col gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 ttext-sm shadow-lg'>
      <p className='text-2xl font-semibold'>{state==="Sign up" ? "Create Account":"Login"}</p>
      <p>please {state==="Sign up" ? "Sign up":"Login"} to book appointment</p>
      {state==="Sign up"? <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setName(e.target.value) } value={name} required></input>
      </div>:""}
     
      <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e)=>setEmail(e.target.value) } value={email} required></input>
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e)=>setPassword(e.target.value) } value={password} required></input>
      </div>
      <button type="submit" className='bg-primary py-2 text-white w-full rounded'>{state==="Sign up" ? "Create account":"Login"}</button>
      {
        state==="Sign up"?<p>Already have an account?<span className='text-primary underline cursor-pointer' onClick={()=>setState("Login")}> Login here</span></p> :<p>Create an new account? <span className='text-primary underline cursor-pointer' onClick={()=>setState("Sign up")}>Click here</span> </p>
      }
      
    </div>










    </form>








    
  )
}

export default Login