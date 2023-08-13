import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3MiQe7XaxNi2BvZX42xQ-2tjjsCMNt3A",
  authDomain: "blogging-system-97604.firebaseapp.com",
  projectId: "blogging-system-97604",
  storageBucket: "blogging-system-97604.appspot.com",
  messagingSenderId: "1009503687991",
  appId: "1:1009503687991:web:5f1ebfe51ec031356db6b2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };