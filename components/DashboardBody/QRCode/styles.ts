import styled from 'styled-components';

interface Prop {
    bgcolor:string;
    fontcolor:string;
    fontSize:string;
}

export const Content = styled.div`
    width: 88%;
    height: 84%;
    gap: 30px;
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

export const CardWrapper = styled.div`
    width: 100%;
    height: 100%;

    font-size: 0.93rem;
    font-family: 'Inter';
    font-weight: bolder;

    user-select: none;

    background-color: #240C42;
    border-radius: 5px;

    border: 3px solid #240C42;

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
`;
export const HeaderText = styled.h2`
    width: 100%;

    text-align: center;
    word-wrap: break-word;
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
`;
export const FooterText = styled.h2`
    width: 100%;

    text-align: center;
    word-wrap: break-word;
`;

export const ButtonArea = styled.div`
    width: 100%;
    height: 70%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-left: 12%;
    margin-bottom: 5%;
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

    cursor: pointer;
`;