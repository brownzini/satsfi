import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

interface Props {
  description: string;
  total_percent: number;
  total_campaign: number;
  size: number;
}

export const getLoan = async (handle: string): Promise<Props | undefined> => {
  if (handle) {
    try {
      const userDoc = doc(db, "loan", handle);
      const collec = await getDoc(userDoc);

      if (!collec.data()) {
        return undefined;
      } else {
        return {
          description: collec.data()?.description,
          total_percent: collec.data()?.total_percent,
          total_campaign: collec.data()?.total_campaign,
          size: collec.data()?.lenders.length,
        };
      }
    } catch (err) {
        return undefined;
    }
  } else {
    return undefined;
  }
};

export const updateLoan = async (
  handle: string,
  data: any
): Promise<boolean> => {
  if (handle) {
    try {
      const userDoc = doc(db, "loan", handle);
      const collec = await getDoc(userDoc);

      if (!collec.data()) return false;

      await updateDoc(userDoc, data);

      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
