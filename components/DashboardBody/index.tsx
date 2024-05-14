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
            </Wrapper>
        </Body>
    );
}