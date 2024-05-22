import React from "react";

//Types
import {
    BlackListProps,
    CallProps,
    ChromaKeyProps,
    ConfigProps,
    DonateProps,
    GenerateKeyProps,
    SurveyProps,
    TestProps
} from "@/utils/types";

//Context
import { useHeader } from "./useHeader";

export interface DataProps {
    config: ConfigProps;
    survey: SurveyProps;
    test: TestProps;
    trackDonate: DonateProps[];
    call: CallProps;
    generateKey: GenerateKeyProps;
    blackList: BlackListProps;
    chromaKey: ChromaKeyProps;
}

interface DataContextValue {
    data: DataProps;
    setData: React.Dispatch<React.SetStateAction<DataProps>>;
    updateData: <K extends keyof DataProps>(key: K, newData: Partial<DataProps[K]>) => void;

    addDonate: (newDonate: DonateProps) => void;
    deleteDonate: (index: number) => void;
    removeLastDonate: () => void;
    destroyHub: () => void;
}

interface Props {
    children: React.ReactNode;
}

const listInitial: DataContextValue = {
    data: {
        config: {
            allow: false,
            minDonate: '1000',
            alertVolume: 100,
            durationAlert: 15,
        },
        survey: {
            allow: false,
            minCreateSurvey: '2,500',
            durationTime: 1,

            surveyTitle: 'Enquete',
            options: [],
            minToVote: '',
            
            endTime: {
                day:0, 
                hour:0,
                minute: 0, 
                second: 0
            },
            amount: '0',
        },
        test: {
            allow: true,
        },
        trackDonate: [],
        call: {
            allow: false,
            minAmount: '',
        },
        generateKey: {
            idString: '',
            addressLightning: '',
            keyHub: '',
        },
        blackList: {
            wordsBlocked: '',
        },
        chromaKey: {allow: true},
    },
    setData: param => { },
    updateData: param => { },
    addDonate: param => { },
    deleteDonate: param => { },
    removeLastDonate: () => { },
    destroyHub: () => {},
};

const DataContext = React.createContext<DataContextValue>(listInitial);

export function DataProvider({ children }: Props) {

    const { setActiveScreen } = useHeader();

    const [data, setData] = React.useState<DataProps>({
        config: {
            allow: true,
            minDonate: '1,000',
            alertVolume: 100,
            durationAlert: 15,
        },
        survey: {
            allow: true,
            minCreateSurvey: '2,500',
            durationTime: 1,

            surveyTitle: 'Enquete',
            options: [],
            minToVote: '',

            endTime: {
                day:0, 
                hour:0,
                minute: 0, 
                second: 0
            },
            amount: '50000',
        },
        test: {
            allow: true,
        },
        trackDonate: [],
        call: {
            allow: true,
            minAmount: '12,000',
        },
        generateKey: {
            idString: '',
            addressLightning: '',
            keyHub: '',
        },
        blackList: {
            wordsBlocked: '',
        },
        chromaKey: {allow: true},
    });

    const updateData = <K extends keyof DataProps>(key: K, newData: Partial<DataProps[K]>) => {
        setData(prevData => {
            const prevValue = prevData[key];
            
            if (typeof prevValue === 'object' && prevValue !== null) {
                return {
                    ...prevData,
                    [key]: {
                        ...prevValue,
                        ...newData,
                    },
                };
            } else {
                return {
                    ...prevData,
                    [key]: newData,
                };
            }
        });
    };

    const addDonate = (newDonate: DonateProps) => {
        setData(prevData => ({
            ...prevData,
            trackDonate: [newDonate, ...prevData.trackDonate || []]
        }));
    };

    const deleteDonate = (index: number) => {
        setData(prevData => ({
            ...prevData,
            trackDonate: (prevData.trackDonate || []).filter((_, i) => i !== index)
        }));
    };

    const removeLastDonate = () => {
        setData(prevData => ({
            ...prevData,
            trackDonate: (prevData.trackDonate || []).slice(0, -1)
        }));
    };

    const destroyHub = () => {
        setData({
            config: {
                allow: true,
                minDonate: '1,000',
                alertVolume: 100,
                durationAlert: 15,
            },
            survey: {
                allow: true,
                minCreateSurvey: '2,500',
                durationTime: 1,
    
                surveyTitle: 'Enquete',
                options: [],
                minToVote: '',
    
                endTime: {
                    day:0, 
                    hour:0,
                    minute: 0, 
                    second: 0
                },
                amount: '50000',
            },
            test: {
                allow: true,
            },
            trackDonate: [],
            call: {
                allow: true,
                minAmount: '12,000',
            },
            generateKey: {
                idString: '',
                addressLightning: '',
                keyHub: '',
            },
            blackList: {
                wordsBlocked: '',
            },
            chromaKey: {allow: true},
        });
        setActiveScreen('generateKey');
        setTimeout(() => {
            setActiveScreen('initial');
        }, 500);
    }

    return (
        <DataContext.Provider value={{ 
            data, setData, 
            updateData,
            addDonate, deleteDonate,
            removeLastDonate,
            destroyHub,
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = React.useContext(DataContext);
    const { 
            data, setData,  
            updateData, 
            addDonate, deleteDonate,
            removeLastDonate,
            destroyHub,
    } = context;
    return { 
            data, setData, 
            updateData, 
            addDonate, deleteDonate,
            removeLastDonate,
            destroyHub,
    };
}