import styled from 'styled-components';

interface Prop {
    styler: string;
}

interface ButtonProp {
    styler: string;
}

export const Container = styled.div`
    width: 93%;
    height: 88%;
    background-color: white;

    border-radius: 5px;

    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;

export const ControlArea = styled.div<Prop>`
    width: ${(p) => p.styler};
    height: 100%;
    border-right: 5px solid #f0f2fa;
    transition: 1s ease;
`;

export const GenerationArea = styled.div`
    width: 100%;
    height: 100%;
`;

export const GenerationWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const DurationArea = styled.div`
    width: 100%;
    height: 20%;

    position: relative;
`;

export const TimerArea = styled.div`
    width: 20%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    position: absolute;
    z-index: 2;
    right: 5%;

    background-color: white;
`;

export const TimeTitle = styled.p`
    color: #746B6B;
    font-family: 'Open sans';
    font-weight: 500;
    font-style: italic;

    @media only screen and (min-height: 900px) {
        font-size: 1.6rem;
    }
`;

export const SaveArea = styled.div`
    width: 70%;
    height: 20%;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    margin-right: 5%;
`;

export const SaveButton = styled.button`
    width: 100%;
    height: 50%;

    color:white;
    font-family: 'Inter';
    font-weight: bold;
    font-size: 1rem;

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }

    border:none;
    border-radius: 4px;

    transition: 1s ease;

    background-color: #07CCA1;

    &:hover {
        background-color: #11977a;
    }

    cursor:pointer;
`;

//Left Side
export const LeftSideArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

`;

//Right Side
export const RightSideArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const OptionsWrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const DescriptionArea = styled.div`
    width: 100%;
    height: 20%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TextArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.p`
    color: #3C5774;
    font-family: 'Inter';
    font-weight: bold;
    font-size: 1.4rem;

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }

    user-select: none;
`;

export const OptionSvgArea = styled.div`
    width: 25%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-right: 10%;
`;

export const OptionsList = styled.div`
    width: 100%;
    height: 100%;
    max-height: 70%;

    user-select: none;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px;

    overflow-y: scroll;

    &::-webkit-scrollbar {
    width: 0px;
    }

    &::-webkit-scrollbar-thumb {
    background: #888;
    }

    &::-moz-scrollbar {
    width: 0px;
    }

    &::-moz-scrollbar-thumb {
    background: #888;
    }
`;

export const InputWrapper = styled.div`
    width: 100%;
    height: 20%;
`;

export const InputArea = styled.div`
    width: 70%;
    height: 100%;
`;

export const RemoveArea = styled.div`
    width: 14%;
    height: 100%;

    background-color: #E6EFEF;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
   
    color: #6a5212;
    font-family: "Roboto";
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
 
    background-color: #E6EFEF;

    border-top: 1px solid #F0F2FA;
    border-left: 1px solid #F0F2FA;
    border-bottom: 1px solid #F0F2FA;
    border-right: none;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    outline: none;

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }
`;

export const SaveButtoArea = styled.div`
    width: 100%;
    height: 10%;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    padding-bottom: 3%;

    max-width: 84%;

    user-select: none;

    gap: 5px;
`;

export const CreateButton = styled.button`
    width: 100%;
    height: 100%;

    color:white;
    font-family: 'Inter';
    font-weight: bold;
    font-size: 1rem;

    border:none;
    border-radius: 4px;

    background-color: #3B1170;

    transition: 1s;

    @media only screen and (min-height: 900px) {
        font-size: 1.6rem;
    }

    &:hover {
        background-color: #8140cf;
    }

    cursor:pointer;
`;

export const BackButton = styled.button`
    width: 100%;
    height: 100%;

    color:white;
    font-family: 'Inter';
    font-weight: bold;
    font-size: 1rem;

    border:none;
    border-radius: 4px;

    transition: 1s ease;

    background-color: #A6B2AF;

    @media only screen and (min-height: 900px) {
        font-size: 1.6rem;
    }

    &:hover {
        background-color: #78807e;
    }

    cursor:pointer;
`;

//No Survey
export const CreateSurveyArea = styled.div`
    width: 100%;
    height: 100%;
`;

export const TitleArea = styled.div`
    width: 100%;
    height: 25%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SvgArea = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.h1`
    color: #3C5774;
    font-size: 2rem;
    font-family: 'Roboto';
    font-weight: bold;

    @media only screen and (min-height: 900px) {
        font-size: 3rem;
    }
`;

export const ButtonArea = styled.div`
    width: 100%;
    height: 20%;

    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

export const Button = styled.button<ButtonProp>`
    width: 50%;
    height: 70%;

    border: none;
    border-radius: 5px;

    color: white;
    font-family: 'Inter';
    font-weight: bold;
    
    ${(p) => p.styler};

    transition: 0.70s;

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }

    cursor: pointer;
`;

export const MessageErrorArea = styled.div`
    width: 100%;
    height: 100%;

    color: #FF8585;
    font-weight: 300;
    font-style:italic;
    font-family: 'Roboto';

    text-align: left;
`;

export const WinnerText = styled.h3`
    max-width: 70%;
 
    color: #464bd8;
    font-size: 1.2rem;
    font-family: 'Open sans';
    font-weight: 500;

    text-align: center;
    word-wrap: break-word;

    @media only screen and (min-height: 900px) {
        font-size: 2.4rem;
    }

`;

export const AmountVotesText = styled.h3`
    font-size: 1.6rem;
    font-family: 'Roboto';
    font-weight: bold;
    color: #F4B000;

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }
`;

export const NoVotesText = styled.h2`
    color: #3C5774;
    font-family: 'Open sans';
    font-size: 1.4rem;
    font-weight: bold;
`;

export const TrophyArea = styled.div`
    width: 50%;
    height: 50%;
`;