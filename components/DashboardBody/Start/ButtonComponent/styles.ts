import styled from "styled-components";

interface Prop {
  styler: string;
}

export const Container = styled.div<Prop>`
  width: 100%;
  height: 100%;

  ${(p) => p.styler};

  gap: 12px;

  transition: cubic-bezier(0.165, 0.84, 0.44, 1) ease;

  @keyframes hit {
    0% {
      gap: 12px;
    }
    50% {
      gap: 0px;
    }
    100% {
      gap: 12px;
    }
  }
`;

export const ButtonArea = styled.div<Prop>`
  width: 100%;
  height: 100%;

  max-width: 250px;
  max-height: 100px;

  border-radius: 4px;

  animation: LoadingButton 2s ease infinite;

  @keyframes LoadingButton {
    0% {
      background-color:  ${(p) => (p.styler === "start") ? "#7b15aa" : "#DD4A4A"}; 
    }
    50% {
      background-color:${(p) => (p.styler === "start") ? "#aa15a8" : "#F27C7C"};  ;
    }
    100% {
     background-color:  ${(p) => (p.styler === "start") ? "#7b15aa" : "#DD4A4A"}; 
    }
  }

  gap: 10px;

  transition: 1s ease;

  cursor: pointer;
`;

export const TextArea = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SvgArea = styled.div<Prop>`
  width: ${(p) => p.styler};
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const TextTitle = styled.h2`
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  font-family: "Poppins";
`;
