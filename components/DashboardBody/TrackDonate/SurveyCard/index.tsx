import { 
    CardSurveyTitle,
    WrapperDonationCard, 
} from "./styles";

interface Props {
    name: string;
    amount:string;
    description:string;
}

export default function SurveyCard({ 
    name,
    amount,
    description,
    ...rest
 }:Props) {
    return (
        <WrapperDonationCard className="flex fd" {...rest}>
            <CardSurveyTitle>{name} criou uma enquete</CardSurveyTitle>
        </WrapperDonationCard>
    );
}