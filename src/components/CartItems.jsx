import React, { useState,useEffect } from 'react'
import {BiMinus,BiPlus} from 'react-icons/bi'
import {motion} from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { json } from 'react-router-dom'
import { actionType } from '../context/reducer'
let items=[]

function CartItems({item,setFlag,flag}) {
   const[{cartItems},dispatch]=useStateValue()
     
   // const [items, setItems] = useState([])
    //const [mark, setMark] = useState(false)
         
    const[qty,setUpdateQty]=useState(item.qty)
//   console.log(cartItems)

const cartDispatch=()=>{
  localStorage.setItem("cartItems",JSON.stringify(items))
  dispatch({
    type:actionType.SET_CARTITEMS,
    cartItems:items,
  })
}


const setQty=(action,id)=>{
    console.log('hh')
    if(action==="add"){
        setUpdateQty(qty+1)
          cartItems.map((item=>{
            if(item.id===id){
                item.qty+=1;
              setFlag(flag+1)
            }
          })    )
          cartDispatch()
    }
    else{

        if(qty==1){
         // console.log(cartItems.filter((item)=>item.id!==id))
            items=cartItems.filter((item)=>item.id!==id)
            setFlag(flag+1)
           //console.log(it)
           //setItems(it)
            //setMark(!mark)
            cartDispatch()
        }else{
            setUpdateQty(qty-1)
            
          cartItems.map((item=>{
            if(item.id===id){
                item.qty-=1;
            setFlag(flag+1)
              }
          })    )
          cartDispatch()
        }
    }
}


useEffect(() => {
  items=cartItems


}, [qty,items])


  return (
    <div  className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 '>
    <img src={item?.imageurl} className='w-20 h-20 max-w-[60px] rounded-full object-contain' alt="" />
 {/* {namesection} */}
<div className='flex flex-col gap-2'>
<p className='text-base text-gray-50 '>
  {item?.title}
</p> 
<p className='text-sm block text-gray-300 font-semibold '>${parseFloat(item?.price)*qty }</p>
</div>
{/* buttonsection */}
<div className='group flex items-center gap-2 ml-auto cursor-pointer'>
<motion.div whileTap={{scale:0.75 }} onClick={()=>setQty('remove',item?.id)}  >
<BiMinus className="text-gray-50"/>
</motion.div>
<p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center  '>{qty}</p>

<motion.div whileTap={{scale:0.75 }} onClick={()=>setQty('add',item?.id)} >
<BiPlus className="text-gray-50"/>
</motion.div>

</div>
  </div>
  )
}

export default CartItems