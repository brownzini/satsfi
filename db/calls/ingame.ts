import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
} from 'firebase/firestore';

import { db, firebaseConfig } from '../firebase';

const baseCollection = collection(db, 'categorias');

export const addInGame = async (data: any) => {
    const inGameRef = await addDoc(baseCollection, data);
    return inGameRef.id;
};

export const getInGameById = async (id: string): Promise<any> => {
    const userDoc = doc(db, 'INGAME', id);
    const collec = await getDoc(userDoc);

    const data = collec.data();

    if (!data) return;

    return data;
};

export const updateInGameById = async (id: string) => {
    const categoryDoc = doc(db, 'INGAME', id);
    await updateDoc(categoryDoc, { deadline: '07/05' });
};

export const deleteInGameById = async (id: string) => {
    const userDoc = doc(db, 'INGAME', id);
    await deleteDoc(userDoc);
};