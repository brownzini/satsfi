import styled from 'styled-components';

export const Container = styled.div`
    width: 20%;
    height: 100%;

    border-radius: 4px;

    background-color: white;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;

/* [Header] */

export const CardHeader = styled.div`
    width: 100%;
    height: 34%;
`;

export const TitleHeader = styled.h2`
    color:#3C5774;
    font-family: 'Open sans';
    font-weight: bolder;
    font-size: 1.4rem;

`;

/* [BODY] */

export const CardBody = styled.div`
    width: 100%;
    height: 33.3333%;
`;

export const SvgContainer = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const CardAmountContainer = styled.div`
    width: 75%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    color:#FAD40F;
    font-family: 'Inter';
    font-weight: bold;
`;

/* [Footer] */
export const CardFooter = styled.div`
    width: 100%;
    height: 33.3333%;
`;

export const ExportSvgArea = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    cursor: pointer;
`;

export const ExportTitleArea = styled.div`
    width: 100%;
    height: 100%;

    color: #5DBF5B;
    font-size: 1rem;
    font-family: 'Roboto';

    display: flex;
    justify-content: flex-start;
    align-items: center;

    cursor: pointer;
    user-select: none;
`;