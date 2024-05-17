import {
    Body,
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

//Components
import SvgModel from "@/utils/svg";
import MessageArea from "./MessageArea";

export default function DashboardBody() {
    const conditionBorderRadius = (condition: boolean) =>  
        (condition)
           ? ' border-radius: 7px; '
           : ` border-top-left-radius: 7px;
               border-bottom-left-radius: 7px;
               border-bottom-right-radius: 7px;
             `;
    return (
        <Body className="flex fd">
            {/* <Initial /> */}
            {/* <ImportKey /> */}
            {/* <Overview /> */}
            {/* <Config /> */}
            {/* <Survey /> */}
            {/* <Test /> */}
            {/* <TrackDonate /> */}
            {/* <QRCode /> */}
            {/* <Call /> */}
            {/* <GenerateKey /> */}
            <MessageArea />
            <Wrapper  
                className="flex" 
                styles={
                    conditionBorderRadius(true) + `
                    ${(false) && `
                        border:none;
                        background-color:white;
                    `}
                `
            }>
                 <iframe width="560" height="315" src="https://www.twitch.tv/blackmasksongoku" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Wrapper>
        </Body>
    );
}