import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB-ppHF2BOez9EUj67_7VwV8M6-_Qs5bM",
  authDomain: "anon-project-513c3.firebaseapp.com",
  projectId: "anon-project-513c3",
  storageBucket: "anon-project-513c3.appspot.com",
  messagingSenderId: "296839165257",
  appId: "1:296839165257:web:e35646720b4f85a6f19698",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
