import { createContext, useContext, useState, ReactNode } from "react";

export type Campaign = {
  description: string;
  total_percent: number;
  total_campaign: number;
  size: number;
};

type CampaignContextType = {
  campaign: Campaign | undefined;
  setCampaign: (campaign: Campaign | undefined) => void;
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaign, setCampaign] = useState<Campaign | undefined>(undefined);

  return (
    <CampaignContext.Provider
      value={{
        campaign,
        setCampaign,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaign deve ser usado dentro de um UserProvider");
  }
  return context;
};
