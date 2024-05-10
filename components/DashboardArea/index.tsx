import { 
    Container, 
} from "./styles";

//Components
import DashboardHeader from "../DashboardHeader";
import DashboardBody from "../DashboardBody";

export default function DashboardArea () {
    return (
        <Container className="flex fd">
            <DashboardHeader />
            <DashboardBody />
        </Container>
    );
}