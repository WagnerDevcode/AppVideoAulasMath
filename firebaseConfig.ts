// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNfmKIKvTfimstI7dZboF4GjRnP3aKjlc",
  authDomain: "appaulamath.firebaseapp.com",
  projectId: "appaulamath",
  storageBucket: "appaulamath.appspot.com",
  messagingSenderId: "429333774353",
  appId: "1:429333774353:web:61f039a60cbb0fdd0af1b0",
  measurementId: "G-2PMQKLLK1K",
};
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
