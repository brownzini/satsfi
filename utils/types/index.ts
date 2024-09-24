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
    start: FieldScreen;
}


export interface TimerProps {
    day?: number;
    hour?: number;
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
    durationTime: number;
    
    surveyTitle:string;
    options:OptionsProps[];
    minToVote:string;

    endTime: TimerProps;
    amount: string;
}

export interface OptionsProps {
    id: string;
    name: string;
    votes: string;
}

export interface WebsocketSurveyProps {
    id: string;
    name?:string;
    amount: string;
}

export interface WinnerProps {
    id: string;
    name:string;
    percentage: string;
    amount: string;
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

export interface DonateProps {
    name: string;
    amount: string;
    description: string;
    type: "ai" | "default" | "survey" | "call" | "background";
    narrator: string;
    isCalling: boolean;
    callUrl: string,
    backgroundUrl: string;
}

export interface ChromaKeyProps {
    allow: boolean;
    obsPassword?:string;
}

export interface AllDonationsProps {
    date: string;
    type: string;
    value: string;
    donor_name:string;
    message:string;
}

export interface QRCodeProps {
    bgColor: string;
    fontColor:string;
}

