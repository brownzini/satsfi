import {
    Body,
    Wrapper,
} from "./styles";

//Screens
import Initial from "./Initial";
import ImportKey from "./ImportKey";

export default function DashboardBody() {
    const conditionBorderRadius = (condition: boolean) =>  
        (condition)
           ? ' border-radius: 7px; '
           : ` border-top-left-radius: 7px;
               border-bottom-left-radius: 7px;
             `;
    return (
        <Body className="flex">
            {/* <Initial /> */}
            {/* <ImportKey /> */}
            <Wrapper styles={
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