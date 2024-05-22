import { 
    WrapperDonationCard, 
    NameTitle,
    Header,
    NameArea,
    AmountArea,
    PriceArea,
    Body,
    DescriptionArea,
    DescriptionTitle,
    PriceTitle, 
} from "./styles";

interface Props {
    name: string;
    amount:string;
    description:string;
}

export default function Card({ 
    name,
    amount,
    description,
    ...rest
 }:Props) {
    return (
        <WrapperDonationCard className="flex fd" {...rest}>
            <Header>
                <NameArea>
                    <NameTitle> {name} </NameTitle>
                </NameArea>
                <AmountArea className="flex">
                    <PriceArea>
                        <PriceTitle>{amount} sats</PriceTitle>
                    </PriceArea>
                </AmountArea>
            </Header>
            <Body className="flex">
                <DescriptionArea>
                    <DescriptionTitle>
                        {description}
                    </DescriptionTitle>
                </DescriptionArea>
            </Body>
        </WrapperDonationCard>
    );
}