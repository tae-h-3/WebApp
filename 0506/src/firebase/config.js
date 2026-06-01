
// Firebase 설정 파일
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW5aVSqxmMkCMyB7iac9wC6lMk4lXHfJ4",
  authDomain: "webapp-7d06f.firebaseapp.com",
  projectId: "webapp-7d06f",
  storageBucket: "webapp-7d06f.firebasestorage.app",
  messagingSenderId: "269692894632",
  appId: "1:269692894632:web:5eea01ca2010b0d99cb19d",
  measurementId: "G-PNG548T7MP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;