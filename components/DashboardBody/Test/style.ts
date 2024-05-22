import styled from 'styled-components';

export const Container = styled.div`
    width: 93%;
    height: 88%;
    background-color: white;

    border-radius: 5px;

    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;

export const ControlArea = styled.div`
    width: 100%;
    height: 100%;
`;

export const VoiceArea = styled.div`
    width: 100%;
    height: 100%;
`;

export const ButtonArea = styled.div`
    width: 75%;
    height: 14%;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
        
    margin-top: 1.6%;
    margin-bottom: 1%;
    border-radius: 5px;
`;

export const MessageButton = styled.button`
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

    max-width: 200px;

    @media only screen and (min-height: 900px) {
        font-size: 1.4rem;
        padding-right:0%;
    }

    &:hover {
        background-color: #8140cf;
    }

    padding-right: 3%;

    cursor:pointer;
`;

export const SaveButton = styled.button`
    width: 100%;
    height: 100%;

    color:white;
    font-family: 'Inter';
    font-weight: bold;
    font-size: 1rem;

    border:none;
    border-radius: 4px;

    background-color: #07CCA1;

    transition: 1s;

    max-width: 200px;

    @media only screen and (min-height: 900px) {
        font-size: 1.4rem;
        padding-right:0%;
    }

    &:hover {
        background-color: #11977a;
    }

    padding-right: 3%;

    cursor:pointer;
`;

export const OptionArea = styled.div`
    width: 100%;
    height:5%;
`;