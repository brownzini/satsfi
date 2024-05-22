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