import {
    Container,
} from "./styles";

//Components
import DashboardHeader from "../DashboardHeader";
import DashboardBody from "../DashboardBody";
import { HeaderProvider } from "@/contexts/useHeader";

export default function DashboardArea() {
    return (
        <Container className="flex fd">
            <HeaderProvider>
                <DashboardHeader />
                <DashboardBody />
            </HeaderProvider>
        </Container>
    );
}