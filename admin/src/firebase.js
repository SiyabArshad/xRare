// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsvOSHh-KdWoWq6e4pSl6PGgFwFuwZTbQ",
  authDomain: "videoimage-dd7d0.firebaseapp.com",
  projectId: "videoimage-dd7d0",
  storageBucket: "videoimage-dd7d0.appspot.com",
  messagingSenderId: "854775212817",
  appId: "1:854775212817:web:7cc7a038d563765c4f7ab0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)
export default storage