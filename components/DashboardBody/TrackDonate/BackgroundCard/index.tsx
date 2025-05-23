import { 
    CardSurveyTitle,
    WrapperDonationCard, 
} from "./styles";

interface Props {
    name: string;
    amount:string;
    description:string;
}

export default function BackgroundCard({ 
    name,
    amount,
    description,
    ...rest
 }:Props) {
    return (
        <WrapperDonationCard className="flex fd" {...rest}>
            <CardSurveyTitle>{name} trocou seu background</CardSurveyTitle>
        </WrapperDonationCard>
    );
}