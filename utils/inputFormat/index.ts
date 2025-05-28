export const filterAmount = (value: string) => {
    const integerAmount = parseInt(value);

    if (integerAmount < 1000) {
        return value;
    }

    if (integerAmount >= 1000 && integerAmount < 10000) {
        return (integerAmount / 1000) + 'K';
    }

    if (integerAmount >= 10000 && integerAmount < 100000) {
        return (integerAmount / 1000) + 'K';
    }

    //1 milhão - 10 milhões
    if (integerAmount >= 100000 && integerAmount < 1000000) {
        return (integerAmount / 1000) + 'K';
    }

    //1 milhão - 10 milhões
    if (integerAmount >= 1000000 && integerAmount < 10000000) {
        return (integerAmount / 1000000) + 'M';
    }

    //10 milhão - 100 milhões
    if (integerAmount >= 10000000 && integerAmount < 100000000) {
        return (integerAmount / 1000000) + 'M';
    }

    //100 milhão - 1 Bilhão
    if (integerAmount >= 100000000 && integerAmount < 1000000000) {
        return (integerAmount / 1000000) + 'M';
    }

    //1 Bilhão - 10 Bilhões
    if (integerAmount >= 1000000000 && integerAmount < 10000000000) {
        return (integerAmount / 1000000000) + 'B';
    }

    //10 Bilhões - 100 Bilhões
    if (integerAmount >= 10000000000 && integerAmount < 100000000000) {
        return (integerAmount / 1000000000) + 'B';
    }

    //100 Bilhões - 1 Trilhão
    if (integerAmount >= 100000000000 && integerAmount < 1000000000000) {
        return (integerAmount / 1000000000) + 'B';
    }

}

export const isOnlySpaces = (str: string) => {
    return str.trim().length === 0;
};

export const feeConvert = (type: string, amount:string, ddp:number) => {
    const callValue = (type === "call") ? (Number(amount)*0.95)*ddp : 0.95*Number(amount);
    const survey = (type === "surveyDonation") ? (Number(amount)*0.25)*ddp : 0.25*Number(amount);
    const backgroundValue = (type === "backgroundDonation") ? (Number(amount)*0.90)*ddp : 0.9*Number(amount);
    const normalValue = (type === "normal") ? (Number(amount)*0.95)*ddp : 0.95*Number(amount);
    switch (type) {
        case 'call': return Math.floor(callValue).toString();
        case 'surveyDonation': return Math.floor(survey).toString(); 
        case 'backgroundDonation': return Math.floor(backgroundValue).toString();
        default: return Math.floor(normalValue).toString();
    }
}