import ViewerCalling from "../ViewerCalling";
import {
  CallBody,
  CallHeader,
  CallsTotal,
  CallsTotalSubTitle,
  CallsTotalSubTitleArea,
  CallsTotalTitle,
  CallsTotalTitleArea,
  MainContainer,
  NoCallMessage,
  RecivedCallsTotal,
  RecivedCallsTotalTitleArea,
} from "./styles";

export default function IntialCall() {
  return (
    <MainContainer className="flex fd">
      <CallHeader className="flex">
        <CallsTotal className="flex">
          <CallsTotalTitleArea className="flex">
            <CallsTotalTitle>
              Chamadas <br /> recebidas Hoje
            </CallsTotalTitle>
          </CallsTotalTitleArea>
          <CallsTotalSubTitleArea className="flex">
            <CallsTotalSubTitle>10</CallsTotalSubTitle>
          </CallsTotalSubTitleArea>
        </CallsTotal>

        <RecivedCallsTotal className="flex fd">
          <RecivedCallsTotalTitleArea className="flex">
            <CallsTotalTitle>Último a fazer uma ligação</CallsTotalTitle>
          </RecivedCallsTotalTitleArea>
          <CallsTotalSubTitleArea className="flex">
            <CallsTotalSubTitle>10</CallsTotalSubTitle>
          </CallsTotalSubTitleArea>
        </RecivedCallsTotal>
      </CallHeader>
      <CallBody className="flex">
        {false ? (
          <NoCallMessage>Nenhuma ligação recebida até o momento</NoCallMessage>
        ) : (
          <ViewerCalling />
        )}
      </CallBody>
    </MainContainer>
  );
}
