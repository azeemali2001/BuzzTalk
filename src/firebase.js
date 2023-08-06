import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNmISr1PtktLBVzq5JTt2M31AvfrhYAu0",
  authDomain: "chat-f85fa.firebaseapp.com",
  projectId: "chat-f85fa",
  storageBucket: "chat-f85fa.appspot.com",
  messagingSenderId: "609292230307",
  appId: "1:609292230307:web:a106973bf800a2afab6916"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
