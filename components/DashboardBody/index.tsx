import {
    Body,
    Wrapper,
} from "./styles";

//Screens
import Initial from "./Initial";
import ImportKey from "./ImportKey";
import Overview from "./Overview";
import Config from "./Config";
import CustomizeDonation from "./CustomizeDonation";

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
                <CustomizeDonation />
            </Wrapper>
        </Body>
    );
}