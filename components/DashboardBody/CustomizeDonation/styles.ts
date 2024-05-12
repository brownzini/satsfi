import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    margin: 5%;

    transition: 1s;

    gap: 10px;
`;

export const AddContainer = styled.div`
    width: 100%;
    height: 10%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
`;

export const AddArea = styled.div`
    width: 10%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AlertArea = styled.div`
    width: 100%;
    height: 100%;
`;

export const MessageTitle = styled.h2`
    color: #FF8585;
    font-family: 'Roboto';
    font-weight: 700;
    font-style: italic;
`;

export const WrapperBody = styled.div`
    width: 100%;
    height: 75%;

    scroll-behavior: smooth;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    padding-top:0.2%;

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

export const WrappedFooter = styled.div`
    width: 100%;
    height: 7%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`;

export const SaveButton = styled.button`
    width: 16%;
    height: 100%;

    background-color: #07CCA1;
    
    border:none;
    border-radius: 4px;

    color: white;
    font-size: 1.2rem;
    font-family: 'Inter';
    font-weight: bold;

    transition: 0.7s;

    &:hover {
        background-color: #11977a;
    }

    cursor: pointer;
`;

export const BackButton = styled.button`
    width: 16%;
    height: 100%;

    background-color: #A6B2AF;
    
    border:none;
    border-radius: 4px;

    color: white;
    font-size: 1.2rem;
    font-family: 'Inter';
    font-weight: bold;

    transition: 0.7s;

    &:hover {
        background-color: #606D6A;
    }

    cursor: pointer;
`;