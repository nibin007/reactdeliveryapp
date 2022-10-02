import React from 'react'
import Delivery from '../img/delivery.png'
import Herobg from  '../img/heroBg.png'
import I1 from '../img/i1.png';
import { herodata } from '../utils/data';
import RowContainer from './RowContainer';

function HomeContainer() {
  return (
    <section id='home' className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full '>
    <div className='py-2 flex-1 flex flex-col items-start  justify-center gap-6'>
      <div className='flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full'><p className='text-base text-orange-500 font-semibold'>
        Bike Delivery

      </p>
      <div className='w-8 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl'>
        <img src={Delivery} alt="delivery"  className='w-full h-full object-contain'/>

      </div>
      </div>
      <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>The Fastest Delivery in  <span className='text-orange-600 text-[3rem] md:text-[5rem]'>Your City</span></p>
      <p className='text-base text-textColor text-center md:text-left lg:w-[80%]'>
     lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
        <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-3xl hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>
    </div>
   <div className='py-2  flex-1 flex items-center relative' >
    <img src={Herobg} className="ml-auto h-400 w-full lg:w-auto  lg:h-650 " alt="herobg" />
     <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center px-14 py-4 gap-4 flex-wrap '>
      {herodata && herodata.map(n=>(
          <div key={n.id} className=' w-190  p-4  bg-cardOverlay backdrop-blur-md rounded-md flex flex-col items-center justify-center'>
          <img src={n.imagesrc} alt="icon" className='w-40 -mt-20' />
         <p className='text-base font-semibold text-textColor'>{n.name} </p>
         <p className='text-sm  text-semibold text-lighttextGray my-3'>{n.decp}</p>
        <p className='text-sm font-semibold text-headingColor'>{n.price}</p>

        </div>
      ))}
     </div>
   </div>

  </section>
  )
}

export default HomeContainer