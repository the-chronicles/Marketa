// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHyK2nGHXFEMglt31kahmQv9NW6Iu5z8I",
  authDomain: "omnimarketa-a3050.firebaseapp.com",
  projectId: "omnimarketa-a3050",
  storageBucket: "omnimarketa-a3050.firebasestorage.app",
  messagingSenderId: "269519159414",
  appId: "1:269519159414:web:ae70ce4744293e8ae05f57"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 