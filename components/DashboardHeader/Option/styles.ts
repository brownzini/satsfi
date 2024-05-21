import styled from 'styled-components';

interface FontColorProp {
    isselected:string;
}

export const OptionTitle = styled.p`
    
    font-size: 1rem;
    font-family: 'Roboto';
    color: #6695C8;
    font-weight: 500;
    
    @media only screen and (min-width: 2560px) {
        font-size: 2.5rem;
    }

    @media only screen and (min-width: 1600px) {
        font-size: 2rem;
    }

    @media only screen and (min-width: 1300px) {
        font-size: 1.6rem;
    }

    user-select: none;
`;

export const SvgContainer = styled.div<FontColorProp>`
    width: 100%;
    height: 100%;

    position: relative;

    ${(p) => p.isselected};
    
    transition: 0.25s ease-in;

    &:hover {
        ${(p) => (p.isselected === 'opacity: 0.5;') ? 'opacity: 0.84;' : 'opacity: 1;'};
    }

    cursor: pointer;
`;

export const TooltipText = styled.span`
    width: 120px;
    
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-family: 'Open sans';
    font-style: italic;

    @media only screen and (min-width: 2560px) {
        font-size: 2.5rem;
    }

    @media only screen and (min-width: 1600px) {
        font-size: 2rem;
    }

    @media only screen and (min-width: 1300px) {
        font-size: 1.6rem;
    }

    padding: 5px 0;
    
    background-color: #555;
    border-radius: 6px;
    
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 3;
    margin-left: -60px;
    
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;
`;