import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";


// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAbdXfXgehuax9sRi5kb5T9BVJikNGHIPU",
  authDomain: "chat-app-48b65.firebaseapp.com",
  projectId: "chat-app-48b65",
  storageBucket: "chat-app-48b65.appspot.com",
  messagingSenderId: "783484715569",
  appId: "1:783484715569:web:174a74006b8f912b898b10",
  measurementId: "G-4M9F57Q6W9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, 'localhost', 8080);

export { app, db }