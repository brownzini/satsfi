import axios from "axios";

export const getUserProfile = async (
  handle: string,
  userKeyHub: string
): Promise<any | undefined> => {
  if (handle) {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "getData",
        { handle: handle, userKeyHub },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = result.data.response;
      if (data !== null) {
        return data;
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
  userData: any,
  type?: string
): Promise<boolean> => {
  if (handle) {
    try {
      console.log(handle)
      const walletAddress = JSON.parse(userData).generateKey.addressLightning;
      const baseData = {
        jsonData: userData,
      };
      if (type === "streamerCreateSurvey") {
        Object.assign(baseData, {
          surveyCreatorWallet: walletAddress,
        });
      }
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "updateData",
        { handle, data: baseData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = result.data.response;
      if (data !== null) {
        return data;
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

export const createNewHub = async (
  handle: string,
  userData: string
): Promise<boolean> => {
  if (handle) {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "createUser",
        { handle, data: userData },
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
