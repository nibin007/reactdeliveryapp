import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyD2yXE1a8c1hQFzmlNJSlbTxBlo-EnWNXE",
    authDomain: "restaurantapp-30a05.firebaseapp.com",
    databaseURL: "https://restaurantapp-30a05-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-30a05",
    storageBucket: "restaurantapp-30a05.appspot.com",
    messagingSenderId: "170966692674",
    appId: "1:170966692674:web:37df8f1c50ebbc01564edb"
  };
const app=getApps.length>0?getApp() :initializeApp(firebaseConfig)
const db=getFirestore(app)
//const db2=firebase.firestore()
const storage=getStorage(app)

export {app,db,storage};