import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLAdStfoHEJdoiUDpcrhTTRS6nxGy9k7s",
  authDomain: "anonproject2.firebaseapp.com",
  projectId: "anonproject2",
  storageBucket: "anonproject2.appspot.com",
  messagingSenderId: "685610522704",
  appId: "1:685610522704:web:01475ccee7780562eed955",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
