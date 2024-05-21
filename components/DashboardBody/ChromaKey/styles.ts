import styled from 'styled-components';

export const Container = styled.div`
    width: 93%;
    height: 88%;
    background-color: white;

    border-radius: 5px;

    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);
`;

export const ChromaContent = styled.div`
    width: 100%;
    height: 100%;
`;

export const DownloadContent = styled.div`
    width: 100%;
    height: 100%;

    @media only screen and (min-width: 1600px) {
        padding-top: 4%;
    }
`;

export const NodeObsContainer = styled.div`
    width: 100%;
    height: 30%;

    gap: 10px;
`;

export const NodeArea = styled.div`
    width: 100%;
    height: 100%;
    gap: 12px;
`;

export const NodeSvgArea = styled.div`
    width: 100%;
    height: 50%;

    opacity: 0.75;

    transition: 0.5s;

    &:hover {
        opacity: 1;
    }

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    padding-right: 22%;

    cursor: pointer;
`;

export const NodeSvgContent = styled.div`
    width: 100%;
    height: 100%;
    
    padding: 3%;

    border-radius: 5px;
    border: 3px solid #417E38;
    background: linear-gradient(to left, #579B4D, #417E38);
`;

export const GithubArea = styled.div`
    width: 100%;
    height: 100%;
    gap: 12px;

    padding-right: 22%;
`;

export const GithubSvgArea = styled.div`
    width: 100%;
    height: 50%;

    opacity: 0.75;

    transition: 0.5s;

    &:hover {
        opacity: 1;
    }

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

export const GithubSvgContent = styled.div`
    width: 100%;
    height: 100%;

    padding: 3%;

    border-radius: 5px;
    border: 2px solid #272424;
    background: linear-gradient(to left, #272424, #5A5050);
`;

export const InitializerContainer = styled.div`
    width: 100%;
    height: 100%;
    
    @media only screen and (min-width: 1600px) {
     margin-top: 4%;
    }
`;

export const TutorialContainer = styled.div`
    width: 100%;
    height: 100%;
`;