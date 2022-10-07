import React, { useEffect, useRef, useState } from 'react'
import {MdShoppingBasket} from 'react-icons/md'
import {motion} from 'framer-motion'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

 function RowContainer({flag,data,scrollValue}) {
  const [{cartItems},dispatch]=useStateValue()
  
  const[items,setItems]=useState(cartItems)
  
  
   const rowContainer=useRef()
  
   //console.log('cart',cartItems)
 
   const addtocart= ()=>{
    //  setItems([...cartItems,items])  
    dispatch({
      type:actionType.SET_CARTITEMS,
      cartItems:items
  
    })
    localStorage.setItem('cartItems',JSON.stringify(items))

}

   useEffect(()=>{
    addtocart()
  },[items])
  
  

   useEffect(()=>{
         rowContainer.current.scrollLeft +=scrollValue
    },[scrollValue]);

    
  return (
    <div ref={rowContainer} className={`w-full  my-12 flex items-center gap-3  ${flag? ' overflow-x-scroll scrollbar-none scroll-smooth':'overflow-x-hidden flex-wrap justify-center'} `}>
  {data && data.length >0 ? data.map((items)=>(
    <div key={items.id} className='w-275 h-[225px] min-w-[300px] md:min-w-[340px]  md:w-300 hover:drop-shadow-lg   rounded-lg p-2 shadow-md backdrop-blur-lg  my-12 bg-gray-100 flex flex-col items-center justify-between'>
    <div className='w-full flex items-center justify-between'>
      
      <motion.div whileHover={{scale:1.25}} className='w-40 -mt-8 h-40 drop-shadow-2xl'>
      <img  src={items?.imageurl}   alt=""  className='w-full h-full object-contain' />
   
      </motion.div>
     <motion.div onClick={()=>setItems([...cartItems,items])} whileTap={{scale:0.75}} className='w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md'>
       <MdShoppingBasket className='text-white'/>
     </motion.div>
    </div>
   <div className='w-full flex flex-col  items-end justify-end'>
    <p className='text-textColor font-semibold text-base md:text-lg  '>{items?.title}</p>
  <p className='mt-1 text-sm text-gray-400'>{items?.calories}</p>
      <div className='flex items-center gap-8'>
        <p  className='text-lg text-textColor font-semibold'> <span className='text-red-600 text-sm'>$</span>{items?.price}</p>

      </div>
   </div>

    </div>        

  )) : <div className='w-full  flex  flex-col items-center justify-center '> 
    <img src={NotFound} alt="" className='h-340' />
    <p className='text-xl text-headingColor font-semibold my-2 '>itemsNot Available </p>
  </div>}

</div>
  )
}

export default RowContainer