import styled from 'styled-components';

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
    align-items: center;
    gap: 5px;

    position: relative;
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;

    border: 1px solid #ccc;
    border-radius: 5px;
    
    opacity: 0;
    
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    
    cursor: pointer;
`;

export const Label = styled.label`
    width: 100%;
    height: 100%;

    color: #8F45CA;
    font-size: 2rem;
    font-family: 'Inter';
    font-weight: bolder;

    @media only screen and (min-width: 1600px) {
        font-size: 2rem;
    }

    position: relative;
    z-index: 1;

    cursor: pointer;
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

export const ImportContent = styled.div`
    width: 100%;
    height: 100%;
`;

export const ConfirmButton = styled.button`
    width: 20%;
    height: 50%;
    color: white;
    
    border-radius: 4px;

    font-size: 1.4rem;
    font-weight: 480;
    font-family: 'Roboto';

    outline: none;
    border: none;

    background-color: #8F45CA;

    transition: 0.5s ease;

    &:hover {
        color: #8F45CA;
        background-color: white;
        border: 1px solid #8F45CA;
    }

    cursor: pointer;
`;

export const ButtonArea = styled.div`
    width: 100%;
    height: 100%;
    gap: 1%;
`;

export const BackButton = styled.h2`
    color: #9BC9EA;
    
    font-size: 1.4rem;
    font-weight: 480;
    font-family: 'Roboto';

    transition: 0.5s ease;

    &:hover {
        color: #1F78B9;
    }

    cursor: pointer;
`;