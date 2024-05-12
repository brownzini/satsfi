import SvgModel from "@/utils/svg";
import {
    AddArea,
    Container,
    AddContainer,
    WrapperBody,
    WrappedFooter,
    SaveButton,
    BackButton,
    AlertArea,
    MessageTitle,
} from "./styles";
import Donate from "./Donate";
import { useState } from "react";

interface DonateProps {
    id: string;
    audio_name: string;
    amount: string;
}

export default function CustomizeDonation() {
    const [donates, setDonates] = useState<DonateProps[]>([]);

    const addDonate = () => {
        setDonates(prevDonates => [
            ...prevDonates,
            { id: String(prevDonates.length + 1), audio_name: '', amount: '' }
        ]);
    };

    const handleChange = (index: number, field: keyof DonateProps, value: string) => {
        setDonates(prevDonates => {
            const updatedDonates = [...prevDonates];
            updatedDonates[index][field] = value;
            return updatedDonates;
        });
    };

    const removeDonate = (id: string) => {
        setDonates(prevDonates => prevDonates.filter(donate => donate.id !== id));
    };

    return (
        <Container className="flex fd">
            <AddContainer>
                <AddArea>
                    <SvgModel
                        name="add"
                        width="100%"
                        height="100%"
                        setFunction={addDonate}
                    />
                </AddArea>
                <AlertArea className="flex">
                        <MessageTitle>  </MessageTitle>
                </AlertArea>
            </AddContainer>

            <WrapperBody>
                {donates.length > 0 &&
                    donates.map((donate, index) => (
                        <Donate
                            key={index}
                            index={index}
                            donate={donate}
                            removeDonate={removeDonate}
                            handleChange={handleChange}
                        />
                    ))
                }
            </WrapperBody>
            <WrappedFooter>
                <BackButton>Voltar</BackButton>
                <SaveButton>Salvar</SaveButton>
            </WrappedFooter>
        </Container>
    );
}