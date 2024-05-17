import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    position: relative;
    
    text-align: center;

    cursor: pointer;
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

    color: #B06CE6;
    font-size: 1.2rem;
    font-family: 'Open sans';
    font-weight: bold;

    @media only screen and (min-width: 1600px) {
        font-size: 2rem;
    }

    position: relative;
    z-index: 1;

    cursor: pointer;
`;