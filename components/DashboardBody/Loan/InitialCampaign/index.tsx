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

export default function InitialCampaign() {
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
          Você ainda não criou nenhuma campanha de DDP. <br/> Acesse os termos caso
          surjam dúvidas.
        </TextContainer>
      </BodyContainer>
      <FooterContainer className="flex">
         <CreateButton className="flex">
            CRIAR
         </CreateButton>
      </FooterContainer>
    </MainContent>
  );
}
