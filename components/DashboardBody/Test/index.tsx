import { useState } from "react";

import {
    ButtonArea,
    Container,
    ControlArea,
    MessageButton,
    SaveButton,
} from "./style";

//Components
import Field from "../Field";

//Svg
import SvgModel from "@/utils/svg";

//Context
import { useData } from "@/contexts/useData";
import { useMessage } from "@/contexts/useMessage";

export default function Test() {

    const { data, updateData } = useData();

    const [keyHub, handle] = data.generateKey.keyHub.split("|");

    const normalLink = "https://satsfi.com.br/donates/"+handle+"-"+keyHub;
    const surveyLink = 'https://satsfi.com.br/survey/'+handle+"-"+keyHub;
    const chromakeyLink = 'https://satsfi.com.br/background/'+handle+"-"+keyHub;

    const [allow, setAllow] = useState<boolean>(data.test.allow);

    const { dispatchMessage } = useMessage();

    function copyNormalWidgetToClipboard() {
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(normalLink).then(function () {
            dispatchMessage('Link copiado com sucesso!', true, 2000);
        }, function (err) {
            dispatchMessage('Erro ao copiar o texto: ', false), 2000;
        });
    }

    function copyWidgetToClipboard() {
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(surveyLink).then(function () {
            dispatchMessage('Link copiado com sucesso!', true, 2000);
        }, function (err) {
            dispatchMessage('Erro ao copiar o texto: ', false), 2000;
        });
    }

    function copyChromaToClipboard() {
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(chromakeyLink).then(function () {
            dispatchMessage('Link copiado com sucesso!', true, 2000);
        }, function (err) {
            dispatchMessage('Erro ao copiar o texto: ', false), 2000;
        });
    }

    const handleSave = () =>
        updateData('test', { allow: allow });


    return (
        <Container className="flex">
            <ControlArea className="flex fd">
                <Field
                    type="title"
                    center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;

                                @media only screen and (min-width: 2560px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1600px) {
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1300px) {
                                    height: 7%;
                                    align-items: flex-end;
                                }
                            `}
                    text="Widget Donate normal:"
                    styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                            padding-right:0%;
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
                            width: 87.1%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${true ? '#6a5212' : 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 1%;

                            @media only screen and (min-height: 900px) {
                                font-size: 2rem;
                                padding-right:0%;
                            }

                            outline:none;
                            user-select: none;

                            cursor:pointer;
                    `}
                    inputType="text"
                    inputValue={normalLink}
                    onClick={copyNormalWidgetToClipboard}
                />
                <Field
                    type="title"
                    center={`
                        height: 10%;
                        justify-content: flex-start;
                        padding-left: 12%;
                    `}
                    text="Widget Enquete:"
                    styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                            padding-right:0%;
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
                            width: 87.1%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${true ? '#6a5212' : 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 1%;

                            @media only screen and (min-height: 900px) {
                                font-size: 2rem;
                                padding-right:0%;
                            }

                            outline:none;
                            user-select: none;

                            cursor:pointer;
                    `}
                    inputType="text"
                    inputValue={surveyLink}
                    onClick={copyWidgetToClipboard}
                />
                <Field
                    type="title"
                    center={`
                        height: 12%;
                        justify-content: flex-start;
                        padding-left: 12%;
                    `}
                    text="Link do Chroma Key:"
                    styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                            padding-right:0%;
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
                            width: 87.1%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${true ? '#6a5212' : 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 1%;

                            @media only screen and (min-height: 900px) {
                                font-size: 2rem;
                                padding-right:0%;
                            }

                            outline:none;
                            user-select: none;

                            cursor:pointer;
                    `}
                    inputType="text"
                    inputValue={chromakeyLink}
                    onClick={copyChromaToClipboard}
                />
            </ControlArea>
        </Container>
    );
}