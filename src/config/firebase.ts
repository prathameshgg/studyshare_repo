import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBf2-ExDHrMpvdXlnKXM6rMaMkOMr1HppA",
  authDomain: "studysharez.firebaseapp.com",
  projectId: "studysharez",
  storageBucket: "studysharez.firebasestorage.app",
  messagingSenderId: "216857962508",
  appId: "1:216857962508:web:c34bec06a7287a0cdaa629",
  measurementId: "G-DN9CQL0T5Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);