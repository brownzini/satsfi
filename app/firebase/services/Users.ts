import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

export const getUserProfile = async (
  handle: string,
  userKeyHub: string
): Promise<any | undefined> => {
  if (handle) {
    try {
      const userDoc = doc(db, "users", handle);
      const collec = await getDoc(userDoc);

      if (!collec.data()) return undefined;

      const result = collec.data();

      if (result) {
        const parsedData = JSON.parse(result.jsonData);
        const dbKeyHub = parsedData.generateKey.keyHub;
        if (dbKeyHub === userKeyHub) {
          return parsedData;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const updateConfig = async (
  handle: string,
  data: any
): Promise<boolean> => {

  if (handle) {
    try {
      const userDoc = doc(db, "users", handle);
      const collec = await getDoc(userDoc);

      if (!collec.data()) return false;

      let parsedData: any = collec.data();
      parsedData.jsonData = data;
      await updateDoc(userDoc, parsedData);

      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const createNewHub = async (
  handle: string,
  data: string
): Promise<boolean | string> => {
  if (handle) {
    try {
      const userDoc = doc(db, "users", handle);
      const collec = await getDoc(userDoc);

      if (collec.data()) return "exist";

      await setDoc(doc(collection(db, "users"), handle), { jsonData: data });
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export async function deleteData(handle: string) {
  const docRef = doc(db, "users", handle);
  await deleteDoc(docRef);
}
