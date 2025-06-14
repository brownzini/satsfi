import { useEffect, useRef, useState } from "react";
import {
  AudioContainer,
  BodyContainer,
  ButtonFooter,
  CanvasArea,
  FooterContainer,
  HeaderContainer,
  ImageArea,
  ImageContainer,
  ImageContent,
  MainContainer,
  Video,
  ViewerName,
  ViewerNameContainer,
  ViewerWrapperContainer,
} from "./styles";
import { createRoom } from "@/utils/call/createRoom";
import { useCall } from "@/contexts/useCall";
import soundEffect from "@/utils/SoundEffect";
import { cleanQueue } from "@/firebase/services/Queue";

interface Props {
  handle: string;
}

export default function InCall({ handle }: Props) {

  const {
    socket,
    room_id,
    username,
    endCallHash,
    setInCall,
    setIsCalling,
    setHasConnected,
    setUsername,
    setStartCallHash,
    setEndCallHash,
    setSocket,
  } = useCall();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [peer, setPeer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return;
    }

    const peerConnection = createRoom({
      room_id,
      setRemoteStream,
      ctx,
      canvas,
      volume: "100",
    });

    setPeer(peerConnection);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setRemoteStream(stream: any) {
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = stream;
    video.play();
  }

  async function handleFinish(event: React.MouseEvent<HTMLButtonElement>) {

    if (event.detail > 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10 * 1000);
      return;
    }

    soundEffect("disconnected");

    socket.emit(
      handle + "_queue_list",
      JSON.stringify({
        msg: "finished_call",
        token: endCallHash,
        username,
        cleanQueue: true,
      })
    );

    const list: any = [];
    await cleanQueue(handle, list);

    if (peer) {
      peer.disconnect();
      peer.destroy();
    }

    setUsername("");
    setInCall(false);
    setIsCalling(false);
    setHasConnected(false);
    setStartCallHash("");
    setEndCallHash("");
    setSocket(null);
    localStorage.removeItem("room_id");
    localStorage.removeItem("endHash");
  }

  return (
    <MainContainer className="flex fd">
      <Video ref={videoRef} height="0"></Video>
      <HeaderContainer>
        <ViewerWrapperContainer className="flex fd">
          <ImageContainer className="flex">
            <ImageArea className="flex">
              <ImageContent src="https://res.cloudinary.com/dqq4f9a1l/image/upload/v1747089059/guy_happy_sdt69p.png" />
            </ImageArea>
            <ViewerNameContainer className="flex">
              <ViewerName>{username ? username : "Alguém"}</ViewerName>
            </ViewerNameContainer>
          </ImageContainer>
        </ViewerWrapperContainer>
      </HeaderContainer>
      <BodyContainer className="flex">
        <AudioContainer>
          <CanvasArea ref={canvasRef} id="waveform" />
        </AudioContainer>
      </BodyContainer>
      <FooterContainer className="flex">
        <ButtonFooter
          onClick={async (event: React.MouseEvent<HTMLButtonElement>) =>
            await handleFinish(event)
          }
        >
          DESLIGAR CHAMADA
        </ButtonFooter>
      </FooterContainer>
    </MainContainer>
  );
}
