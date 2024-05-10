import { Body } from "./styles";

//Screens
import Initial from "./Initial";
import ImportKey from "./ImportKey";

export default function DashboardBody () {
    return (
        <Body className="flex">
            {/* <Initial /> */}
            <ImportKey />
        </Body>
    );
}