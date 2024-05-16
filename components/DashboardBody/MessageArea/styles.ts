import styled from 'styled-components';

interface Prop {
    styler:string;
}

export const Container = styled.div`
    width: 100%;
    height: 10%;
`;

export const ContentArea = styled.div<Prop>`
    width: 50%;
    height: 100%;

    border-radius: 4px;

    color: ${(p) => p.styler};
    font-size: 1.4rem;
    font-family: 'Roboto';
    font-weight: 400;
    font-style: italic;

    animation: FadeIn 1.4s ease;
    
    @keyframes FadeIn {
        0% {
            opacity: 0;
            transform: translateY(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }
`;

export const SvgArea = styled.div`
    width: 10%;
    height: 50%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

