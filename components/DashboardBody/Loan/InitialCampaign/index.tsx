import { createNewLoan } from "@/firebase/services/Loan";
import {
  BodyContainer,
  CreateButton,
  FooterContainer,
  HeaderContainer,
  Img,
  ImgContainer,
  ImgWrapper,
  MainContent,
  TextContainer,
} from "./styles";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  handle: string;
  setScreen: Dispatch<SetStateAction<string>>;
  dispatchMessage: (msg: string, type: boolean, time?: number) => void;
}

export default function InitialCampaign({
  handle,
  setScreen,
  dispatchMessage,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleCreate(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.detail > 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000 * 1000);
      return;
    }
    if (!loading) {
      const defaultData = {
        description: "",
        expiration_date: "",
        open_in: "",
        lenders: [],
        percent_sale: 0,
        sale_amount: 0,
        total_campaign: 0,
        total_percent: 0.95,
      };
      const response = await createNewLoan(handle, defaultData);
      if (response) {
        dispatchMessage("[SUCESSO]: MODO CAMPANHA ATIVADO !!", true);
        setScreen("dashboardCampaign");
      } else {
        dispatchMessage(
          "[ERRO]: NÃO FOI POSSIVEL ATIVAR O MODO CAMPANHA !!",
          false
        );
      }
    }
  }
  return (
    <MainContent>
      <HeaderContainer>
        <ImgContainer className="flex">
          <ImgWrapper className="flex">
            <Img src="/img/dog.png" />
          </ImgWrapper>
        </ImgContainer>
      </HeaderContainer>
      <BodyContainer className="flex">
        <TextContainer>
          Você ainda não tem o modo campanha de DDP ativado. <br /> Acesse os
          termos caso surjam dúvidas.
        </TextContainer>
      </BodyContainer>
      <FooterContainer className="flex">
        <CreateButton
          className="flex"
          disabled={loading}
          onClick={async (event: React.MouseEvent<HTMLButtonElement>) => await handleCreate(event)}
        >
          CRIAR
        </CreateButton>
      </FooterContainer>
    </MainContent>
  );
}
