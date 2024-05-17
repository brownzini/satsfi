import {
    BodyArea,
    Button,
    ButtonArea,
    CardWrapper,
    ColorsArea,
    Content,
    ControlArea,
    DescriptionArea,
    FooterArea,
    FooterText,
    HeaderArea,
    HeaderText,
    ImageArea,
    Input,
} from "./styles";

import Field from "../Field";
import { useRef, useState } from "react";

import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function QRCodeScreen() {
    const [bgColor, setBgColor] = useState<string>('#ff8800');
    const [fontColor, setFontColor] = useState<string>('#ffffff');
    const [handle, setHandle] = useState<string>('Bananada');

    const divRef = useRef(null);

    const captureDivAsImage = () => {
        if (divRef.current) {
            html2canvas(divRef.current, {  backgroundColor: null,
                useCORS: true,
                scale: 1}).then(canvas => {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.imageSmoothingEnabled = false;
                }
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'satsfi-qrcode.png';
                link.click();
            });
        }
    };

    return (
        <Content className="flex">
            <ControlArea className="flex fd">
                <br /><br /><br />
                <Field
                    type="title"
                    center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                    text="Definir cores"
                    styler={`
                            transition: 0.5s ease;
                            color: #3C5774;
                            font-size: 1.6rem;
                            font-family: "Inter";
                            font-weight: bold;

                            @media only screen and (min-width: 2560px) {
                                font-size: 3rem;
                            }

                            @media only screen and (max-width: 1920px) {
                                font-size: 2.5rem;
                            }

                            @media only screen and (max-width: 1600px) {
                                font-size: 1.6rem;
                            }
                        `}
                />
                <br />
                <ColorsArea>
                    <Input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                    />
                    {' '}
                    <Input
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                    />
                </ColorsArea>
                <br />
                <DescriptionArea>
                    <Field
                        type="title"
                        center={`
                            height: 100%;
                            justify-content: flex-start;
                            padding-left: 12%;

                            @media only screen and (min-width: 2560px) {
                                height: 30%;
                            }
                        `}
                        text="ID da live"
                        styler={`
                            transition: 0.5s ease;
                            color: #3C5774;
                            font-size: 1.6rem;
                            font-family: "Inter";
                            font-weight: bold;

                            @media only screen and (min-width: 2560px) {
                                font-size: 3rem;
                            }

                            @media only screen and (max-width: 1920px) {
                                font-size: 2.5rem;
                            }

                            @media only screen and (max-width: 1600px) {
                                font-size: 1.6rem;
                            }
                        `}
                    />
                    <Field
                        type="input"
                        center={`
                                width: 100%;
                                height: 100%;
                                padding-left: 12%;

                                @media only screen and (min-width: 2560px) {
                                    height: 50%;
                                }
                            `}
                        styler={`
                                width: 100%;
                                height: 100%;
                                max-width: 340px;

                                @media only screen and (min-width: 2560px) {
                                    height: 70%;
                                    font-size: 2rem;
                                }

                                @media only screen and (max-width: 1920px) {
                                    font-size: 2rem;
                                }

                                @media only screen and (max-width: 1600px) {
                                    font-size: 1.6rem;
                                }
                                
                                border-radius: 5px;

                                color: #240C42;
                                font-family: "Roboto";
                                font-weight: 300;
                                font-size: 1.2rem;
                                font-style: italic;
                                transition: 0.5s ease;

                                padding-left: 5%;
                                outline:none;

                            `}
                        disabled
                        inputType="text"
                        inputValue={handle}
                        setInputValue={setHandle}
                    />
                </DescriptionArea>
                <br /><br />
                
                <ButtonArea>
                    <Button onClick={captureDivAsImage}>BAIXAR</Button>
                </ButtonArea>
            </ControlArea>
            <ImageArea
                ref={divRef}
                className="flex fd"
            >
                <CardWrapper 
                    className="flex fd"
                    styler={bgColor}
                >
                    <HeaderArea
                        className="flex"
                        bgcolor={bgColor}
                        fontcolor={fontColor}
                        fontSize="1rem"
                    >
                        <HeaderText>{'satsfi.com/' +'\n'+handle}</HeaderText>
                    </HeaderArea>
                    <BodyArea
                        id="body-area" 
                        className="flex"
                    >
                        <QRCode value={'www.satsfi.com/'+handle} />
                    </BodyArea>
                    <FooterArea
                        className="flex"
                        bgcolor={bgColor}
                        fontcolor={fontColor}
                        fontSize="0.93rem"
                    >
                        <FooterText>Contribua com sua doação</FooterText>
                    </FooterArea>
                </CardWrapper>
            </ImageArea>
        </Content>
    );
}