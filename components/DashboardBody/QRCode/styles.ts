import styled from 'styled-components';

interface Prop {
    bgcolor:string;
    fontcolor:string;
    fontSize:string;
}

interface BorderProp {
    styler:string;
}

export const Content = styled.div`
    width: 88%;
    height: 84%;
    gap: 0px;

    @media only screen and (min-width: 1600px) {
        gap: 30px;
    }
`;

export const ControlArea = styled.div`
    width: 100%;
    height: 100%;

    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;

export const ImageArea = styled.div`
    width: 34%;
    height: 100%;
    background-color: transparent;
    max-width: 300px;

    @media only screen and (max-width: 1920px) {
        min-width: 340px;
    }
    @media only screen and (max-width: 1600px) {
        min-width: 300px;
    }
    @media only screen and (max-width: 1366px) {
        width: 100px;
    }
`;

export const ColorsArea = styled.div`
    width: 100%;
    height: 12%;
    display: flex;
    gap: 10px;
    padding-left: 12%;
`;

export const Input = styled.input`
    width: 20%;
    height: 100%;

    max-width: 100px;
    max-height: 100px;

    padding: 0;
    aspect-ratio: 1;
    appearance: none;
    
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 48%);
    
    @media only screen and (max-width: 1600px) {
        max-width: 70px;
    }

    &::-webkit-color-swatch-wrapper {
        padding: 0;
        border-radius: 5px;
    }
    &::-webkit-color-swatch {
        border: none;
        border-radius: 5px;
    }

    cursor: pointer;
`;

export const DescriptionArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const FontSizeArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const CardWrapper = styled.div<BorderProp>`
    width: 100%;
    height: 100%;

    font-size: 0.93rem;
    font-family: 'Inter';
    font-weight: bolder;

    user-select: none;

    background-color: #240C42;
    border-radius: 5px;

    border: 3px solid ${(p) => p.styler};

    @media only screen and (min-width: 2560px) {
        height: 75%;
    }

    @media only screen and (max-width: 1920px) {
        width: 88%;
    }

    padding: 0%;
    margin: 0;
`;
export const HeaderArea = styled.div<Prop>`
    width:100%;
    height:25%;

    background-color: ${(p) => p.bgcolor};

    border-top-right-radius: 4px;
    border-top-left-radius: 4px;

    color: ${(p) => p.fontcolor};
    font-size: ${(p) => p.fontSize};

    @media only screen and (min-width: 2560px) {
        align-items: center;
        max-height: 160px;
        font-size: 1.2rem;
    }
    @media only screen and (max-width: 1920px) {
        font-size: 1.4rem;
        padding: 7%;
    }
`;
export const HeaderText = styled.h2`
    width: 100%;

    text-align: center;
    word-wrap: break-word;

    @media only screen and (min-width: 2560px) {
        padding: 10%;
    }

    @media only screen and (max-width: 1920px) {
        font-size: 1.6rem;
    }

    @media only screen and (max-width: 1600px) {
        padding: 3%;
        font-size: 1.4rem;
    }

    @media only screen and (max-width: 1370px) {
        font-size: 1.2rem;
    }
`;
export const BodyArea = styled.div`
    width: 100%;
    height: 50%;

    padding: 5%;

    border: 2px solid white;

    background: white;
`;
export const FooterArea = styled.div<Prop>`
    width:100%;
    height:25%;

    background-color: ${(p) => p.bgcolor};

    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    color: ${(p) => p.fontcolor};
    font-size: ${(p) => p.fontSize};

    @media only screen and (min-width: 2560px) {
        align-items: center;
    }

    @media only screen and (max-width: 1920px) {
        font-size: 1.4rem;
        padding: 7%;
    }
`;
export const FooterText = styled.h2`
    width: 100%;
    @media only screen and (min-width: 2560px) {
        font-size: 2rem;
    }
    @media only screen and (max-width: 1920px) {
        font-size: 1.6rem;
    }
    @media only screen and (max-width: 1600px) {
        font-size: 1.4rem;
    }
    text-align: center;
    word-wrap: break-word;
`;

export const ButtonArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-left: 12%;
    margin-bottom: 5%;

    @media only screen and (max-width: 1600px) {
        margin-bottom: 2%;
    }
`;

export const Button = styled.button`
    width: 70%;
    height: 100%;

    max-width: 220px;

    border: none;
    border-radius: 5px;

    color: white;
    font-family: 'Inter';
    font-weight: bold;

    background-color: #3B1170;

    transition: 0.70s;

    &:hover {
        background-color: #1E0A37;
    }

    @media only screen and (min-width: 2560px) {
        font-size: 2.5rem;
        border-radius: 10px;
        height: 70%;
    }

    @media only screen and (max-width: 1920px) {
        font-size: 2rem;
        border-radius: 10px;
        height: 70%;
    }

    @media only screen and (max-width: 1600px) {
        font-size: 1.4rem;
    }

    cursor: pointer;
`;