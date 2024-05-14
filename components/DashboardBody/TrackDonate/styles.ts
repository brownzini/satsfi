import styled from 'styled-components';

export const Container = styled.div`
    width: 93%;
    height: 100%;

    padding-top: 2%;

    border-radius: 5px;
`;

export const MessageBoxContainer = styled.div`
    width: 100%;
    height: 10%;

    background-color: #f0f2fa;
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const DonationCard = styled.div`
    width: 100%;
    height: 100%;

    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    max-height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 0px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    &::-moz-scrollbar {
        width: 0px;
    }

    &::-moz-scrollbar-thumb {
        background: #888;
    }
    
    gap: 30px;
`;

export const WrapperDonationCard = styled.div`
    width: 84%;
    height: 84%;
    background-color: white;
    box-shadow: 0px 6px 5px 3px rgb(0 0 0 / 14%);
    border-radius: 5px;
`;

export const Header = styled.div`
    width: 100%;
    height: 16%;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NameArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    padding-left: 4%;
`;

export const NameTitle = styled.h3`
    color: #6D357B;
    font-family: 'Inter';
    font-weight: bold;
    font-style: italic;
    font-size: 1.24rem;
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
    align-items: flex-end;

    padding-right: 7%;
`;

export const PriceTitle = styled.h3`
    color: #F4B000;
    font-family: 'Inter';
    font-weight: bold;
    font-style: italic;
    font-size: 1.6rem;
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

    background-color: #FAFAF0;
`;

export const DescriptionTitle = styled.h2`
    color: #143707;
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Open sans';
    word-wrap: break-word;
`;