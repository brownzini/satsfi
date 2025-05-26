import { createNewLoan } from "@/app/firebase/services/Loan";
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
import { Dispatch, SetStateAction } from "react";

interface Props {
  handle: string;
  setScreen: Dispatch<SetStateAction<string>>;
  dispatchMessage: (msg: string, type: boolean, time?: number) => void;
}

export default function InitialCampaign({ handle, setScreen, dispatchMessage }: Props) {
  async function handleCreate() {
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
        <CreateButton className="flex" onClick={handleCreate}>
          CRIAR
        </CreateButton>
      </FooterContainer>
    </MainContent>
  );
}
