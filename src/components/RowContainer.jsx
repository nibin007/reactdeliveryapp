import React, { useEffect, useRef } from 'react'
import {MdShoppingBasket} from 'react-icons/md'
import {motion} from 'framer-motion'


 function RowContainer({flag,data,scrollValue}) {
    console.log(data,'heeesds')
   const rowContainer=useRef()
    useEffect(()=>{
         rowContainer.current.scrollLeft +=scrollValue
    },[scrollValue]);
  return (
    <div ref={rowContainer} className={`w-full  my-12 flex items-center gap-3  ${flag? ' overflow-x-scroll scrollbar-none scroll-smooth':'overflow-x-hidden flex-wrap'} `}>
  {data && data.map((items)=>(
    <div key={items.id} className='min-w-[300px] md:min-w-[340px]  w-300 md:w-340 hover:drop-shadow-lg  h-auto rounded-lg p-2 shadow-md backdrop-blur-lg  my-12 bg-gray-100'>
    <div className='w-full flex items-center justify-between'>
        <motion.img whileHover={{scale:1.25}} src="" alt=""  className='w-40 -mt-8  drop-shadow-2xl'/>
     <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md'>
       <MdShoppingBasket className='text-white'/>
     </motion.div>
    </div>
   <div className='w-full flex flex-col  items-end justify-end'>
    <p className='text-textColor font-semibold text-base md:text-lg  '>chocolate and vanilla</p>
  <p className='mt-1 text-sm text-gray-400'>45 calories</p>
      <div className='flex items-center gap-8'>
        <p  className='text-lg text-textColor font-semibold'> <span className='text-red-600 text-sm'>$</span>3.24</p>

      </div>
   </div>

    </div>        

  ))}

</div>
  )
}

export default RowContainer