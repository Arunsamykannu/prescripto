import React, { useContext } from 'react'
import {assets} from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorsContext } from '../context/DoctorsContext'

const Navbar = () => {
    const {atoken,setAtoken}=useContext(AdminContext)
    const{dtoken,setDtoken}=useContext(DoctorsContext)
    const navigate=useNavigate()


    const logout=()=>{
        navigate('/')
        atoken && setAtoken('')
        atoken && localStorage.removeItem('atoken')
        dtoken && setDtoken('')
        dtoken && localStorage.removeItem('dtoken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b  bg-white'>
        <div className='flex items-center gap-2 text-xs '>
            <img className='w-36 cursor-pointer sm:w-40 ' src={assets.admin_logo} alt=''/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? "Admin":"Doctor"}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm py-2 px-10 rounded-full '> Logout</button>






    </div>
  )
}

export default Navbar