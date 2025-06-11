import { WebsocketSurveyProps } from "@/utils/types";
import React from "react";

interface DataContextValue {
    activeWs: boolean;
    setActiveWs: React.Dispatch<React.SetStateAction<boolean>>;

    wsConfig: any;
    setWsConfig: React.Dispatch<any>;

    amountChanged: number;
    setAmountChanged: React.Dispatch<React.SetStateAction<number>>;

    surveySoloDonation: WebsocketSurveyProps[];
    setsurveySoloDonation: React.Dispatch<React.SetStateAction<WebsocketSurveyProps[]>>;
}

interface Props {
    children: React.ReactNode;
}

const listInitial: DataContextValue = {
    activeWs: false,
    setActiveWs: param => { },
    wsConfig: false,
    setWsConfig: param => { },
    amountChanged: 0,
    setAmountChanged: param => { },
    surveySoloDonation: [],
    setsurveySoloDonation: param => { },
};

const ActiveWsContext = React.createContext<DataContextValue>(listInitial);

export function ActiveWsProvider({ children }: Props) {

    const [activeWs, setActiveWs] = React.useState<boolean>(false);
    const [wsConfig, setWsConfig] = React.useState<any>(null);
    const [amountChanged, setAmountChanged] = React.useState<number>(0);
    const [surveySoloDonation, setsurveySoloDonation] = React.useState<WebsocketSurveyProps[]>([]);

    return (
        <ActiveWsContext.Provider value={{
            activeWs, setActiveWs,
            wsConfig, setWsConfig,
            amountChanged, setAmountChanged,
            surveySoloDonation, setsurveySoloDonation,
        }}>
            {children}
        </ActiveWsContext.Provider>
    );
}

export function useActiveWs() {
    const context = React.useContext(ActiveWsContext);
    const {
        activeWs, setActiveWs,
        wsConfig, setWsConfig,
        amountChanged, setAmountChanged,
        surveySoloDonation, setsurveySoloDonation,
    } = context;
    return {
        activeWs, setActiveWs,
        wsConfig, setWsConfig,
        amountChanged, setAmountChanged,
        surveySoloDonation, setsurveySoloDonation,
    };
}