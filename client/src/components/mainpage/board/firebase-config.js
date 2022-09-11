import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUgEsJhjrnHcILXUkXi4feeRLqc5WjBFo",
  authDomain: "anonymproject-a43c0.firebaseapp.com",
  projectId: "anonymproject-a43c0",
  storageBucket: "anonymproject-a43c0.appspot.com",
  messagingSenderId: "794721922461",
  appId: "1:794721922461:web:f857e19fc0c906feff9374",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
