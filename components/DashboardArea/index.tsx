import {
    Container,
} from "./styles";

//Components
import DashboardHeader from "../DashboardHeader";
import DashboardBody from "../DashboardBody";

//Contexts
import { HeaderProvider } from "@/contexts/useHeader";
import { DataProvider } from "@/contexts/useData";
import { ActiveWsProvider } from "@/contexts/useActiveWs";

export default function DashboardArea() {
    return (
        <Container className="flex fd">
            <HeaderProvider>
                <DataProvider>
                    <ActiveWsProvider>
                        <DashboardHeader />
                        <DashboardBody />
                    </ActiveWsProvider>
                </DataProvider>
            </HeaderProvider>
        </Container>
    );
}