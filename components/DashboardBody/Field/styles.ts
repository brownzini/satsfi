import styled from "styled-components";

interface ContainerProp {
    center: string;
}

interface StyleProp {
    styler: string;
}

export const Container = styled.div<ContainerProp>`
    width: 100%;
    height: 100%;

    display: flex;
    ${(p) => p.center}
    align-items: center;

    padding-left: 12%;
`;

export const Title = styled.p<StyleProp>`    
    ${(p) => p.styler};
`;

export const Input = styled.input<StyleProp>`
    ${(p) => p.styler};

    background-color: #E6EFEF;
    border: 1px solid #F0F2FA;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Button = styled.button<StyleProp>`
    ${(p) => p.styler}
`;

export const SliderContainer = styled.div`
    width: 100%;
`;