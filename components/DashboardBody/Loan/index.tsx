import FormCampaign from "./FormCampaign";
import InitialCampaign from "./InitialCampaign";
import { LoanContainer } from "./style";

export default function Loan() {

    return (
        <LoanContainer className="flex fd">
            {/* <InitialCampaign /> */}
            <FormCampaign />
        </LoanContainer>
    );
}