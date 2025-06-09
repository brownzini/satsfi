import React from "react";

interface MessageContextValue {
  message: string;
  setMessage: (msg: string) => void;
  status: boolean;
  setStatus: (param: boolean) => void;
  isSucess: boolean;
  setIsSucess: (param: boolean) => void;
  dispatchMessage: (msg: string, type: boolean, time?: number) => void;
  btcPrice: number;
  setBtcPrice: React.Dispatch<React.SetStateAction<number>>;
}

interface Props {
  children: React.ReactNode;
}

const listInitial: MessageContextValue = {
  btcPrice: 0,
  setBtcPrice: (param) => {},
  message: "Salvo com sucesso!!",
  setMessage: (param) => {},
  status: false,
  setStatus: (param) => {},
  isSucess: false,
  setIsSucess: (param) => {},
  dispatchMessage: (msg, type, time) => {},
};

const MessageContext = React.createContext<MessageContextValue>(listInitial);

export function MessageProvider({ children }: Props) {
  const [btcPrice, setBtcPrice] = React.useState<number>(0);
  const [status, setStatus] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("Salvo com sucesso!!");
  const [isSucess, setIsSucess] = React.useState<boolean>(false);

  const dispatchMessage = (msg: string, type: boolean, time: number = 4000) => {
    setIsSucess(type);
    setMessage(msg);
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, time);
  };

  return (
    <MessageContext.Provider
      value={{
        status,
        setStatus,
        message,
        setMessage,
        isSucess,
        setIsSucess,
        dispatchMessage,
        btcPrice,
        setBtcPrice,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = React.useContext(MessageContext);

  const {
    status,
    setStatus,
    message,
    setMessage,
    isSucess,
    setIsSucess,
    dispatchMessage,
    btcPrice,
    setBtcPrice,
  } = context;

  return {
    status,
    setStatus,
    message,
    setMessage,
    isSucess,
    setIsSucess,
    dispatchMessage,
    btcPrice,
    setBtcPrice,
  };
}
