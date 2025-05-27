import io from "socket.io-client";

interface Props {
  handle: string;
  setUsername: (username: string) => void;
  setEndCallHash: (endCallHash: string) => void;
  setStartCallHash: (startCallHash: string) => void;
  setIsCalling: (isCalling: boolean) => void;
  setFinishedCall: (finishedCall: boolean) => void;
}
export function streamerSocket({
  handle,
  setUsername,
  setStartCallHash,
  setEndCallHash,
  setIsCalling,
  setFinishedCall,
}: Props) {
  const socket = io(process.env.NEXT_PUBLIC_MESSENGER_URL, {
    transports: ["websocket"],
    auth: {
      keyHub: handle,
      handle,
    },
  });

  socket.on("connect", () => {});

  socket.on(handle + "_connected_in_call", (data) => {
    const dataUnparsed = JSON.parse(data);
    const keyHubFromServer = dataUnparsed.username;
    if (dataUnparsed.msg === "start_call") {
        setUsername(keyHubFromServer);
        setStartCallHash(dataUnparsed.startCallHash);
        setEndCallHash(dataUnparsed.endCallHash);
        setIsCalling(true);
    }

  });

  socket.on(handle + "_queue_list", (data) => {
    const dataUnparsed = JSON.parse(data);
    const username = dataUnparsed.username;
    if (dataUnparsed.msg === "finished_call" && username === handle) {
        setFinishedCall(true);
    }
  });

  socket.on("disconnect", (msg) => {});

  socket.on("connect_error", (err) => {});

  return socket;
}
