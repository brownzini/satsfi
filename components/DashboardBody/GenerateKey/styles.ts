import styled from 'styled-components';

export const Content = styled.div`
    width: 93%;
    height: 84%;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 4px 5px 2px rgb(0 0 0 / 14%);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const GenerationArea = styled.div`
    width: 100%;
    height: 10%;
    gap: 5px;
`;

export const SvgAreaWrapper = styled.div`
    width: 27.3%;
    height: 100%;
`;

export const SvgArea = styled.div`
    width: 30%;
    height: 100%;
    border-radius: 7px;
    background-color: white;
    border: 2px solid #5E9AA8;

    min-width: 70px;
    max-width: 50px;

    transition: 0.7s ease;

    &:hover {
        background-color: #E8FBFF;
    }

    cursor:pointer;
`;