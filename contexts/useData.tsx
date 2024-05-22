import React from "react";

//Types
import {
    BlackListProps,
    CallProps,
    ConfigProps,
    DonationProps,
    GenerateKeyProps,
    SurveyProps,
    TestProps
} from "@/utils/types";

export interface DataProps {
    idStream: string;
    config: ConfigProps;
    survey: SurveyProps;
    test: TestProps;
    trackDonate: DonationProps;
    call: CallProps;
    generateKey: GenerateKeyProps;
    blackList: BlackListProps;
}

interface DataContextValue {
    data: DataProps;
    setData: React.Dispatch<React.SetStateAction<DataProps>>;
    updateData: <K extends keyof DataProps>(key: K, newData: Partial<DataProps[K]>) => void;
}

interface Props {
    children: React.ReactNode;
}

const listInitial: DataContextValue = {
    data: {
        idStream: 'stream',
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
            options: [
                {id:'1', name:'pera', votes: '1000'}, 
                {id:'2', name:'banana', votes: '2000'}
            ],
            minToVote: '',
            
            endTime: {day:21, minute: 21, second: 34},
            amount: '50000',
        },
        test: {
            allow: true,
        },
        trackDonate: {
            donator: '',
            amount: '',
            content: '',
        },
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
        }
    },
    setData: param => { },
    updateData: param => { },
};

const DataContext = React.createContext<DataContextValue>(listInitial);

export function DataProvider({ children }: Props) {

    const [data, setData] = React.useState<DataProps>({
        idStream: 'stream',
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
            options: [
                {id:'1', name:'pera', votes: '1000'}, 
                {id:'2', name:'banana', votes: '2000'}
            ],
            minToVote: '',

            endTime: {day:21, minute: 21, second: 34},
            amount: '50000',
        },
        test: {
            allow: true,
        },
        trackDonate: {
            donator: '',
            amount: '',
            content: '',
        },
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
        }
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

    return (
        <DataContext.Provider value={{ data, setData, updateData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = React.useContext(DataContext);

    const { data, setData,  updateData, } = context;
    return { data, setData, updateData, };
}