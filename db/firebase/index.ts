import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
    apiKey: "AIzaSyCSAsvJ5N9hJhrfQwvW2l7TwWPsHWDgpyw",
    authDomain: "crasmitic.firebaseapp.com",
    projectId: "crasmitic",
    storageBucket: "crasmitic.appspot.com",
    messagingSenderId: "45738475771",
    appId: "1:45738475771:web:36cfea770b0c1902d2705e",
    measurementId: "G-7P95DDCQE3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);