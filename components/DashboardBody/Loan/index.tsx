import { useCampaign } from "@/contexts/campaignContext";
import FormCampaign from "./FormCampaign";
import InitialCampaign from "./InitialCampaign";
import { LoanContainer } from "./style";
import { useState } from "react";

export default function Loan() {
  const { campaign } = useCampaign();
  const [hasForms, setHasForms] = useState<boolean>(false);

  const haveCampaign = (description: string) =>
    description !== "" ? (
      <>
        {" "}
        <h2> remover campanha </h2>{" "}
      </>
    ) : (
      <>
        {" "}
        <h2> criar campanha kkkk </h2>{" "}
      </>
    );
  const NotHaveCampaign = (campaign: any) =>
    !campaign ? <InitialCampaign /> : haveCampaign(campaign.description);
  return (
    <LoanContainer className="flex fd">
      {NotHaveCampaign(campaign)}
    </LoanContainer>
  );
}
