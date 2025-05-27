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
import { joinRoom } from "@/utils/call/joinRoom";

export default function InCall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [peer, setPeer] = useState<any>(null);

  useEffect(() => {
    // if (hasConnected) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return;
    }

    const peerConnection = createRoom({
      room_id: "123",
      setRemoteStream,
      ctx,
      canvas,
      volume: "100",
    });
    
    setPeer(peerConnection);
    // joinRoom({
    //   room_id: "123",
    //   setRemoteStream,
    //   ctx,
    //   canvas,
    //   volume: "100",
    // });

    // }
  }, []);

  function setRemoteStream(stream: any) {
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = stream;
    video.play();
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
              <ViewerName>Ronaldinho</ViewerName>
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
        <ButtonFooter>DESLIGAR CHAMADA</ButtonFooter>
      </FooterContainer>
    </MainContainer>
  );
}
