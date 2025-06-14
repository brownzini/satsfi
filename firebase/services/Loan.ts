import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

interface Props {
  description: string;
  total_percent: number;
  total_campaign: number;
  size: number;
  open_in: string;
}

interface LoanProps {
  description: string;
  expiration_date: string;
  open_in: string;
  lenders: any[];
  percent_sale: number;
  sale_amount: number;
  total_campaign: number;
  total_percent: number;
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
          open_in: collec.data()?.open_in,
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

      if (!collec.data()) {
        return false;
      }

      const streamerData = collec.data();
      if (streamerData) {
        if (data.percent_sale < streamerData.total_percent) {
          Object.assign(data, {
            total_percent: streamerData.total_percent,
          })
          await updateDoc(userDoc, data);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const createNewLoan = async (
  handle: string,
  data: LoanProps
): Promise<boolean | string> => {
  if (handle) {
    try {
      await setDoc(doc(collection(db, "loan"), handle), data);
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
