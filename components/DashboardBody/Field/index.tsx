import { useEffect, useState } from "react";
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
    type: "title" | "input" | "toggle" | "slider" | "button";
    styler?: string;
    text?: string;
    center: string;
    signal?:string;
    durationMin?:string;
    durationMax?:string;
}

export default function Field({
    type,
    styler,
    text,
    center,
    signal,
    durationMin = "1",
    durationMax = "100",
}: Props) {
    const [amount, setAmount] = useState<string>('1,200');
    const [checked, setChecked] = useState<boolean>(true);
    const [value, setValue] = useState<number>(1);

    const isPercentField = (text === 'Volume do alerta' || text === 'Duração dos donates');
    const tratedSginal = (signal) ? signal : '';

    const handleChange = () => {
        setChecked(!checked);
    };
    
    const renderingJSX = (type: string) => {
        if (!styler) return;
        switch (type) {
            case 'input':
                return <Input
                    type="text"
                    value={amount}
                    styler={styler}
                    onChange={(e) => setAmount(e.target.value)}
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
                             value={value.toString()}
                             onChange={(e) => setValue(parseInt(e.target.value))}
                        />
                       </SliderContainer>
            default:
                return <Title styler={styler}>
                          {text}{(isPercentField) ? `: ${value+tratedSginal}` : ''}
                       </Title>
        }
    }

    return (
        <Container center={center}>
            {renderingJSX(type)}
        </Container>
    );
}