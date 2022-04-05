import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzqUNWMFHym84OKDxA9J5Eia9EoGUrwrE",
  authDomain: "apper-firebase-auth-3.firebaseapp.com",
  projectId: "apper-firebase-auth-3",
  storageBucket: "apper-firebase-auth-3.appspot.com",
  messagingSenderId: "345883371758",
  appId: "1:345883371758:web:b10e861b4ba5385084abff"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
export default firebaseAuth;
