import styled from "styled-components";

export const Container = styled.div`
    width: 93%;
    height: 84%;
`;

export const WrapperContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;

    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;

export const Amounts = styled.div`
    width: 100%;
    height: 100%;

    background-color: white;

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
`;

export const Setups = styled.div`
    width: 100%;
    height: 100%;

    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    background-color: white;
`;

export const DescriptionArea = styled.div`
    width: 100%;
    height: 15%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    position: relative;
`;

export const PercentArea = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const VolumeTitle = styled.p`
    color: #746B6B;
    font-size: 1rem;
    font-family: 'Inter';
    font-weight: bold;

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }

    @media only screen and (max-width: 1599px) {
        font-size: 1.6rem;
    }
`;