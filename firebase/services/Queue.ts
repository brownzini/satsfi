import axios from "axios";

export const cleanQueue = async (
  handle: string,
  list: any[]
): Promise<boolean> => {
  if (handle) {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "cleanQueue",
        { handle, list },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = result.data.response;
      return data;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const updateQueueInCall = async (
  handle: string,
  inCall: string | ""
): Promise<boolean> => {
  if (handle) {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "updateQueueInCall",
        { handle, inCall },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = result.data.response;
      return data;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
