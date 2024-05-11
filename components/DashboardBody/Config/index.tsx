import { useState } from "react";
import {
    Amounts,
    Container,
    Setups,
    WrapperContainer,
} from "./styles";
import Field from "../Field";

export default function Config() {
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
                            color: #3C5774;
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
                        `}
                        styler={`
                            width: 70%;
                            height: 100%;

                            border-radius: 5px;

                            color: #6a5212;
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 10%;
                        `}
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
                    />
                    <br />
                    <br />
                    <Field
                        type="button"
                        center={`
                            width: 100%;
                            height: 20%;
                            justify-content: flex-start;
                           
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
                    />
                </Amounts>
                <Setups className="flex fd">
                    <Field
                        type="title"
                        signal="%"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        text="Volume do alerta"
                        styler={`
                            color: #3C5774;
                            font-size: 1.2rem;
                            font-family: "Inter";
                            font-weight: bold;
                        `}
                    />
                    <Field
                        type="slider"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        styler={`
                          
                        `}
                    />
                    <br />
                    <Field
                        type="title"
                        signal="s"
                        text="Duração dos donates"
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
                    <Field
                        type="slider"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        durationMin="1"
                        durationMax="15"
                        styler={`
                          
                        `}
                    />
               
                    <Field
                        type="title"
                        text="Estilizar por quantia"
                        center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                        styler={`
                            width:70%;
                            color: #3C5774;
                            font-size: 1.4rem;
                            font-family: "Inter";
                            font-weight: bold;
                        `}
                    />                    
                    <Field
                        type="button"
                        center={`
                            width: 100%;
                            height: 20%;
                            justify-content: flex-start;
                           
                        `}
                        text="Alterar"
                        styler={`
                            width: 70%;
                            height: 70%;
                            color: white;
                            font-size: 1.4rem;
                            font-family: 'Poppins';
                            font-weight: bold;

                            border: none;
                            border-radius: 5px;
                            background-color: #3B1170;

                            transition: 1s;

                            &:hover {
                                background-color: #8140cf;
                            }

                            cursor:pointer;
                        `}
                    />
                </Setups>
            </WrapperContainer>
        </Container>
    );
}