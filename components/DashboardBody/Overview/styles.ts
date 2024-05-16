import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;

    border-radius: 7px;
`;

export const CardsContainer = styled.div`
    width: 100%;
    height: 75%;

    position: relative;
`;

export const ImportContainer = styled.div`
    width: 100%;
    height: 20%;
    background-color: white;
    border-top: 1px solid white;
    border-left: 1px solid white;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const SvgIconInImportArea = styled.div`
    width: 12%;
    height: 100%;

    color: #FF8585;

    border: 2px solid #FF8585;
    border-radius: 5px;

    padding-right: 1%;

    transition: 0.4s;

    @media only screen and (min-width: 1600px) {
        font-size: 2rem;
    }

    &:hover {
        background-color: #fffbfc;
    }

    cursor: pointer;
`;

export const CleanAllContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    color: #620707;
    font-weight: 300;
    font-family: 'Roboto';
    font-style: italic;
`;

export const ImportWrapper = styled.div`
    width: 20%;
    height: 25%;
    background-color: #F0F2FA;

    position: absolute;

    border: 1px solid #E2DEF9;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    color: #B06CE6;
    font-size: 1rem;
    font-family: 'Open sans';
    font-weight: bold;

    @media only screen and (min-width: 1600px) {
        font-size: 2rem;
    }

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }

    @media only screen and (min-height: 768px) {
        font-size: 1.6rem;
    }
    
    transition: 1s ease;

    &:hover {
        color: #4e1e74;
    }

    cursor: pointer;
    user-select: none;
`;

export const CardsContent = styled.div`
    width: 100%;
    height: 100%;
    background-color: #F0F2FA;

    position: relative;
`;

export const CardsWrapper = styled.div`
    width: 100%;
    height: 100%;
    gap: 10px;
    
    padding: 2%;
`;

/* [Monthly Area] */

export const MonthlyCard = styled.div`
    width: 25%;
    height: 100%;

    border-radius: 4px;

    background-color: white;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);

    max-height: 160px;
    max-width: 400px;
`;

export const MonthlyCardHeader = styled.div`
    width: 100%;
    height: 30%;

    background-color: white;

    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
`;

export const MonthlyCardTitle = styled.h2`
    color: #3C5774;
    font-size: 2rem;
    font-family: 'Open sans';
    font-weight: bold;
`;

export const MonthlyCardBody = styled.div`
    width: 100%;
    height: 40%;

    
    @media only screen and (min-width: 1600px) {
        padding-left: 10%;
    }
`;

export const MonthlyCardBodySvgArea = styled.div`
    width: 61%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

`;

export const MonthlyCardBodyTitleArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const MonthlyCardBodyTitle = styled.h2`
    font-family: 'Inter';
    font-weight: bold;
    font-size: 2rem;
    color: #FAD40F;
`;

export const ChartContainer = styled.div`
    width: 100%;
    height: 70%;
    background-color: #F0F2FA;
`;

export const ChartWrapper = styled.div`
    width: 75%;
    height: 75%;
    background-color: white;

    border-radius: 7px;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;