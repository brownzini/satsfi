import styled from 'styled-components';

interface Prop {
    width: string;
    last?:string;
}

interface FontColorProp {
    isselected:string;
}

export const Header = styled.div`
    width: 100%;
    height: 10%;
`;

export const WrapperLogoArea = styled.div`
    width: 25%;
    height: 100%;

    background-color: white;

    border-right: 7px solid #DADEDE;
    border-top-left-radius: 7px;
`;

export const Logo = styled.h2`
    color: #F4B000;
    font-size: 2rem;
    font-family: 'Inter';
    font-weight: bold;

    @media only screen and (min-height: 900px) {
        font-size: 3rem;
    }
`;

export const OptionsArea = styled.div`
    width: 75%;
    height: 100%;

    background-color: white;

    border-bottom: 7px solid #DADEDE;
    border-top-right-radius: 7px;
    border-bottom-left-radius: 7px;
`;

export const OptionArea = styled.div<Prop>`
    width: ${(p) => p.width};
    height: 100%;
    
    border-right: 7px solid ${(p) => p.last};
    border-top-right-radius: ${(p) => (p.last === 'white') ? '7px' : '0px'};
    
    text-align: center;

    transition: 0.5s ease-in;

    cursor: pointer;
`;

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
    
    /* Position the tooltip text */
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 1;
    margin-left: -60px;
    
    /* Fade in tooltip */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;
`;