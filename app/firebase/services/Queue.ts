import { doc, updateDoc } from "firebase/firestore";
import { qdb } from "../queueFirebase";

export const cleanQueue = async (handle: string, list: any[]): Promise<boolean> => {
  const streamerDoc = doc(qdb, "queue", handle);
  try {
    await updateDoc(streamerDoc, {list});
    return true;
  } catch (error) {
    return false;
  }
};

export const updateQueueInCall = async (handle: string, inCall: string | ""): Promise<boolean> => {
  const streamerDoc = doc(qdb, "queue", handle);
  try {
    await updateDoc(streamerDoc, {inCall});
    return true;
  } catch (error) {
    return false;
  }
};