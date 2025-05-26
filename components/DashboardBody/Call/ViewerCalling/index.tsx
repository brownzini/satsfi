import {
  ButtonsContainer,
  ConfirmButton,
  MainContainer,
  NameContainer,
  NameTitle,
  RejectButton,
} from "./styles";

export default function ViewerCalling() {
  return (
    <MainContainer className="flex fd">
      <NameContainer className="flex">
        <NameTitle className="dots">
          <b>RONALDINHO </b> <br />
          está te ligando<span className="loading-dots"></span>
        </NameTitle>
      </NameContainer>
      <ButtonsContainer className="flex">
        <ConfirmButton>ATENDER</ConfirmButton>
        <RejectButton>REJEITAR</RejectButton>
      </ButtonsContainer>
    </MainContainer>
  );
}
