import { Dispatch, SetStateAction, useState } from "react";
import {
  BodyButton,
  BodyContent,
  CardBodyText,
  CardContainer,
  CardHeaderText,
  CardWrapper,
  FinishButton,
  FooterContent,
  FooterText,
  HeaderContent,
  MainContent,
} from "./styles";
import { updateLoan } from "@/app/firebase/services/Loan";
import { Campaign } from "@/contexts/campaignContext";

interface Props {
  handle: string;
  hasCampaign: boolean;
  campaign: Campaign | undefined;
  setCampaign: (campaign: Campaign | undefined) => void;
  setScreen: Dispatch<SetStateAction<string>>;
  dispatchMessage: (msg: string, type: boolean, time?: number) => void;
}

export default function DashboardCampaign({
  handle,
  hasCampaign,
  campaign,
  setCampaign,
  setScreen,
  dispatchMessage,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const formatedDate = (date: string | undefined) => {
    const formatedTotal = (total: number) => (total < 10 ? "0" + total : total);
    if (date) {
      const baseDate = new Date(date);
      const day = formatedTotal(baseDate.getDate());
      const month = formatedTotal(baseDate.getMonth() + 1);
      const year = baseDate.getUTCFullYear();
      return day + "/" + month + "/" + year;
    } else {
      const baseDate = new Date();
      const day = formatedTotal(baseDate.getDate());
      const month = formatedTotal(baseDate.getMonth() + 1);
      const year = baseDate.getUTCFullYear();
      return day + "/" + month + "/" + year;
    }
  };
  const renderingCards = (total: number, title: string, prefix: string) => {
    const formatedTotal = total < 10 ? "0" + total : total;
    return (
      <CardContainer className="flex">
        <CardWrapper className="flex">
          <CardHeaderText>{title}</CardHeaderText>
        </CardWrapper>
        <CardBodyText>
          {formatedTotal} {prefix}
        </CardBodyText>
      </CardContainer>
    );
  };
  async function handleFinish(event: React.MouseEvent<HTMLButtonElement>) {
    
    if (event.detail > 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10 * 1000);
      return;
    }

    const total_campaign = campaign ? campaign.total_campaign : 0;
    const total_percent = campaign ? campaign.total_percent : 0.95;

    const response = await updateLoan(handle, {
      description: "",
      percent_sale: 0,
      sale_amount: 0,
      expiration_date: "",
      open_in: "",
    });
    if (response) {
      setCampaign({
        description: "",
        total_percent,
        total_campaign,
        size: campaign ? campaign.size : 0,
        open_in: "",
      });
      setScreen("dashboardCampaign");
      dispatchMessage("[SUCESSO]: CAMPANHA ENCERRADA !!", true);
    } else {
      dispatchMessage("[ERROR]: NÃO FOI POSSIVEL ENCERRAR A CAMPANHA !!", true);
    }
  }
  return (
    <MainContent className="flex fd">
      <HeaderContent className="flex">
        {renderingCards(
          campaign ? Math.round((0.95 - campaign.total_percent) * 100) : 0,
          "VENDIDOS",
          "DE 95%"
        )}
        {renderingCards(campaign ? campaign.size : 0, "TOTAL", "COMPRARAM")}
        {renderingCards(
          campaign ? campaign.total_campaign : 0,
          "CAMPANHAS",
          "CRIADAS"
        )}
      </HeaderContent>
      <BodyContent className="flex">
        {!hasCampaign ? (
          <BodyButton onClick={() => setScreen("createCampaign")}>
            NOVA CAMPANHA
          </BodyButton>
        ) : (
          <FinishButton
            disabled={loading}
            onClick={async (event: any) => await handleFinish(event)}
          >
            ENCERRAR CAMPANHA
          </FinishButton>
        )}
      </BodyContent>
      <FooterContent className="flex">
        {hasCampaign ? (
          <FooterText>
            Você tem uma campanha em andamento <br /> ABERTA EM:{" "}
            <b>
              {formatedDate(
                campaign ? campaign.open_in : new Date().toString()
              )}
            </b>
          </FooterText>
        ) : (
          <FooterText>
            Você não tem nenhuma campanha em aberto mas pode abrir uma nova a
            qualquer momento que encerrar uma anterior
          </FooterText>
        )}
      </FooterContent>
    </MainContent>
  );
}
