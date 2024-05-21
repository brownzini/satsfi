import styled from 'styled-components';

export const Container = styled.div`
    width: 93%;
    height: 88%;
    background-color: white;

    border-radius: 5px;

    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
    gap: 3px;
`;

export const TextAreaContainer = styled.div`
    width: 76.5%;
    height: 50%;

    border-radius: 5px;
    border: 1px solid #DAD6E7;

    margin-left: 0.75%;

    background-color: #E8E6EF;

    position: relative;
`;

export const TextAreaWrapper = styled.div`
    width: 100%;
    height: 100%;

    overflow-x: hidden;
    overflow-y: scroll;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    
    row-gap: 5%;
    column-gap: 20px;

    padding-top: 2%;
    padding-left: 3%;
    padding-bottom: 2%;

    margin:0;
    
    &::-webkit-scrollbar {
        width: 12px; 
    }

    &::-webkit-scrollbar-track {
        background: transparent; 
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888; 
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
    
    scrollbar-width: thin;
    scroll-behavior: smooth;
    scrollbar-color: #888 transparent;
`;

export const TextAreaFieldArea = styled.div`
    width: auto;
    height: auto;

    border-radius: 5px;
    border: 1px solid #B42E2E;

    padding: 2%;

    background-color: #FFDBDB;
    gap: 7px;
`;

export const TextAreaFieldSvg = styled.div`
    width: 100%;
    height: 100%;

    color: #B42E2E;
    font-family: 'Open sans';
    font-weight: bold;

    user-select: none;

    cursor: pointer;
`;

export const TextAreaFieldTexxt = styled.h2`
    
    width: 100%;
    max-width: 75px;
    
    color: #B42E2E;
    font-size: 1rem;
    text-align: left;
    font-weight: bold;
    font-family: 'Inter';
    word-wrap: break-word;
    
    user-select: none;
    cursor: text;
`;

export const RemoveArea = styled.div`
    width: 5%;
    height: 16%;

    max-width: 50px;
    max-height: 50px;

    transition:1s ease;
    
    opacity: 0.70;

    &:hover {
        opacity: 1;
    }

    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;

    background-color: white;

    border-radius: 500px;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);

    margin: 2%;

    cursor: pointer;
`;