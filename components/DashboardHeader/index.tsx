import { useEffect, useState } from "react";

import {
    Header,
    WrapperLogoArea,
    Logo,
    OptionsArea,
    OptionArea,
} from "./styles";

//Component
import Option from "./Option";

//Contexts
import { useHeader } from "@/contexts/useHeader";

//Types
import { ScreenProp } from "@/utils/types";
import { useData } from "@/contexts/useData";

export default function DashboardHeader() {

    const [screenStatus, setScreenStatus] = useState<boolean>(false);   

    const { data } = useData();
    const { screens, setActiveScreen } = useHeader();

    const exceptionScreens = (screen:string) => (screen !== 'initial' && screen !== 'importKey');
    const filterScreen = (screens.generateKey.status && data.generateKey.keyHub === '' );

    useEffect(() => {
        setScreenStatus((screens.initial.status || screens.importKey.status || filterScreen));
    }, [screens]);

    return (
        <Header className="flex">
            <WrapperLogoArea className="flex">
                <Logo>SatsFI</Logo>
            </WrapperLogoArea>
            <OptionsArea className="flex">
                {(!screenStatus) &&
                    Object.keys(screens).map(screen => (exceptionScreens(screen)) && (
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
                    ))
                }
            </OptionsArea>
        </Header>
    );
}