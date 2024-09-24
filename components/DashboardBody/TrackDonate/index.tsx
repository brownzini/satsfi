import {
    Container,
    ContentContainer,
    DonationCard,
} from "./styles";

//Components
import Card from "./Card";

//Utils
import { useData } from "@/contexts/useData";

export default function TrackDonate() {

    const { data, removeLastDonate } = useData();

    return (
        <Container className="flex fd">
            <ContentContainer className="flex">
                <DonationCard onClick={() => removeLastDonate()}>
                    {data.trackDonate.length > 0 &&
                        data.trackDonate.map((donate, index) => (
                            <Card 
                                key={index}
                                name={donate.name}
                                amount={donate.amount}
                                description={donate.description}
                            /> 
                        ))
                    }
                </DonationCard>
            </ContentContainer>
        </Container>
    );
} 