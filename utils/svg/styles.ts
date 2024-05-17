import styled from 'styled-components';

interface Prop {
    rotate: string;
}

export const Svg = styled.svg`
    
    animation: svgFloat 1.4s ease infinite;
    
    @keyframes svgFloat {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }

`;

export const BaseSvg = styled.svg`
    cursor: pointer;
`;

export const ArrowSvg = styled.svg<Prop>`
    transition: 0.30s;
    transform: rotate(${(p) => p.rotate});
    cursor:pointer;
`;

export const AddSvg = styled.svg`
    cursor: pointer;
`;

export const LoadingSvg = styled.svg`

    animation: Loading 1s ease infinite;

    @keyframes Loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
        
            transform: rotate(360deg);
        }
    }

`;