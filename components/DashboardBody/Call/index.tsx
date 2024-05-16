import { useState } from "react";
import Field from "../Field";
import {
    Content,
    ControlArea,
    LinkArea
} from "./styles";

export default function Call() {
    const [allow, setAllow] = useState<boolean>(false);
    const [minAmount, setMinAmount] = useState<string>('12,000');
    const [haveError, setHaveError] = useState<boolean>(false);

    const link = 'https://www.google.com';

    const hiddeError = () => {
        setHaveError(false);
    }

    const voidFunction = (param:string) => { }

    const handleSave = () => {
        const priceFiltered = parseInt(minAmount.replace(/[,.]/g, ""));
    
        if(minAmount === '' || Number.isNaN(priceFiltered)) {
            setMinAmount('Preencha o campo');
            setHaveError(true);
        } else if(priceFiltered < 12000 ) {
            setMinAmount('Minimo é de 12,000 sats');
            setHaveError(true);
        } else {
            console.log('sucesso');
        }
    }

    function copyTextToClipboard() {
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(link).then(function () {
            alert('Link copiado com sucesso!');
        }, function (err) {
            console.error('Erro ao copiar o texto: ', err);
        });
    }

    return (
        <Content className="flex">
            <ControlArea className="flex fd">
                <Field
                    type="title"
                    text="Liberar chamada ao vivo:"
                    center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;

                                @media only screen and (min-height: 900px) {
                                    height: 16%;
                                }
                            `}
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
                    text="Permitir donate por audio e IA"
                    styler={`
                    
                        `}
                    checked={allow}
                    setChecked={setAllow}
                />
                <br />
                <Field
                    type="title"
                    text="Valor minimo:"
                    center={`
                        height: 10%;
                        justify-content: flex-start;
                        padding-left: 12%;
                    `}
                    styler={`
                        color: ${(!haveError) ? '#3C5774' : 'red'};
                        transition: 0.5s;
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
                        width: 75%;
                        height: 100%;

                        border-radius: 5px;

                        color: ${(!haveError) ? '#6a5212' : 'red'};
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
                    inputValue={minAmount}
                    setInputValue={setMinAmount}
                    placeholder="Minimo de 12,000 Sats"
                    onClick={hiddeError}
                />
            </ControlArea>
            <LinkArea className="flex fd">
                <Field
                    type="title"
                    text="Link para acessar:"
                    center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 25%;

                                @media only screen and (min-height: 900px) {
                                    height: 20%;
                                }
                            `}
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
                    type="input"
                    center={`
                            width: 100%;
                            height: 10%;
                            padding-left: 12%;
                            justify-content: center;
                        `}
                    styler={`
                            width: 70%;
                            height: 100%;

                            border-radius: 5px;

                            color: #6a5212;
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            transition: 0.5s ease;

                            padding-left: 5%;
                            outline:none;

                            cursor: pointer;
                            user-select:none;

                            @media only screen and (min-height: 900px) {
                                font-size: 1.6rem;
                            }
                        `}
                    inputType="price"
                    inputValue={link}
                    setInputValue={voidFunction}
                    onClick={copyTextToClipboard}
                />
                <br />
                <Field
                    type="button"
                    center={`
                            width: 100%;
                            height: 20%;
                            justify-content: center;
                            align-items: flex-end;
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

                            @media only screen and (min-height: 900px) {
                                font-size: 3rem;
                            }
                        `}
                    onClick={handleSave}
                />
            </LinkArea>
        </Content>
    );
}