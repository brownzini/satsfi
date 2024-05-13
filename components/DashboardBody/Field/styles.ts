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

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f0f0f0;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  &::-ms-expand {
    display: none;
  }
`;