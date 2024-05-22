
import styled from 'styled-components';

export const WrapperDonationCard = styled.div`
    width: 84%;
    height: 100%;

    max-width: 700px;

    max-height: 250px;
    min-height: 250px;

    background-color: white;
    
    border-radius: 5px;
    box-shadow: 0px 6px 5px 3px rgb(0 0 0 / 14%);
`;

export const Header = styled.div`
    width: 100%;
    height: 16%;

    @media only screen and (min-height: 900px) {
        padding-top: 4%;
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NameArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-top: 3%;
    padding-left: 4%;
`;

export const NameTitle = styled.h3`
    color: #6D357B;
    font-family: 'Inter';
    font-weight: bold;
    font-style: italic;
    font-size: 1.24rem;

    @media only screen and (min-height: 900px) {
        font-size: 1.4rem;
    }
`;

export const AmountArea = styled.div`
    width:100%;
    height: 100%;
`;

export const SatoshiSvgArea = styled.div`
    width: 20%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const PriceArea = styled.div`
    width:100%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding-top: 2%;
    padding-right: 7%;
`;

export const PriceTitle = styled.h3`
    color: #F4B000;
    font-family: 'Inter';
    font-weight: bold;
    font-style: italic;
    font-size: 1.6rem;

    @media only screen and (min-height: 900px) {
        font-size: 1.4rem;
    }
`;

export const Body = styled.div`
    width: 100%;
    height: 100%;
`;

export const DescriptionArea = styled.div`
    width: 93%;
    height: 88%;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 3%;
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 7px;

    max-height: 300px;

    background-color: #FAFAF0;
`;

export const DescriptionTitle = styled.h2`
    color: #143707;
    font-size: 2rem;
    font-weight: bold;
    line-height: 2.1rem;
    word-wrap: break-word;
    font-family: 'Open sans';
`;