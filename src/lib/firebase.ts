
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwoCsgaPMLwfuXiIYclx5B4Hn0FwZAqqE",
  authDomain: "upstart-a47be.firebaseapp.com",
  projectId: "upstart-a47be",
  storageBucket: "upstart-a47be.firebasestorage.app",
  messagingSenderId: "111399919141",
  appId: "1:111399919141:web:0ee8ce76694cd33f11e9cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
