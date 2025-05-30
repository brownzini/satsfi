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
  Audio,
} from "./styles";
import InCall from "../InCall";
import { useEffect, useState } from "react";

interface Props {
  handle:string;
}

export default function IntialCall({ handle }:Props) {

  const { isCalling, setIsCalling, inCall } = useCall();

  const [ callsToday, setCallsToday ] = useState<number>(0);
  const [ username, setUsername ] = useState<string>("");
  useEffect(() => {
      const usernameStringed = localStorage.getItem("username");
      setUsername((usernameStringed) ? usernameStringed : "");
  },[])

  function addCallToday() {
    setCallsToday(callsToday+1);
  }

  return (
    <MainContainer className="flex fd">

      {true && (
        <Audio autoPlay loop src={"/audio/calling.MP3"} />
      )}

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
            <CallsTotalTitle>{(username) ? "Último a fazer uma ligação" : "Não houve ligações"}</CallsTotalTitle>
          </RecivedCallsTotalTitleArea>
          {(username) &&
          <RecivedCallsTotalSubTitleArea className="flex">
            <CallsTotalSubTitle>{username}</CallsTotalSubTitle>
          </RecivedCallsTotalSubTitleArea>}
        </RecivedCallsTotal>
      </CallHeader>
      <CallBody className="flex">
        {isCalling || inCall ? (
          inCall && !isCalling ? (
            <InCall  handle={handle} />
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
