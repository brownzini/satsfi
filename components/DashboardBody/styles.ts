import styled from 'styled-components';

interface Prop {
    styles: string;
}

export const Body = styled.div`
    width: 100%;
    height: 75%;
    
    background-color: white;

    transition: 1s ease;
    
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
`;

export const Wrapper = styled.div<Prop>`
    width: 93%;
    height: 84%;
    
    background-color: #F0F2FA;
    border: 1px solid #E2DEF9;

    ${(p) => p.styles};
`;