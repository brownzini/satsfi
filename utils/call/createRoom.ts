import Peer from "peerjs";
import soundEffect from "../SoundEffect";

interface Props {
  room_id: string;
  setRemoteStream(stream: any): void;
  canvas: HTMLCanvasElement;
  volume: string;
  ctx: CanvasRenderingContext2D;
}

export function createRoom({
  room_id,
  setRemoteStream,
  ctx,
  canvas,
  volume,
}: Props) {
  
  let animationId: number;
  let audioCtx: AudioContext;
  let analyser: AnalyserNode;
  let dataArray: Uint8Array;

  let local_stream: MediaStream | null;

  const peer = new Peer(room_id, {
    host: process.env.NEXT_PUBLIC_CALL_HOST,
    port: 443,
    path: "/peerjs",
    secure: true,
    config: {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302", // Usando apenas STUN
        },
      ],
    },
  });

  peer.on("open", () => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: {
          echoCancellation: true, // Remove eco
          noiseSuppression: true, // Reduz o ruído
          autoGainControl: true, // Ajusta automaticamente o ganho do microfone
        },
      })
      .then((stream) => {
        local_stream = stream;
      })
      .catch((err) => {
        console.error("Erro ao acessar a câmera/microfone:", err);
      });
  });

  peer.on("call", (call) => {
    if (local_stream) call.answer(local_stream);
    call.on("stream", (stream) => {
      soundEffect("connected");

      setRemoteStream(stream);

      audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();

      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.8;

      const bufferLength = analyser.fftSize;
      dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      const draw = () => {
        animationId = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#2d9f6c";
        ctx.beginPath();

        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = (dataArray[i] - 128) / 128.0; // Normalizar entre -1 e 1
          const y = canvas.height / 2 + (v * canvas.height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      };

      draw();
    });
  });

  peer.on("close", () => {
    if (local_stream) {
      local_stream.getTracks().forEach((track) => track.stop());
      local_stream = null;
    }
  });

  peer.on("disconnected", () => {
    if (local_stream) {
      local_stream.getTracks().forEach((track) => track.stop());
      local_stream = null;
    }
  });

  return peer;
}
