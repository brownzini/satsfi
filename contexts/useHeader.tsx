import React from "react";

//Types
import { ScreenProp } from "@/utils/types";

interface HeaderContextValue {
  screens: ScreenProp;
  setScreens: React.Dispatch<React.SetStateAction<ScreenProp>>;
  setActiveScreen: (activeScreen: keyof ScreenProp) => void;
}

interface Props {
  children: React.ReactNode;
}

const listInitial: HeaderContextValue = {
  screens: {
    start: { status: false, name: "Inicializar Hub" },
    initial: { status: true, name: "Initial" },
    importKey: { status: false, name: "ImportKey" },
    overview: { status: false, name: "Visão Geral" },
    config: { status: false, name: "Configurar Donate" },
    survey: { status: false, name: "Enquete" },
    test: { status: false, name: "Widget" },
    trackDonate: { status: false, name: "Acompanhar Doações" },
    qrCode: { status: false, name: "QR Code" },
    call: { status: false, name: "Chamadas Ao Vivo" },
    generateKey: { status: false, name: "Minha Chave" },
    loan: { status: false, name: " Campanha" },
    chromaKey: { status: false, name: "Chroma Key" },
  },
  setScreens: (param) => {},
  setActiveScreen: (param) => {},
};

const HeaderContext = React.createContext<HeaderContextValue>(listInitial);

export function HeaderProvider({ children }: Props) {
  const [screens, setScreens] = React.useState<ScreenProp>({
    start: { status: false, name: "Inicializar Hub" },
    initial: { status: true, name: "Initial" },
    importKey: { status: false, name: "ImportKey" },
    overview: { status: false, name: "Visão Geral" },
    config: { status: false, name: "Configurar Donate" },
    survey: { status: false, name: "Enquete" },
    test: { status: false, name: "Widget" },
    trackDonate: { status: false, name: "Acompanhar Doações" },
    qrCode: { status: false, name: "QR Code" },
    call: { status: false, name: "Chamadas Ao Vivo" },
    chromaKey: { status: false, name: "Chroma Key" },
    loan: { status: false, name: " Campanha" },
    generateKey: { status: false, name: "Minha Chave" },
  });

  const setActiveScreen = (activeScreen: keyof ScreenProp) => {
    setScreens((prevScreens) => {
      const updatedScreens: ScreenProp = { ...prevScreens };
      for (const key in updatedScreens) {
        if (updatedScreens.hasOwnProperty(key)) {
          updatedScreens[key as keyof ScreenProp].status = key === activeScreen;
        }
      }
      return updatedScreens;
    });
  };

  return (
    <HeaderContext.Provider
      value={{
        screens,
        setScreens,
        setActiveScreen,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = React.useContext(HeaderContext);
  const { screens, setScreens, setActiveScreen } = context;
  return { screens, setScreens, setActiveScreen };
}
