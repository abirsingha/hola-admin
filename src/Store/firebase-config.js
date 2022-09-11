import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAt9Z7e_sPZLqc0U-h4c20PRBXobKFlYs",
  authDomain: "hola-admin.firebaseapp.com",
  databaseURL: "https://hola-admin-default-rtdb.firebaseio.com",
  projectId: "hola-admin",
  storageBucket: "hola-admin.appspot.com",
  messagingSenderId: "379615835803",
  appId: "1:379615835803:web:01679a028c37cc601f783e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


