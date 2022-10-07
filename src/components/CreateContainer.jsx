import React, { useState } from 'react'
import {motion} from 'framer-motion'
import {MdFastfood,MdCloudUpload,MdDelete,MdFoodBank,MdAttachMoney} from 'react-icons/md'
import { categories } from '../utils/data'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase.config'

import { getAllFoodItems, saveItem } from '../utils/firebaseFunction'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

function CreateContainer() {
  const[title,setTitle]=useState("")
  const[calories,setCalories]=useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory]=useState(true)
  const[fields,setField]=useState(false)
  const[alertStatus,setAlertStatus]=useState("danger")
  const[msg,setMsg]=useState(null)
  const[imageAsset,setimageAsset]=useState(null)
  const[isLoading,setIsloading]=useState(false)
  const[{foodItems},dispatch]=useStateValue();
  const fetchData=async()=>{
    await getAllFoodItems().then((data)=>{
     dispatch({
      type:actionType.SET_FOOD_ITEMS,
      foodItems:data
     })
    })
  }
  
  
  
  const uploadImage=(e)=>{
      setIsloading(true)
      const imageFile=e.target.files[0]
    
      const storageref=ref(storage,`Images/${Date.now()}-${imageFile.name}`)
      const uploadTask=uploadBytesResumable(storageref,imageFile) 
      uploadTask.on('state_changed',(snapshot)=>{
          const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;


      },(error)=>{
           console.log(error)
           setField(true);
           setMsg('error while uploading')
           setAlertStatus('danger')
           setTimeout(()=>{
                setField(false)
                setIsloading(false)
           },4000)

      },()=>{getDownloadURL(uploadTask.snapshot.ref).then(downloadurl=>{
             setimageAsset(downloadurl)
             setIsloading(false)
             setField(true)
             setMsg('image uploaded successfully')
             setAlertStatus('success')
             setTimeout(() => {
                  setField(false)             
             }, 4000);

      })})     

  }
  const deleteImage=()=>{
          setIsloading(true)
          const deleteref=ref(storage,imageAsset)
          deleteObject(deleteref).then(()=>{
            setimageAsset(null)
            setIsloading(false)
            setField(true)
            setMsg('image deleted successfully')
            setAlertStatus('success')
            setTimeout(() => {
                 setField(false)             
            }, 4000);
          })
  }
  const saveDetails=()=>{
      setIsloading(true)
      try{
           if(!title || !calories || !imageAsset || !price || !category){
          
            setField(true);
            setMsg('fields must be filled')
            setAlertStatus('danger')
            setTimeout(()=>{
                 setField(false)
                 setIsloading(false)
            },4000)
           }
           else{
            const data ={
              id:`${Date.now()}`,
              title:title,
              imageurl:imageAsset,
              category:category,
              calories:calories,
              qty:1,
              price:price

            }
            saveItem(data)
            setIsloading(false)
            setField(true)
            setMsg('data uploaded successfully ')
            clearData()
            setAlertStatus('success')
            setTimeout(() => {
                 setField(false)             
            }, 4000);
           }
      }
      catch(error){
        
        setField(true);
        setMsg('error while uploading')
     
        setAlertStatus('danger')
        setTimeout(()=>{
             setField(false)
             setIsloading(false)
          
        },4000)
      }
      fetchData()
  }

const clearData=()=>{
  setTitle("")
  setimageAsset(null)
  setCalories("")
  setPrice("")

}

  
  return (
    <div className='w-full min-h-screen h-auto p-4 flex items-center justify-center  '>
     <div className='w-[90%] md:w-[75%]   border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4 ' >
        {
          fields &&(
            <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}  className={`w-full p-2 rounded-lg text-center font-semibold ${alertStatus==='danger'?'bg-red-400 text-red-800':'bg-emerald-400 text-emerald-800' }`}>{msg}</motion.p> 
          )
        }
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
        <MdFastfood className='text-xl text-gray-700'/>
        <input type="text" required value={title} placeholder="give me a title" className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor'  onChange={(e)=>setTitle(e.target.value)}/>

        </div>

        <div className='w-full'>
          <select name="" id="" onChange={(e)=>setCategory(e.target.value)} className="outline-none w-ful text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className='bg-white'> select category</option>
            {category && categories.map(item=>(
              <option key={item.id} value={item.url} className='text-base border-0 outline-none capitalize text-textColor'>{item.name}  </option>
            ))}
          </select>

        </div>
 <div className='group flex justify-center items-center  flex-col border-2 border-dotted border-gray-200 w-full h-225 md:h-420 cursor-pointer rounded-lg '>
 {isLoading?<Loader/> :<>
 {!imageAsset ? <>
 
 <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
<div className='w-full h-full flex flex-col items-center justify-center gap-2'>
<MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
<p className='text-gray-500 hover:text-gray-700'>click here to upload</p>
</div>
<input type="file" name='uploadimage' accept='image/*' onChange={uploadImage} className="w-0 h-0" />
 </label>
 </> : <>
 <div className=' h-full'>
<img src={imageAsset} alt="uploaded image"  className="w-full,h-full,object-cover"/>
<button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' onClick={deleteImage}><MdDelete className='text-white' /></button>
 </div>
 </>}

 </>
 }
 </div>
 <div className='w-full flex flex-col md:flex-row items-center gap-3'>
  <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
<MdFoodBank className='text-gray-700 text-2xl'/>
<input type="text" required placeholder='Calories' value={calories} onChange={(e)=>setCalories(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
  </div>
  <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
<MdAttachMoney className='text-gray-700 text-2xl'/>
<input type="text" required placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
  </div>

 </div>
<div className='flex items-center  w-full'>
<button type='button' className='ml-0 md:ml-auto w-full md:w-auto  border-none outline-none bg-emerald-500 px-12 py-2  rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>save</button>
</div>

     </div>

    </div>
  )
}

export default CreateContainer