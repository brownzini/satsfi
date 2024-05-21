import {
    Body,
    RenderingContainer,
    Wrapper,
} from "./styles";

//Screens
import Initial from "./Initial";
import ImportKey from "./ImportKey";
import Overview from "./Overview";
import Config from "./Config";
import Survey from "./Survey";
import Test from "./Test";
import TrackDonate from "./TrackDonate";
import QRCode from "./QRCode";
import Call from "./Call";
import GenerateKey from "./GenerateKey";
import BlackList from "./BlackList";
import ChromaKey from "./ChromaKey";

//Components
import MessageArea from "./MessageArea";
import { useHeader } from "@/contexts/useHeader";
import { useEffect, useState } from "react";

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

export default function DashboardBody() {

    const { screens } = useHeader();

    const [noBorder, setNoBorder] = useState<boolean>(true);
    const [overviewBorderDatail, setOverviewBorderDatail] = useState<string>('');

    const renderingJSX = (page: string) => {
        switch (page) {
            case 'test': return (<Test />);
            case 'call': return (<Call />);
            case 'config': return (<Config />);
            case 'survey': return (<Survey />);
            case 'qrCode': return (<QRCode />);
            case 'blackList': return (<BlackList />);
            case 'chromaKey': return (<ChromaKey />);
            case 'trackDonate': return (<TrackDonate />);
            case 'generateKey': return (<GenerateKey />);
            case 'importKey': return (<ImportKey />);
            case 'overview': return (<Overview />);
            case 'initial': return (<Initial />);
        }
    }

    const renderActiveScreen = (screen: string) => {
        return <RenderingContainer
            key={screen}
            className="flex"
        >
            {renderingJSX(screen)}
        </RenderingContainer>
    }

    const haveBorderInScreen = (screen: string) => setNoBorder((screen === 'initial' || screen === 'importKey'));

    useEffect(() => {
        const getScreen = () =>
            Object.keys(screens).map((screen) => (screens[screen as keyof ScreenProp].status) ? haveBorderInScreen(screen) : '');

        const overViewDetail = () => {
            Object.keys(screens).map((screen) => {
                if (screens[screen as keyof ScreenProp].status) {
                    const isOverviewScreen = (screen === 'overview');
                    setOverviewBorderDatail((isOverviewScreen) ?
                        `     border-left: 1px solid #E2DEF9;
                        border-right: 1px solid #E2DEF9;
                        border-bottom: 1px solid #E2DEF9;
                  ` : ' border: 1px solid #E2DEF9; ')
                }
            })
        }
        getScreen();
        overViewDetail();
    }, [screens]);

    return (
        <Body className="flex fd">
            <MessageArea />
            <Wrapper
                className="flex"
                styles={(noBorder) ? `
                    border:none;
                    background-color:white;
                ` : overviewBorderDatail}
            >
                {Object.keys(screens).map((screen) => (screens[screen as keyof ScreenProp].status) && renderActiveScreen(screen))}
            </Wrapper>
        </Body>
    );
}