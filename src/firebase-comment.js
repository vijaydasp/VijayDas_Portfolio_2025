import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQGIXH5fFKaYZV-Z8woN-O-hGBklSZiU0",
    authDomain: "protfolio-630bb.firebaseapp.com",
    projectId: "protfolio-630bb",
    storageBucket: "protfolio-630bb.firebasestorage.app",
    messagingSenderId: "421224174917",
    appId: "1:421224174917:web:8b4cee1dbbc9954cd3da2c",
  };

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };