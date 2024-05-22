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

//Components
import Field from "../Field";

import { useData } from "@/contexts/useData";
import { useMessage } from "@/contexts/useMessage";

export default function Config() {

    const { data, updateData } = useData();
    
    const [minAmount, setMinAmount] = useState<string>(data.config.minDonate);
    const [allowDonate, setAllowDonate] = useState<boolean>(data.config.allow);
    const [donationVolume, setDonationVolume] = useState<number>(data.config.alertVolume);
    const [durationDonate, setDurationDonate] = useState<number>(data.config.durationAlert);

    const [haveError, setHaveError] = useState<boolean>(false);

    const { dispatchMessage } = useMessage();

    const notChanged = () => {
        const validateMinAmount   = (data.config.minDonate ===  minAmount);
        const validateAllowDonate = (data.config.allow ===  allowDonate);
        const validateDonationVolume = (data.config.alertVolume === donationVolume);
        const validateDurationDonate = (data.config.durationAlert === durationDonate);

        return (validateMinAmount && validateAllowDonate && 
               (validateDonationVolume && validateDurationDonate));
    }

    const validationField = () => {
        const hasNotChanged = notChanged();
        const priceFiltered = parseInt(minAmount.replace(/[,.]/g, ""));
        if(minAmount === '' || Number.isNaN(priceFiltered)) {
            setMinAmount('Preencha o campo');
            setHaveError(true);
        } else if(priceFiltered < 1000 ) {
            setMinAmount('Valor minimo é de 1,000 sats');
            setHaveError(true);
        } else if(!hasNotChanged) {
                  updateData('config', {
                    allow: allowDonate,
                    minDonate: minAmount,
                    alertVolume: donationVolume,
                    durationAlert: durationDonate,
                  });
                  dispatchMessage('[SUCESSO]: Alterações salvas', true, 3000);
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

                            @media only screen and (min-height: 900px) {
                                height: 20%;
                            }
                        `}
                        text="Mínimo de satoshi por donate"
                        styler={`
                            transition: 0.5s ease;
                            color: ${(!haveError) ? '#3C5774': 'red'};
                            font-size: 1.2rem;
                            font-family: "Inter";
                            font-weight: bold;

                            @media only screen and (min-height: 900px) {
                                font-size: 2rem;
                            }
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

                            @media only screen and (min-height: 900px) {
                                font-size: 1.6rem;
                            }
                        `}
                         inputType="price"
                         onClick={hiddeError}
                         inputValue={minAmount}
                         setInputValue={setMinAmount}
                         disabled={(!allowDonate)}
                         placeholder="Minimo de 1,000 Sats"
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

                            @media only screen and (min-height: 900px) {
                                font-size: 2rem;
                            }
                        `}
                    />
                    <Field
                        type="toggle"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
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

                            @media only screen and (min-height: 900px) {
                                font-size: 2rem;
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

                                @media only screen and (min-height: 900px) {
                                    font-size: 2rem;
                                }

                                @media only screen and (max-width: 1599px) {
                                    font-size: 1.6rem;
                                }
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
                        disabled={(!allowDonate)}
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

                                @media only screen and (min-height: 900px) {
                                    font-size: 2rem;
                                }

                                @media only screen and (max-width: 1599px) {
                                    font-size: 1.6rem;
                                }
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
                         disabled={(!allowDonate)}
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