import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import Footers from '../components/Footers'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {


 const {userData,setUserData,loadProfileData,token,backendUrl}=useContext(AppContext)
 const [isEdit,setIsEdit]=useState(false)
 const [image,setImage]=useState(false)


const updateUserProfileData=async()=>{
  try{
    const formdata=new FormData();
    formdata.append('name',userData.name)
    formdata.append('phone',userData.phone)
    formdata.append('address',JSON.stringify(userData.address))
    formdata.append('gender',userData.gender)
    formdata.append('dob',userData.dob)
    image && formdata.append('image',image)

    const {data}=await axios.post(`${backendUrl}/api/user/update-profile`,formdata,{headers:{token}})
    if(data.success){
      toast.success(data.message)
      await loadProfileData()
      setIsEdit(false)
      setImage(false)
    }else{
      toast.error(data.message)
    }
  }catch(err){
    toast.error(err.message)
  }

}




  return userData &&(
    <div>
    <div className='max-w-lg flex flex-col gap-2  text-sm'>
      {isEdit?<label htmlFor='image'>
        <div className='inline-block relative cursor-pointer'>
          <img className='w-36 rounded opacity-75' src={image?URL.createObjectURL(image):userData.image} alt=''/>
          <img className='w-10 absolute bottom-12 right-12' src={image?'':assets.upload_icon} alt=''/>
        </div>
        <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden />
      </label>
      :<img className='w-36 rounded' src={userData.image} alt='' />}

      
      {
        isEdit ? <input className='bg-gray-50 text-2xl font-medium max-w-60 mt-4' value={userData.name} type="text" onChange={(e)=>{setUserData((pre)=>({...pre,name:e.target.value}))}} />:<p className='text-2xl mt-4 font-medium text-neutral-800'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium '>Email :</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone :</p>
          {
            isEdit?<input className='bg-gray-100 max-w-52 ' type="text" value={userData.phone} onChange={(e)=>{setUserData((pre)=>({...pre,phone:e.target.value}))}}/>:<p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address :</p>
          {isEdit?<p>
            <input type="text" className='bg-gray-50 ' value={userData.address.line1} onChange={(e)=>{setUserData((pre)=>({...pre,address:{...pre.address,line1:e.target.value}}))}} />
            <br/>
            <input type="text" className='bg-gray-50 ' value={userData.address.line2} onChange={(e)=>{setUserData((pre)=>({...pre,address:{...pre.address,line2:e.target.value}}))}} />
          </p>:<p className='text-gray-500'>{userData.address.line1}<br/>{userData.address.line2}</p>}

        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] mt-3 text-neutral-700'>
          <p className='font-medium'>Gender :</p>
          {
            isEdit?<select className='max-w-20 bg-gray-100' onChange={(e)=>{setUserData((pre)=>({...pre,gender:e.target.value}))}}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            :<p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday :</p>
          {
            isEdit?<input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e)=>{setUserData((pre)=>({...pre,dob:e.target.value}))}}/>:<p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
        
        
        
        </div>


          <div className='mt-10' >
            {isEdit?<button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500' onClick={updateUserProfileData}>Save Information</button >:<button className='border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all duration-500'  onClick={()=>setIsEdit(true)}>Edit</button>}
          </div>


          
    </div>
    <Footers />
    </div>
  )
}

export default MyProfile