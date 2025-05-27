import { useCall } from "@/contexts/useCall";
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
  RecivedCallsTotalSubTitleArea,
  RecivedCallsTotalTitleArea,
} from "./styles";
import InCall from "../InCall";
import { useState } from "react";

interface Props {
  handle:string;
}

export default function IntialCall({ handle }:Props) {
  const { isCalling, setIsCalling, inCall } = useCall();
  const [ callsToday, setCallsToday ] = useState<number>(0);

  function addCallToday() {
    setCallsToday(callsToday+1);
  }

  return (
    <MainContainer className="flex fd">
      <CallHeader className="flex">
        <CallsTotal className="flex">
          <CallsTotalTitleArea
            className="flex"
            onClick={() => setIsCalling(!isCalling)}
          >
            <CallsTotalTitle>
              Chamadas <br /> recebidas Hoje
            </CallsTotalTitle>
          </CallsTotalTitleArea>
          <CallsTotalSubTitleArea className="flex">
            <CallsTotalSubTitle>{callsToday}</CallsTotalSubTitle>
          </CallsTotalSubTitleArea>
        </CallsTotal>

        <RecivedCallsTotal className="flex fd">
          <RecivedCallsTotalTitleArea className="flex">
            <CallsTotalTitle>Último a fazer uma ligação</CallsTotalTitle>
          </RecivedCallsTotalTitleArea>
          <RecivedCallsTotalSubTitleArea className="flex">
            <CallsTotalSubTitle>Edinaldo Pereira</CallsTotalSubTitle>
          </RecivedCallsTotalSubTitleArea>
        </RecivedCallsTotal>
      </CallHeader>
      <CallBody className="flex">
        {isCalling || inCall ? (
          inCall && !isCalling ? (
            <InCall />
          ) : (
            <ViewerCalling addCallToday={addCallToday} handle={handle} />
          )
        ) : (
          <NoCallMessage>Nenhuma ligação recebida até o momento</NoCallMessage>
        )}
      </CallBody>
    </MainContainer>
  );
}
