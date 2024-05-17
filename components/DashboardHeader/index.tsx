import { useState } from "react";
import {
    Header,
    WrapperLogoArea,
    Logo,
    OptionsArea,
    OptionArea,
    OptionTitle,
    SvgContainer,
    TooltipText,
} from "./styles";
import SvgModel from "@/utils/svg";

type FieldScreen = {
     status: boolean;
     name: string;
}

type ScreenProp = {
     overview: FieldScreen;
     config: FieldScreen;
     survey: FieldScreen;
     test: FieldScreen;
     trackDonate: FieldScreen;
     qrCode: FieldScreen;
     call: FieldScreen;
     generateKey: FieldScreen;
}

export default function DashboardHeader() {
    const [screens, setScreens] = useState<ScreenProp>({
        overview: { status: false, name: 'Visão Geral' },
        config: { status: true, name: 'Configurar Donate' },
        survey: { status: false, name: 'Enquete' },
        test: { status: false, name: 'Testar' },
        trackDonate: { status: false, name: 'Acompanhar Doações' },
        qrCode: { status: false, name: 'QR Code' },
        call: { status: false, name: 'Chamadas Ao Vivo' },
        generateKey: { status: false, name: 'Minha Chave' },
    });

    const setActiveScreen = (activeScreen: keyof ScreenProp) => {
        setScreens(prevScreens => {
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
        <Header className="flex">
            <WrapperLogoArea className="flex">
                <Logo>SatsFI</Logo>
            </WrapperLogoArea>
            <OptionsArea className="flex">
                {Object.keys(screens).map(screen => (
                    <OptionArea
                        key={screen}
                        className="flex"
                        width={(screens[screen as keyof ScreenProp].status) ? '50%' : '10%'}
                        last={screens[screen as keyof ScreenProp].name === 'Minha Chave' ? 'white' : '#DADEDE'}
                        onClick={() => setActiveScreen(screen as keyof ScreenProp)}
                    >
                        {(screens[screen as keyof ScreenProp].status) ? (
                            <SvgContainer
                                className="flex"
                                isselected={(screens[screen as keyof ScreenProp].status) ? 'opacity: 1;' : 'opacity: 0.5;'}
                            >
                                <SvgModel
                                    name={screen}
                                    width="16%"
                                    height="50%"
                                />

                                <OptionTitle>
                                    {screens[screen as keyof ScreenProp].name}
                                </OptionTitle>
                            </SvgContainer>
                        ) : (
                            <SvgContainer
                                className="tooltip flex"
                                isselected={(screens[screen as keyof ScreenProp].status) ? 'opacity: 1;' : 'opacity: 0.5;'}
                            >
                                <SvgModel
                                    name={screen}
                                    width="75%"
                                    height="100%"
                                />
                                <TooltipText className="tooltiptext">
                                    {screens[screen as keyof ScreenProp].name}
                                </TooltipText>
                            </SvgContainer>
                        )}
                    </OptionArea>
                ))}
            </OptionsArea>
        </Header>
    );
}