import { data } from "autoprefixer";
import {addDoc, collection, doc, getDocs,getDoc, orderBy,updateDoc, query, setDoc, where } from "firebase/firestore"
import {db } from "../firebase.config"

export const saveItem=async (data)=>{
await setDoc(doc(db,'foodItems',`${Date.now()}`),data,{
    merge:true,
});
}
export const getAllFoodItems=async ()=>{
    const items=await getDocs(query(collection(db,"foodItems"),orderBy("id","desc")))
     return items.docs.map((doc)=>doc.data())

}
export const checkUser=async(user)=>{
     const q= query(collection(db,"users"),where("uid","==",user.uid))
     const docs =await getDocs(q)
     if(docs.docs.length===0){
        data={
            uid:user.uid,
            name:user.displayName,
            authProvider:"google",
            email:user.email,
            photoURL:user.photoURL

        }
        
        await addDoc(collection(db,"users"),data)
         return data
     }
     
     
     else{
        return docs.docs.map((doc)=>
          doc.data())
   
                      
     }
}
export const SaveCartitem=async(cartitem,uid)=>{
    console.log(uid)
    const details=  query(collection(db,"cartItems"),where("uid","==",uid))
    const check =await getDocs(details)
       if (check.docs.length===0){
        const cartdata={
            uid:uid,
            cartItems:cartitem 
              }
    
        const che3= await setDoc(doc(db,"cartItems",cartdata.uid),cartdata)
       
        console.log(che3)
    return che3
        //     const check2=   await addDoc(collection(db,"cartItems"),cartdata)
    //    return check2
        
       }else{
               const  data3={cartItems:cartitem}
        const docref=doc(db,"cartItems",uid)        
          updateDoc(docref,data3).then((docref)=>{
            console.log('changed')
          })
    
        
  };
}
export const getCart=async(uid)=>{
  const docRef = doc(db, "cartItems", uid);
  const docSnap = await getDoc(docRef);  
  if(docSnap.exists()){
    return docSnap.data()
  }
} 
              
    
   
           
