import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseQueue } from './queueConfig';

const qapp = initializeApp(firebaseQueue, "satsfi_queue");
export const qdb = getFirestore(qapp);