import { useState } from "react";
import {
    Amounts,
    Container,
    DescriptionArea,
    PercentArea,
    Setups,
    VolumeTitle,
    WrapperContainer,
} from "./styles";
import Field from "../Field";

export default function Config() {
    const [minAmount, setMinAmount] = useState<string>('');
    const [allowDonate, setAllowDonate] = useState<boolean>(false);
    const [donationVolume, setDonationVolume] = useState<number>(1);
    const [durationDonate, setDurationDonate] = useState<number>(1);

    const [haveError, setHaveError] = useState<boolean>(false);

    const validationField = () => {
        if(minAmount === '') {
            setMinAmount('Preencha o campo');
            setHaveError(true);
        } else if(parseInt(minAmount.replace(/[,.]/g, "")) < 1000 ) {
            setMinAmount('Valor minimo é de 1,000 sats');
            setHaveError(true);
        } else {
            console.log('sucesso');
        }
    }

    const hiddeError = () => {
        setHaveError(false);
    }

    return (
        <Container className="flex">
            <WrapperContainer className="flex">
                <Amounts className="flex fd">
                    <Field
                        type="title"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        text="Mínimo de satoshi por donate"
                        styler={`
                            transition: 0.5s ease;
                            color: ${(!haveError) ? '#3C5774': 'red'};
                            font-size: 1.2rem;
                            font-family: "Inter";
                            font-weight: bold;
                        `}
                    />
                    <Field
                        type="input"
                        center={`
                            width: 100%;
                            height: 10%;
                            padding-left: 12%;
                        `}
                        styler={`
                            width: 70%;
                            height: 100%;

                            border-radius: 5px;

                            color: ${(!haveError) ? '#6a5212': 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            transition: 0.5s ease;

                            padding-left: 5%;
                            outline:none;
                        `}
                         inputType="price"
                         inputValue={minAmount}
                         setInputValue={setMinAmount}
                         placeholder="Minimo de 1,000 Sats"
                         onClick={hiddeError}
                    />
                    <br />
                    <Field
                        type="title"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        text="Permitir donate por audio e IA"
                        styler={`
                            color: #3C5774;
                            font-size: 1.2rem;
                            font-family: "Inter";
                            font-weight: bold;
                        `}
                    />
                    <Field
                        type="toggle"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        text="Permitir donate por audio e IA"
                        styler={`
                    
                        `}
                        checked={allowDonate}
                        setChecked={setAllowDonate}
                    />
                    <br />
                    <br />
                    <Field
                        type="button"
                        center={`
                            width: 100%;
                            height: 20%;
                            justify-content: flex-start;
                            padding-left: 12%;
                           
                        `}
                        text="Salvar"
                        styler={`
                            width: 70%;
                            height: 70%;
                            color: white;
                            font-size: 1.4rem;
                            font-family: 'Poppins';
                            font-weight: bold;

                            border: none;
                            border-radius: 5px;
                            background-color: #07CCA1;

                            transition: 1s;

                            &:hover {
                                background-color: #11977a;
                            }

                            cursor:pointer;
                        `}
                        onClick={validationField}
                    />
                </Amounts>
                <Setups className="flex fd">
                    <DescriptionArea>
                        <Field
                            type="title"
                            center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding: 0;
                                padding-left: 12%;
                            `}
                            text="Volume do alerta:"
                            styler={`
                                color: #3C5774;
                                font-size: 1.2rem;
                                font-family: "Inter";
                                font-weight: bold;
                            `}
                        />
                        <PercentArea>
                            <VolumeTitle>{donationVolume}%</VolumeTitle>
                        </PercentArea>
                    </DescriptionArea>
                    <Field
                        type="slider"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        styler={`
                          
                        `}
                        durationMin="1"
                        durationMax="100"
                        value={donationVolume}
                        setValue={setDonationVolume}
                    />
                    <br />
                    <DescriptionArea>
                        <Field
                            type="title"
                            text="Duração dos donates:"
                            center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                            styler={`
                                color: #3C5774;
                                font-size: 1.2rem;
                                font-family: "Inter";
                                font-weight: bold;
                            `}
                        />
                        <PercentArea>
                            <VolumeTitle>{durationDonate}s</VolumeTitle>
                        </PercentArea>
                    </DescriptionArea>
                    <Field
                        type="slider"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        styler={`
                          
                        `}
                         durationMin="1"
                         durationMax="15"
                         value={durationDonate}
                         setValue={setDurationDonate}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                </Setups>
            </WrapperContainer>
        </Container>
    );
}