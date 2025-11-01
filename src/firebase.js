import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQGIXH5fFKaYZV-Z8woN-O-hGBklSZiU0",
  authDomain: "protfolio-630bb.firebaseapp.com",
  projectId: "protfolio-630bb",
  storageBucket: "protfolio-630bb.firebasestorage.app",
  messagingSenderId: "421224174917",
  appId: "1:421224174917:web:8b4cee1dbbc9954cd3da2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };