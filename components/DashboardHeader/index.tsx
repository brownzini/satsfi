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

export default function DashboardHeader() {

    const [screenStatus, setScreenStatus] = useState<boolean>(false);   

    const { screens, setActiveScreen } = useHeader();

    useEffect(() => {
        setScreenStatus((screens.initial.status || screens.importKey.status));
    }, [screens]);

    return (
        <Header className="flex">
            <WrapperLogoArea className="flex">
                <Logo>SatsFI</Logo>
            </WrapperLogoArea>
            <OptionsArea className="flex">
                {(!screenStatus) &&
                    Object.keys(screens).map(screen => (screen !== 'initial' && screen !== 'importKey') && (
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