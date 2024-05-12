import styled from 'styled-components';

interface ContainerProp {
    styler: string;
}

export const Container = styled.div<ContainerProp>`
    width: 100%;
    height: ${(p) => p.styler};

    background-color: white;

    border-radius: 5px;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;

export const Header = styled.div<ContainerProp>`
    width: 100%;
    height: ${(p) => p.styler};
    background-color: white;

    border-top-right-radius: 4px;
    border-top-left-radius: 4px;

    border-bottom: 1px solid #f0f2fa;
`;

export const AmountArea = styled.div`
    width: 100%;
    height: 100%;
`;

export const SatoshiArea = styled.div`
    width: 7%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ValueArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    user-select: none;
`;

export const ArrowArea = styled.div`
    width: 12%;
    height: 100%;

    padding-right: 3%;
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    border:none;
    outline: none;

    color: #F4B000;
    font-size: 1.6rem;
    font-weight: bold;
    font-family: 'Inter';

    background-color:white;

    cursor: pointer;
`;

export const ConfirmationArea = styled.div`
    width: 12%;
    height: 75%;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 4px solid #74f6b5;
    border-radius: 4px;
    
    transition: 0.5s;

    &:hover {
        background-color: #e9fff4;
    }
`;

export const Content = styled.div<ContainerProp>`
    width: 100%;
    height: ${(p) => p.styler};

    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    transition: 0.2s ease;
`;

export const TopicArea = styled.div`
    width: 100%;
    height: 100%;
`;

export const BackgroundColor = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 4px;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);

    cursor: pointer;
`;

export const BgColorInput = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 4px;

    cursor: pointer;
`;

export const FontColor = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 4px;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);

    cursor: pointer;
`;

export const BorderColor = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 4px;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
    
    cursor: pointer;
`;

export const ToggleArea = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 4px;
`;

export const Visualization = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 4px;
`;

export const CardModelWrapper = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 4px;

    padding: 7%;
`;

export const AudioNameArea = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 0%;
`;

export const AudioTiitle = styled.p`
    max-width: 100%;
    height: 100%;

    color: #53555c;
    font-size: 1rem;
    font-weight: 500;
    font-style:italic;
    font-family: "Open sans";
    word-wrap: break-word;

    user-select:none;
`;
