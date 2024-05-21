import React from "react";

type FieldScreen = {
    status: boolean;
    name: string;
}

type ScreenProp = {
    initial:FieldScreen;
    importKey:FieldScreen;
    overview: FieldScreen;
    config: FieldScreen;
    survey: FieldScreen;
    test: FieldScreen;
    trackDonate: FieldScreen;
    qrCode: FieldScreen;
    call: FieldScreen;
    generateKey: FieldScreen;
    blackList: FieldScreen;
    chromaKey: FieldScreen;
}

interface HeaderContextValue {
    screens:ScreenProp;
    setScreens: React.Dispatch<React.SetStateAction<ScreenProp>>;
}

interface Props {
    children: React.ReactNode;
}

const listInitial: HeaderContextValue = {
    screens: {
        initial: { status: true, name: 'Initial' },
        importKey: { status: false, name: 'ImportKey' },
        overview: { status: false, name: 'Visão Geral' },
        config: { status: false, name: 'Configurar Donate' },
        survey: { status: false, name: 'Enquete' },
        test: { status: false, name: 'Testar' },
        trackDonate: { status: false, name: 'Acompanhar Doações' },
        qrCode: { status: false, name: 'QR Code' },
        call: { status: false, name: 'Chamadas Ao Vivo' },
        generateKey: { status: false, name: 'Minha Chave' },
        blackList: { status: false, name: 'Bloquear Palavra' },
        chromaKey: { status: false, name: 'Chroma Key' },
    },
    setScreens: param => {},
};

const HeaderContext = React.createContext<HeaderContextValue>(listInitial);

export function HeaderProvider({ children }: Props) {

    const [screens, setScreens] = React.useState<ScreenProp>({
        initial: { status: true, name: 'Initial' },
        importKey: { status: false, name: 'ImportKey' },
        overview: { status: false, name: 'Visão Geral' },
        config: { status: false, name: 'Configurar Donate' },
        survey: { status: false, name: 'Enquete' },
        test: { status: false, name: 'Testar' },
        trackDonate: { status: false, name: 'Acompanhar Doações' },
        qrCode: { status: false, name: 'QR Code' },
        call: { status: false, name: 'Chamadas Ao Vivo' },
        generateKey: { status: false, name: 'Minha Chave' },
        blackList: { status: false, name: 'Bloquear Palavra' },
        chromaKey: { status: false, name: 'Chroma Key' },
    });

    return (
        <HeaderContext.Provider value={{ screens, setScreens }}>
            {children}
        </HeaderContext.Provider>
    );
}

export function useHeader() {
    const context = React.useContext(HeaderContext);

    const { screens, setScreens, } = context;

    return { screens, setScreens, };
}