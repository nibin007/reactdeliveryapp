import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from "../img/logo.png"
import Avatar from '../img/avatar.png'
import {BsBasket3Fill} from 'react-icons/bs'
import {MdAdd,MdLogout} from 'react-icons/md'
import {Link} from 'react-router-dom'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


function Header() {
    const firebaseAuth=getAuth(app);
    const provider=new GoogleAuthProvider();
    const[{user},dispach]=useStateValue()

   const[isMenu,setIsMenu]=useState(false)


    const login=async()=>{

       if(!user){
        const {user :{refreshToken,providerData}}=await signInWithPopup(firebaseAuth,provider)
        dispach({
         type:actionType.SET_USER,
         user:providerData[0]
        })
        localStorage.setItem('user',JSON.stringify(providerData[0]))
       }
       else{
        setIsMenu(!isMenu)
       }

   
    }
const logout=()=>{
  setIsMenu(false)
  localStorage.clear()
  dispach({
    type:actionType.SET_USER,
    user:null
  })
}

  return (
    <header className='fixed  z-50 w-screen  p-3 px-4 md:p-6 md:px-16'>
    {/* {desktop} */}
    <div className='hidden md:flex w-full h-full p-4 items-center justify-between'>
      <div className='flex  items-center gap-2'>
        <Link className='flex items-center' to={'/'}>
      <img src={Logo} alt="logo" className='w-8 object-cover ' />
      <p className='text-headingColor text-xl font-bold  '>City</p>
      </Link>
      </div>
      <div className='flex items-center gap-8'>
      <ul className='flex items-center gap-8 ' >
        <li className='text-base text-textcolor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' >Home</li>
        <li className='text-base text-textcolor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
        <li className='text-base text-textcolor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About us</li>
        <li className='text-base text-textcolor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
      </ul>
        <div className='relative flex items-center justify-center'>
          <BsBasket3Fill className='text-textColor text-2xl cursor-pointer w-4'/>
          <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>

          </div>
 
        </div>

        <div className='relative'>
        <motion.img  onClick={login} whileTap={{scale:0.6}} src={user?user.photoURL:Avatar} alt="profile" className='w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full' />
      {isMenu &&(
          <motion.div initial={{opacity:0,scale:0.6 }}  animate={{opacity:1,scale:1 }} exit={{opacity:0,scale:0.6 }} className='w-40 bg-gray-100 shadow-xl rounded-lg  flex flex-col absolute top-12 right-0 '>
         
          {
           user && user.email==='nibin98prasad@gmail.com' && (
           <Link to={"/createItem"}>
             <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase' >NewItem <MdAdd/> </p>
             </Link>
           )
          }
           <p className='px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase' onClick={logout} > Logout <MdLogout/> </p>
 
           
         </motion.div>
      )}
        
        </div>
      </div>
    </div>
  {/* {mobile} */}
  

  <div className='flex items-center justify-between md:hidden w-full h-full'>
  <div className='relative flex items-center justify-center'>
          <BsBasket3Fill className='text-textColor text-2xl cursor-pointer w-4'/>
          <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>

          </div>
 
        </div>
  <Link className='flex items-center' to={'/'}>
      <img src={Logo} alt="logo" className='w-8 object-cover' />
      <p className='text-headingColor text-xl font-bold '>City</p>
      </Link>



      <div className='relative'>
        <motion.img  onClick={login} whileTap={{scale:0.6}} src={user?user.photoURL:Avatar} alt="profile" className='w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full' />
      {isMenu &&(
          <motion.div initial={{opacity:0,scale:0.6 }}  animate={{opacity:1,scale:1 }} exit={{opacity:0,scale:0.6 }} className='w-40 bg-gray-100 shadow-xl rounded-lg  flex flex-col absolute top-12 right-0 '>
         
          {
           user && user.email==='nibin98prasad@gmail.com' && (
           <Link to={"/createItem"}>
             <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase' >NewItem <MdAdd/> </p>
             </Link>
           )

          }
           <ul className='flex flex-col   ' >
        <li className='px-4 py-2 text-base text-textcolor hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase' >Home</li>
        <li className='px-4 py-2 text-base text-textcolor hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase'>Menu</li>
        <li className='px-4 py-2 text-base text-textcolor hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase'>About us</li>
        <li className='px-4 py-2 text-base text-textcolor hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase'>Service</li>
      </ul>
           <p className='px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase' onClick={logout}> Logout <MdLogout/> </p>
          
           
         </motion.div>
      )}
        
        </div>
  </div>

    </header>
  )
}

export default Header