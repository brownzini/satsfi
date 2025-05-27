import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

console.log(firebaseConfig)
const app = initializeApp(firebaseConfig, "satsfi");
export const db = getFirestore(app);