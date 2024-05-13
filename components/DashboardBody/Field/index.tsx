import { useState } from "react";

import {
    Button,
    Container,
    Input,
    SliderContainer,
    Switch,
    Title,
    ToggleInput,
} from "./styles";

interface Props {
    type: "title" | "input" | "toggle" | "slider" | "button" | "color";
    styler?: string;
    text?: string;
    center: string;
    signal?: string;

    value?: number;
    setValue?: (param:number) => void;
    durationMin?: string;
    durationMax?: string;

    maxLength?: number;
    inputType?: "price" | "text";
    inputValue?: string;
    placeholder?: string;
    setInputValue?: (param: string) => void;

    checked?: boolean;
    setChecked?: (param: boolean) => void;

    handleClick?: () => void;
    onClick?: () => void;
}

export default function Field({
    type,
    styler,
    text,
    center,
    signal,
    value,
    setValue,
    durationMin = "1",
    durationMax = "100",
    maxLength,
    inputType,
    inputValue,
    placeholder,
    setInputValue,
    checked,
    setChecked,
    handleClick,
    onClick,
    
}: Props) {
    const isPercentField = (text === 'Volume do alerta' || text === 'Duração dos donates');
    const tratedSginal = (signal) ? signal : '';

    const handleChange = () => {
        if ((checked !== undefined) && (setChecked)) {
            setChecked(!checked);
        }
    };

    const inputTypeFormater = (param: string) => {
        if (inputType && setInputValue) {
            if (inputType === 'price') {
                const isNan = Number.isNaN(parseInt(param));
                const recievePrice = (isNan) ? '0' : parseInt(param.replace(/[,.]/g, "")).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/^\$?\s?/g, '');
                const basePrice = recievePrice.slice(0, -3);
                setInputValue(basePrice);
            } else {
                if (maxLength) {
                    const textFilter = (param.length < maxLength) ? param : param.slice(0, -1);
                    setInputValue(textFilter);
                }
            }
        }
    }

    const handleChangeSlider = (param:string) => {
        if(setValue) {
            setValue(parseInt(param));
        }
    }

    const voidFunction = () => {};

    const renderingJSX = (type: string) => {
        if (!styler) return;
        switch (type) {
            case 'input':
                return <Input
                    type="text"
                    value={(inputValue) ? inputValue : ''}
                    styler={styler}
                    placeholder={(placeholder) ? placeholder : ''}
                    onChange={(e) => inputTypeFormater(e.target.value)}
                    onClick={(onClick) ? onClick : voidFunction}
                />
            case 'toggle':
                return (
                    <Switch>
                        <ToggleInput
                            type="checkbox"
                            checked={checked}
                            onChange={handleChange}
                        />
                        <span className="slider round"></span>
                    </Switch>
                )
            case 'button':
                return <Button
                    styler={styler}
                    onClick={() => console.log(text)}
                >
                    {text}
                </Button>
            case 'slider':
                return <SliderContainer>
                    <input
                        id="myRange"
                        type="range"
                        className="rangeSlider"
                        min={durationMin}
                        max={durationMax}
                        value={(value) ? value.toString() : ''}
                        onChange={(e) => handleChangeSlider(e.target.value)}
                    />
                </SliderContainer>
            default:
                return <Title
                    styler={styler}
                    onClick={handleClick}
                >
                    {text}{(isPercentField) ? `: ${value + tratedSginal}` : ''}
                </Title>
        }
    }

    return (
        <Container center={center}>
            {renderingJSX(type)}
        </Container>
    );
}