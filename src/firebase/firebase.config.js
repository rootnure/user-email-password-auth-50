// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-uszbwN3RaqumSAxrY03uM42s8GQItyc",
  authDomain: "user-email-password-auth-54559.firebaseapp.com",
  projectId: "user-email-password-auth-54559",
  storageBucket: "user-email-password-auth-54559.appspot.com",
  messagingSenderId: "294005677978",
  appId: "1:294005677978:web:ed29cae95e260cade7a423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth