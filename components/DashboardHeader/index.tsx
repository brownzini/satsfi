import {
    Header,
    WrapperLogoArea,
    Logo,
    OptionsArea,
    WrapperOption,
    OptionArea,
} from "./styles";

import { useHeader } from "@/contexts/useHeader";
import Option from "./Option";

type FieldScreen = {
    status: boolean;
    name: string;
}

type ScreenProp = {
    initial: FieldScreen;
    importKey: FieldScreen;
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

export default function DashboardHeader() {

    const { screens, setScreens } = useHeader();

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
                {Object.keys(screens).map(screen => (screen !== 'initial' && screen !== 'importKey') && (
                    <OptionArea
                        key={screen}
                        className="flex"
                        width={(screens[screen as keyof ScreenProp].status) ? '50%' : '10%'}
                        last={(screens[screen as keyof ScreenProp].name) === 'Chroma Key' ? 'white' : '#DADEDE'}
                        onClick={() => setActiveScreen(screen as keyof ScreenProp)}
                    >
                        <Option
                            screen={screen}
                            name={screens[screen as keyof ScreenProp].name}
                            status={screens[screen as keyof ScreenProp].status}
                        />
                    </OptionArea>
                   
                ))}
                    </OptionsArea>
        </Header>
    );
}