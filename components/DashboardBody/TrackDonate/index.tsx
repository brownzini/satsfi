import SvgModel from "@/utils/svg";
import { 
    AmountArea,
    Body,
    Container,
    ContentContainer,
    DescriptionArea,
    DescriptionTitle,
    DonationCard,
    Header,
    MessageBoxContainer,
    NameArea,
    NameTitle,
    PriceArea,
    PriceTitle,
    SatoshiSvgArea,
    WrapperDonationCard,
} from "./styles";

export default function TrackDonate () {
    return (
        <Container className="flex fd"> 
            <MessageBoxContainer></MessageBoxContainer>
            <ContentContainer className="flex">
                <DonationCard>
                    <WrapperDonationCard className="flex fd">
                        <Header>
                            <NameArea>
                                <NameTitle> Anonimo </NameTitle>
                            </NameArea>
                            <AmountArea className="flex">
                                <PriceArea>
                                    <PriceTitle>1,200 sats</PriceTitle>
                                </PriceArea>
                            </AmountArea>
                        </Header>
                        <Body className="flex">
                            <DescriptionArea>
                                <DescriptionTitle>
                                    Bom dia meu nobre, to aqui mandando essa contribuição pra ajudar na consagração ta ligado ? Manda salve
                                </DescriptionTitle>
                            </DescriptionArea>
                        </Body>
                    </WrapperDonationCard>
                </DonationCard>
            </ContentContainer>
        </Container>
    );
} 