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
    
    ${(p) => p.styles};

    border-radius: 3px;
`;

export const BackArea = styled.div`
    width: 100%;
    height: 3%;

    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    padding-left: 3%;
`;

export const BackButton = styled.h2`
    color: #6B3EA5;
    
    font-size: 1.4rem;
    font-weight: 480;
    font-family: 'Roboto';

    transition: 0.5s ease;

    &:hover {
        color: #E0C9FF;
    }

    cursor: pointer;
`;

export const RenderingContainer = styled.div`
    width: 100%;
    height:100%;
`;