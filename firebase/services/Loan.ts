import axios from "axios";

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
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "campaign",
        { handle },
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

export const createNewLoan = async (
  handle: string,
  data: LoanProps
): Promise<boolean | string> => {
  if (handle) {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "createCampaign",
        { handle, data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = result.data.response;
      return response;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

export const updateLoan = async (
  handle: string,
  data: any
): Promise<boolean> => {
  if (handle) {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_PAYMENT_PROCESSOR_URL + "updateCampaign",
        { handle, data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = result.data.response;
      return response;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
