import { useCampaign } from "@/contexts/campaignContext";
import FormCampaign from "./FormCampaign";
import InitialCampaign from "./InitialCampaign";
import { LoanContainer } from "./style";
import { useEffect, useState } from "react";
import DashboardCampaign from "./DashboardCampaign";
import { useMessage } from "@/contexts/useMessage";

interface Props {
  handle: string;
}

export default function Loan({ handle }: Props) {
  const { campaign, setCampaign } = useCampaign();
  const [screen, setScreen] = useState<string>("initial");
  const { dispatchMessage } = useMessage();

  useEffect(() => {
    setScreen(campaign ? "dashboardCampaign" : "initial");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const RenderingScreens = (type: string) => {
    switch (type) {
      case "dashboardCampaign":
        return (
          <DashboardCampaign
            handle={handle}
            campaign={campaign}
            setCampaign={setCampaign}
            hasCampaign={campaign?.description !== ""}
            setScreen={setScreen}
            dispatchMessage={dispatchMessage}
          />
        );
      case "createCampaign":
        return (
          <FormCampaign
            handle={handle}
            setScreen={setScreen}
            dispatchMessage={dispatchMessage}
          />
        );
      default:
        return (
          <InitialCampaign
            dispatchMessage={dispatchMessage}
            handle={handle}
            setScreen={setScreen}
          />
        );
    }
  };

  return (
    <LoanContainer onClick={() => console.log(campaign)} className="flex fd">
      {RenderingScreens(screen)}
    </LoanContainer>
  );
}
