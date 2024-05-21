type FieldScreen = {
    status: boolean;
    name: string;
}

export type ScreenProp = {
    initial: FieldScreen;
    importKey: FieldScreen;
    overview: FieldScreen;
    config: FieldScreen;
    survey: FieldScreen;
    test: FieldScreen;
    trackDonate: FieldScreen;
    qrCode: FieldScreen;
    call: FieldScreen;
    generateKey: FieldScreen;
    blackList: FieldScreen;
    chromaKey: FieldScreen;
}


export interface TimerProps {
    minute: number;
    second: number;
}

export interface ConfigProps {
    allow:boolean;
    minDonate: string;
    alertVolume: number;
    durationAlert: number;
}

export interface SurveyProps {
    allow:boolean; //Allow
    minCreateSurvey: string;
    surveyTime: number;
    
    surveyCreated: boolean;
    
    surveyTitle:string;
    options:OptionsProps[];
    minToVote:string;
}

export interface OptionsProps {
    id: string;
    name: string;
    votes: string;
}

export interface TestProps {
    allow:boolean;
}

export interface DonationProps {
    donator: string;
    amount:string;
    content: string;
}

export interface CallProps {
    allow: boolean;
    minAmount:string;
}

export interface GenerateKeyProps {
    idString: string;
    addressLightning:string;
    keyHub: string;
}

export interface BlackListProps {
    wordsBlocked: string;
}