import {
    Container,
} from "./styles";

//Components
import DashboardHeader from "../DashboardHeader";
import DashboardBody from "../DashboardBody";

//Contexts
import { HeaderProvider } from "@/contexts/useHeader";
import { DataProvider } from "@/contexts/useData";

export default function DashboardArea() {
    return (
        <Container className="flex fd">
            <HeaderProvider>
                <DataProvider>
                    <DashboardHeader />
                    <DashboardBody />
                </DataProvider>
            </HeaderProvider>
        </Container>
    );
}