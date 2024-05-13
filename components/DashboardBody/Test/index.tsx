import { useState } from "react";
import Field from "../Field";
import {
    ButtonArea,
    Container,
    ControlArea,
    MessageButton,
    OptionArea,
    VoiceArea
} from "./style";
import SvgModel from "@/utils/svg";

export default function Test() {
    const widgetLink = 'https://www.teste.com';
    const [surveyStatus, setSurveyStatus] = useState<boolean>(false);

    function copyTextToClipboard() {
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(widgetLink).then(function () {
            alert('Link copiado com sucesso!');
        }, function (err) {
            console.error('Erro ao copiar o texto: ', err);
        });
    }

    return (
        <Container className="flex">
            <ControlArea className="flex fd">
                <Field
                    type="title"
                    center={`
                                height: 16%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                    text="Audio nas mensagens:"
                    styler={`
                                color: #3C5774;
                                font-size: 1.4rem;
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
                    styler={` `}
                    checked={surveyStatus}
                    setChecked={setSurveyStatus}
                />
                <br />
                <Field
                    type="title"
                    center={`
                                height: 16%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                    text="Link do widget:"
                    styler={`
                                color: #3C5774;
                                font-size: 1.4rem;
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
                            width: 87.1%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${true ? '#6a5212' : 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 1%;

                            outline:none;
                            user-select: none;

                            cursor:pointer;
                    `}
                    inputType="text"
                    inputValue={widgetLink}
                    onClick={copyTextToClipboard}
                />
                <ButtonArea className="flex">
                    <MessageButton className="flex">
                        <SvgModel
                            name="playIcon"
                            width="20%"
                            height="20%"
                        />
                        MENSAGEM
                    </MessageButton>
                    <MessageButton className="flex">
                        <SvgModel
                            name="playIcon"
                            width="20%"
                            height="20%"
                        />
                        ENQUETE
                    </MessageButton>
                </ButtonArea>
            </ControlArea>
        </Container>
    );
}