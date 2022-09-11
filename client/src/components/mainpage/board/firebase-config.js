import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBJZBUgB67H5bkY9jqOzyeqT9aJuPURVGU",
	authDomain: "anonproject-49dab.firebaseapp.com",
	projectId: "anonproject-49dab",
	storageBucket: "anonproject-49dab.appspot.com",
	messagingSenderId: "445214118901",
	appId: "1:445214118901:web:748b3a433b126fe55906bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
