import styled from 'styled-components';

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
