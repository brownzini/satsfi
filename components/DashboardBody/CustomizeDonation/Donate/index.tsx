import SvgModel from "@/utils/svg";
import { useState } from "react";
import Field from "../../Field";
import {
    Container,
    Header,
    AmountArea,
    SatoshiArea,
    ValueArea,
    Input,
    ArrowArea,
    Content,
    TopicArea,
    Visualization,
    CardModelWrapper,
    AudioNameArea,
    AudioTiitle,
    ConfirmationArea,
} from "./styles";
import AudioUploader from "../AudioUploader";

interface DonateProps {
    id: string;
    audio_name: string;
    amount: string;
}

interface Props {
    index: number;
    donate: DonateProps;
    removeDonate: (id: string) => void;
    handleChange: (index: number, field: keyof DonateProps, value: string) => void;
}

export default function Donate({
    index,
    donate,
    removeDonate,
    handleChange
}: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [controlAudio, setControlAudio] = useState<boolean>(true);
    const [buttonConfirmFocus, setButtonConfirmFocus] = useState<boolean>(false);

    const handleClickOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleCLickRemove = () => {
        return removeDonate(donate.id);
    }

    const handleFocus = () => {
        handleChange(index, 'amount', '');
        setButtonConfirmFocus(true);
    }

    const handleBlur = () => {
        setButtonConfirmFocus(false);

        const price = parseInt(donate.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        const basePrice = price.slice(0, -3);

        handleChange(index, 'amount', (price === '$NaN') ? ' 0' : basePrice.replace(/^\$?\s?/g, ''));
    }

    const handleSetAudioName = (fileName: string) => {
        handleChange(index, 'audio_name', fileName);
    }

    const handleClearAudio = () => {
        setControlAudio(false);
        handleChange(index, 'audio_name', '');
        setTimeout(() => {
            setControlAudio(true);
        }, 200);
    }

    const renderingAudioArea = () => {
        if (controlAudio) {
            return <AudioUploader
                audio_name={donate.audio_name}
                handleSetAudioName={handleSetAudioName}
                setControlAudio={setControlAudio}
            />
        } else {
            return <SvgModel
                name="audio"
                width="100%"
                height="100%"
            />
        }
    }

    return (
        <Container
            className="flex fd"
            styler={(isOpen) ? '50%' : '20%'}
        >
            <Header
                className="flex"
                styler={(isOpen) ? '25%' : '100%'}
            >
                <AmountArea className="flex">
                    <SatoshiArea>
                        <SvgModel
                            name="satoshi"
                            width="50%"
                            height="100%"
                            color="#F4B000"
                        />
                    </SatoshiArea>
                    <ValueArea>
                        <Input
                            type="text"
                            value={donate.amount}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            onChange={(e) => handleChange(index, 'amount', e.target.value.replace(/[,.]/g, ""))}
                        />
                    </ValueArea>
                    {buttonConfirmFocus &&
                        <ConfirmationArea>
                            <SvgModel
                                name="confirm"
                                width="100%"
                                height="100%"
                            />
                        </ConfirmationArea>
                    }
                </AmountArea>
                <ArrowArea className="flex">
                    <SvgModel
                        name="arrow"
                        width="50%"
                        height="100%"
                        setFunction={handleClickOpen}
                        rotate={(isOpen) ? '0deg' : '180deg'}
                    />
                    <SvgModel
                        name="delete"
                        width="30%"
                        height="100%"
                        setFunction={handleCLickRemove}
                    />
                </ArrowArea>
            </Header>

            <Content className="flex" styler={(isOpen) ? '75%' : '0%'}>
                <TopicArea className="flex fd">
                    {(isOpen) && <Field
                        type="title"
                        center={`
                        height: 10%;
                        justify-content: flex-start;
                        padding-left: 12%;
                    `}
                        text="Adicionar audio: "
                        styler={`
                        color: #3C5774;
                        font-size: 1.6rem;
                        font-family: "Inter";
                        font-weight: bold;
                    `}
                    />}
                    <br />
                    {(isOpen) &&
                        <Field
                            type="title"
                            center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                            text="(!) O audio só pode ter até 25s"
                            styler={`
                                color: #B368E1;
                                font-size: 1rem;
                                font-family: "Inter";
                                font-weight: bold;
                            `}
                        />}
                    <br />
                    {(isOpen) &&
                        <Field
                            type="title"
                            center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                            text="remover audio"
                            styler={`
                                color: #FF8585;
                                font-size: 1rem;
                                font-family: "Inter";
                                font-weight: bold;
                                cursor:pointer;

                                transition: 0.5s;

                                &:hover {
                                    color: #db2b2b;
                                }
                            `}
                            handleClick={handleClearAudio}
                        />
                    }
                </TopicArea>
                <Visualization className="flex">
                    <CardModelWrapper className="flex fd">
                        {(isOpen) &&
                            <AudioNameArea className="flex">
                                <AudioTiitle>
                                    {(donate.audio_name === '') ? 'Importar audio' : donate.audio_name}
                                </AudioTiitle>
                            </AudioNameArea>
                        }
                        {(isOpen) && renderingAudioArea()}
                    </CardModelWrapper>
                </Visualization>
            </Content>
        </Container>
    );

}