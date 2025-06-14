import { useCall } from "@/contexts/useCall";
import {
  ButtonsContainer,
  ConfirmButton,
  MainContainer,
  NameContainer,
  NameTitle,
  RejectButton,
} from "./styles";

import soundEffect from "@/utils/SoundEffect";
import { v4 as uuidv4 } from "uuid";
import { cleanQueue, updateQueueInCall } from "@/firebase/services/Queue";
import { useState } from "react";

interface Props {
  handle: string;
  addCallToday: () => void;
}

export default function ViewerCalling({ handle, addCallToday }: Props) {
  const {
    setIsCalling,
    setInCall,
    socket,
    setRoomId,
    username,
    startCallHash,
    endCallHash,
    setHasConnected,
  } = useCall();

  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmCall = async (handle: string) => {
    soundEffect("confirm");

    const room_id = uuidv4();
    setRoomId(room_id);

    localStorage.setItem("room_id", room_id);
    localStorage.setItem("username", username);
    localStorage.setItem("endHash", endCallHash);

    socket.emit(
      handle + "_connected_in_call",
      JSON.stringify({
        msg: "call_started",
        token: startCallHash,
        room_id,
        endCallHash: endCallHash,
      })
    );

    const actualDate = new Date();
    const dateWith10Min = new Date(actualDate.getTime() + 10 * 60000);

    await updateQueueInCall(handle, dateWith10Min.toString());

    setHasConnected(true);
    setInCall(true);
  };

  const handleRejectCall = async (handle: string) => {
    soundEffect("rejected");

    socket.emit(
      handle + "_queue_list",
      JSON.stringify({
        msg: "finished_call",
        token: startCallHash,
        username,
        cleanQueue: true,
      })
    );

    const list: any = [];
    await cleanQueue(handle, list);
  };

  async function handleCall(
    param: boolean,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (event.detail > 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10 * 1000);
      return;
    }

    if (!loading) {
      if (param) {
        await handleConfirmCall(handle);
      } else {
        await handleRejectCall(handle);
      }
      addCallToday();
      setIsCalling(false);
    }
  }
  return (
    <MainContainer className="flex fd">
      <NameContainer className="flex">
        <NameTitle className="dots">
          <b>{username ? username : "Alguém"} </b> <br />
          está te ligando<span className="loading-dots"></span>
        </NameTitle>
      </NameContainer>
      <ButtonsContainer className="flex">
        <ConfirmButton
          disabled={loading}
          onClick={async (event: any) => await handleCall(true, event)}
        >
          ATENDER
        </ConfirmButton>
        <RejectButton
          disabled={loading}
          onClick={async (event: any) => await handleCall(false, event)}
        >
          REJEITAR
        </RejectButton>
      </ButtonsContainer>
    </MainContainer>
  );
}
