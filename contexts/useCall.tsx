import { createContext, useContext, useState, ReactNode } from "react";

type InCallContextType = {
  isCalling: boolean;
  setIsCalling: (isCalling: boolean) => void;

  inCall: boolean;
  setInCall: (inCalling: boolean) => void;  

  username: string;
  setUsername: (username: string) => void;

  socket: any | null;
  setSocket: (socket: any | null) => void;

  room_id: string;
  setRoomId: (room_id: string) => void;

  startCallHash: string;
  setStartCallHash: (startCallHash: string) => void;

  endCallHash: string;
  setEndCallHash: (endCallHash: string) => void;

  hasConnected: boolean;
  setHasConnected: (hasConnected: boolean) => void;

  finishedCall: boolean;
  setFinishedCall: (finishedCall: boolean) => void;

  needReconnect: boolean;
  setNeedReconnect: (needReconnect: boolean) => void;
};

const InCallContext = createContext<InCallContextType | undefined>(undefined);

export const InCallProvider = ({ children }: { children: ReactNode }) => {

  const [room_id, setRoomId] = useState<string>("");

  const [finishedCall, setFinishedCall] = useState<boolean>(false);

  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [inCall, setInCall] = useState<boolean>(false);
  const [hasConnected, setHasConnected] = useState<boolean>(false);
  const [needReconnect, setNeedReconnect] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");

  const [startCallHash, setStartCallHash] = useState<string>("");
  const [endCallHash, setEndCallHash] = useState<string>("");

  const [socket, setSocket] = useState<any | null>(null);

  return (
    <InCallContext.Provider value={{ 
        isCalling, setIsCalling,
        inCall, setInCall,
        username, setUsername,
        startCallHash, setStartCallHash,
        endCallHash, setEndCallHash,
        socket, setSocket,
        room_id, setRoomId,
        hasConnected, setHasConnected,
        finishedCall, setFinishedCall,
        needReconnect, setNeedReconnect,
    }}>
      {children}
    </InCallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(InCallContext);
  if (!context) {
    throw new Error("useViewer deve ser usado dentro de um UserProvider");
  }
  return context;
};
