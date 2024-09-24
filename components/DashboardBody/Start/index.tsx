import { useState } from "react";

import {
    Container,
    SvgArea,
} from "./styles";

//Component
import ButtonComponent from "./ButtonComponent";

//Utils
import SvgModel from "@/utils/svg";

//Contexts
import { useData } from "@/contexts/useData";

//Websocket
import WebSocketService from "../../../websocket";
import { useActiveWs } from "@/contexts/useActiveWs";

type ButtonName = 'start' | 'stop';

interface ButtonProps {
    status: boolean;
    color: string;
}

interface ButtonStateProps {
    start: ButtonProps;
    stop: ButtonProps;
}

export default function Start() {

    const { data, updateData, addDonate } = useData();
    const { 
        wsConfig, setWsConfig, setActiveWs, 
        surveySoloDonation, setsurveySoloDonation 
    } = useActiveWs();
    
    const [buttonState, setButtonState] = useState<ButtonStateProps>({
        start: { 
            status: !wsConfig, 
            color: '#D16EFF, #7B15AA' 
        },
        stop: { 
            status: wsConfig, 
            color: '#F27C7C, #DD4A4A' 
        },
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleButtonState = (buttonName: ButtonName) => {
        setButtonState((prevState) => {
            const newState = { ...prevState };

            for (let key in newState) {
                newState[key as ButtonName].status = false;
            }

            newState[buttonName].status = true;

            return newState;
        });
    };

    const getActiveButton = (): ButtonName => {
        for (let key in buttonState) {
            if (buttonState[key as ButtonName].status) {
                return key as ButtonName;
            }
        }
        return 'start';
    };

    const getButtonName = () => {
        const name = getActiveButton();
        switch (name) {
            case 'start': return 'Iniciar';
            case 'stop': return 'Parar';
        }
    }

    const handleActiveHub = (param: string) => updateData('isActiveHub', (param === 'start'));

    const handleClick = () => {
        const activedButton = getActiveButton();
        const getNextButton = (activedButton === 'start') ? 'stop' : 'start';

        handleActiveHub(activedButton);

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        toggleButtonState(getNextButton);

        if (data.generateKey.keyHub && activedButton === 'start') {
            const socket = WebSocketService(
                data.generateKey.idString,
                data.generateKey.keyHub,
                data,
                addDonate,
                updateData,
                setsurveySoloDonation,
                surveySoloDonation
            );
            setActiveWs(true);
            setWsConfig(socket);
        } else {
            if(wsConfig) { 
                wsConfig.close();
                setWsConfig(null);
                setActiveWs(false);
            }
        }

    }

    return (
        <Container className="flex fd">
            {(!isLoading)
                ? (<ButtonComponent
                    buttonState={buttonState}
                    getActiveButton={getActiveButton}
                    getButtonName={getButtonName}
                    handleClick={handleClick}
                />) : (
                    <SvgArea className="flex">
                        <SvgModel
                            name="loading"
                            width="50%"
                            height="50%"
                        />
                    </SvgArea>
                )
            }

        </Container>
    );
}