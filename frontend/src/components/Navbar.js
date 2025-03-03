import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Navbar = () => {
 
  const {navStatus,setNavStatus}=useContext(AppContext)
  const navigate=useNavigate();
  const [showMenu,setShowMenu]=useState(false);
  const {token,setToken,userData}=useContext(AppContext)



const logout=()=>{
  setToken('')
  localStorage.removeItem('token')
}

  return (
    <div>
      <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-b-grey-400'>
        <div  className=''>
           <img src={assets.logo} alt="" className='w-44 cursor-pointer' />
        </div>
        <div className='hidden md:block'>
             <ul className='flex items-start gap-5 font-medium '>
                <Link to="/"> <li className={navStatus==="HOME"?'relative after:contents-[""] after:w-[100%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all':'relative after:contents-[""] after:w-[0%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all'} onClick={(e)=>{
                  setNavStatus(e.target.innerText)
                 
                  }}>HOME</li></Link> 
                  <li  className={navStatus==="ALL DOCTORS"?'relative after:contents-[""] after:w-[100%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all':'relative after:contents-[""] after:w-[0%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all'} onClick={(e)=>{
                  setNavStatus(e.target.innerText)
                 
                  }}><Link to="/doctors">ALL DOCTORS</Link></li>
                  <li  className={navStatus==="ABOUT"?'relative after:contents-[""] after:w-[100%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all':'relative after:contents-[""] after:w-[0%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all'} onClick={(e)=>{
                  setNavStatus(e.target.innerText)
                 
                  }}><Link to="/About">ABOUT</Link></li>
                  <li  className={navStatus==="CONTACT"?'relative after:contents-[""] after:w-[100%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all':'relative after:contents-[""] after:w-[0%] hover:after:w-full focus:after:w-full active:after:w-full after:h-0.5 after:bg-primary after:absolute after:left-0 after:bottom-[-5px] after:duration-300   after:transition-all'} onClick={(e)=>{
                  setNavStatus(e.target.innerText)
                 
                  }}><Link to="/Contact">CONTACT</Link></li>
             </ul>
        </div>
        <div className=' flex justify-end items-center '>
          {
            token && userData?
            <div className='flex items-center gap-2 cursor-pointer group relative hidden md:block'>
              <img src={userData.image} alt="" className='w-8 rounded-full'/>
              <img src={assets.dropdown_icon} alt="" className='w-2.5' />
              <div className='absolute right-0 top-0 pt-14 text-base hidden group-hover:block z-20  text-gray-600
              '>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col py-4 px-8 gap-4 '>
                  <p className='hover:text-black cursor-pointer ' onClick={()=>{navigate("/my-profile")}}>my profile</p>
                  <p className='hover:text-black cursor-pointer 'onClick={()=>{navigate("/my-appointment")}}>my appointment</p>
                  <p  className='hover:text-black cursor-pointer 'onClick={logout}>logout</p>
                </div>
              </div>

            </div>
           :<button onClick={()=>{navigate('/Login')}} className='bg-primary rounded-full text-white px-8 py-3 text-center hidden md:block'>Create account </button>
          }
          <img className='w-6 md:hidden cursor-pointer' onClick={()=>setShowMenu(true)} src={assets.menu_icon} alt=''/>
          <div className={`${showMenu ? 'fixed w-full' :'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
            <div className='flex items-center justify-between px-5 py-6'>
              <img className='w-36' src={assets.logo} alt=''/>
              <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=''/>
            </div>
            <ul className='flex flex-col items-center gap-4 px-5 text-lg font-medium mt-4 '>
             <Link className='px-4 py-2 rounded inline-block hover:bg-primary hover:text-white ' onClick={()=>setShowMenu(false)} to='/'><li>HOME</li></Link>
             <Link className='px-4 py-2 rounded inline-block hover:bg-primary hover:text-white ' onClick={()=>setShowMenu(false)} to='/doctors'><li>ALL DOCTORS</li></Link>
             <Link className='px-4 py-2 rounded inline-block hover:bg-primary hover:text-white ' onClick={()=>setShowMenu(false)} to='/about' ><li>ABOUT</li></Link>
             <Link className='px-4 py-2 rounded inline-block hover:bg-primary hover:text-white ' onClick={()=>setShowMenu(false)} to='/contact'><li>CONTACT</li></Link>
             
            </ul>
          </div>

        </div>
     
     
      
      </div>
        
    </div>
  )
}

export default Navbar