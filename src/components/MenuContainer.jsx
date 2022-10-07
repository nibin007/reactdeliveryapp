import React, { useEffect, useState } from 'react'
 import {IoFastFood} from 'react-icons/io5'
import { categories } from '../utils/data'
import {motion} from 'framer-motion'

import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
function MenuContainer() {
  const [filter,setFilter]=useState("chicken")
 const [{foodItems},dispatch]=useStateValue()

    return (
    <section className='w-full my-6' id='menu'>
        <div className='w-full flex  flex-col items-center justify-center'>

        <p className='text-2xl font-semibold capitalize relative text-headingColor  before:absolute before:rounded-lg before:content   before:w-28 before:h-1 before:-bottom-2  before:left-0 before:bg-orange-400 transition-all ease-in-out duration-100 mr-auto '>Our Dishes
          </p>
      <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
  {categories && categories.map((category)=>(
        <motion.div whileTap={{scale:0.6 }}   key={category.id} onClick={()=>setFilter(category.url)} className={  `group ${filter===category.url ? 'bg-cartNumBg': 'bg-card'} w-24 min-w-[94px] h-28 hover:bg-cartNumBg cursor-pointer rounded-lg dropshadow-xl flex flex-col gap-3 items-center justify-center `} >
        
        
        <div className={`w-10 h-10 rounded-full ${filter===category.url ? 'bg-white' : 'bg-cartNumBg'} group-hover:bg-cardOverlay flex items-center justify-center`}>     
        
               <IoFastFood className={` ${filter===category.url ? 'text-textColor': 'text-white'} group-hover:text-textColor text-lg`}>

            </IoFastFood>
        </div>
        <p className={`text-sm ${filter===category.url ? 'text-white':'text-textColor'}  group-hover:text-card`}>{category.name}</p>
    </motion.div>

  ))}


      </div>
      <div className='w-full  '>
        <RowContainer flag={false} data={foodItems?.filter((n)=>n.category===filter)}/>

      </div>
      
        </div>

    </section>
  )
}

export default MenuContainer