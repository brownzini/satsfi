import styled from 'styled-components';

interface Prop {
    styler:string;
}

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const TitleArea = styled.div`
    width: 100%;
    height: 14%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-left: 12%;
`;

export const Title = styled.h2`
    color: #8F45CA;
    font-size: 2rem;
    font-family: 'Inter';
    font-weight: bolder;
    
    @media only screen and (min-width: 1366px) {
        font-size: 3.7rem;
    }
`;

export const InputArea = styled.div`
    width: 100%;
    height: 25%;
    padding-left: 12%;
    padding-right: 12%;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
`;

export const Input = styled.input<Prop>`
    width: 75%;
    height: 50%;

    color: ${(p) => (p.styler !== 'red') ? '#0B4786' : 'red'};
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 1.2rem;
    font-style: italic;
    
    background-color: #F0F2FA;

    border: 2px solid ${(p) => p.styler};
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;

    @media only screen and (max-width: 1600px) {
        font-size: 2rem;
    }

    @media only screen and (min-height: 900px) {
        font-size: 3rem;
    }

    padding-left: 5%;

    outline: none;
`;

export const Button = styled.button`
    width: 25%;
    height: 50%;

    background-color: white;

    border-radius: 5px;
    border: 2px solid #3994D6;

    color: #3994D6;
    font-size: 1rem;
    font-weight: bold;
    font-family: 'Roboto';

    transition: 0.75s ease;

    @media only screen and (max-width: 1600px) {
        font-size: 2rem;
    }

    @media only screen and (min-height: 900px) {
        font-size: 2.5rem;
    }

    &:hover {
        color: white;
        background-color: #3994D6;
    }

    cursor: pointer;
`;

export const MessageError = styled.h2`
    color: #FF8585;
    font-size: 1.4rem;
    font-family: 'Roboto';
    font-style: italic;
`;