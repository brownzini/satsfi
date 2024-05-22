import styled from 'styled-components';

interface Prop {
    havekey: string;
}

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

export const ButtonArea = styled.div`
    width: 100%;
    height: auto;
    
    display: flex;
    justify-content: normal;
    align-items: center;
    gap: 20px;

    margin-bottom: 2%;
    padding-left: 12%;
`;

export const Button = styled.button<Prop>`
        width: 50%;
        height: 100%;

        max-width: 300px;
        max-height: 100px;
        min-height: 70px;

        color: white;
        font-size: 1.4rem;
        font-family: 'Poppins';
        font-weight: bold;

        border: none;
        border-radius: 5px;
        background-color: ${(p) => (p.havekey === 'true') ? '#fb5656' : '#07CCA1'};

        transition: 1s;

        &:hover {
            background-color: ${(p) => (p.havekey === 'true') ? '#ce3535' : '#11977a'} 
        }

        @media only screen and (min-width: 2560px) {
            font-size: 2rem;
        }

        cursor:pointer;
`;

export const FileArea = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-left: 12%;
`;

export const LinkToDownload = styled.a`
    color: #b0a120;
    font-size: 1.2rem;
    font-weight: 500;
    font-family: 'Open sans';

    transition: 0.5s ease;

    &:hover {
        color: #3c370c;
    }

    cursor: pointer;
`;

