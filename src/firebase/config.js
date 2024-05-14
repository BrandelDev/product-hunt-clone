// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhPqtFIW0EUY9llaPETD1WMF08V2T-mEM",
  authDomain: "product-hunt-electiva1.firebaseapp.com",
  projectId: "product-hunt-electiva1",
  storageBucket: "product-hunt-electiva1.appspot.com",
  messagingSenderId: "362256161505",
  appId: "1:362256161505:web:1a6c4bbaf8da780ad3b5a0"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireBaseApp);
export const FirebaseDB = getFirestore(FireBaseApp);
export const storage = getStorage(FireBaseApp);