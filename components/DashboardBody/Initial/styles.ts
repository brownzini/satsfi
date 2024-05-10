import styled from 'styled-components';

interface Prop {
    styles:string;
}

export const Container = styled.div`
    width: 100%;
    height: 100%;
    gap: 30px;
`;

export const Head = styled.div`
    width: 88%;
    height: 30%;
    
    background-color: #F0F2FA;
    border: 1px solid #E2DEF9;
    border-radius: 7px;
`;

export const HeadTitle = styled.h1`
    color: #3C5774;
    font-size: 2rem;
    font-family: 'Inter';
    font-weight: bolder;
`;

export const Body = styled.div`
    width: 70%;
    height: 50%;
    gap: 16px;
`;

export const ButtonArea = styled.div`
    width: 50%;
    height: 100%;
    
    background-color: yellow;
`;

export const Button = styled.button<Prop>`
    width: 100%;
    height: 100%;
    
    ${(p) => p.styles};
    
    font-size: 20px;
    font-family: 'Inter';
    font-weight: bolder;
    text-align: center;

    cursor: pointer;
    user-select: none;

    border:none;
    border-radius: 7px;

    transition: 1s;
`;