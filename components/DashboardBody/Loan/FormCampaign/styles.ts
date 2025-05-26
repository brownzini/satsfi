import styled from "styled-components";

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const TermsContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;

  @media (min-width: 1600px) {
    margin-top: 2%;
  }
  @media (min-width: 1900px) {
    margin-top: 5%;
    gap: 0px;
  }
`;

export const FieldContainer = styled.div`
  width: 75%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2%;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 25%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const FieldTitle = styled.h2`
  color: #3c5774;
  font-weight: bolder;
  font-family: "Inter", Courier, monospace;
  @media (min-width: 1900px) {
    font-size: 1.4rem;
  }
  @media (min-width: 3000px) {
    font-size: 2rem;
  }
`;

export const FieldInputContainer = styled.div`
  width: 100%;
  height: 50%;
`;

interface ErrorProps {
  haserror: string;
}

export const FieldInput = styled.input<ErrorProps>`
  width: 100%;
  height: 100%;
  border: 1px solid ${(p) => (p.haserror === "true" ? "red" : "black")};
  outline: none;

  font-size: 1rem;
  font-weight: 400;
  font-family: "Inter";

  background-color: white;

  padding-left: 5%;
  padding-right: 5%;
  border-radius: 4px;

  @media (min-width: 1900px) {
    font-size: 1.6rem;
  }
  @media (min-width: 3000px) {
    font-size: 2rem;
  }
  cursor: pointer;
`;

export const TermArea = styled.div`
  width: 75%;
  height: 20%;
  gap: 2%;
  justify-content: flex-start;
`;

export const ButtonTermArea = styled.div`
  width: 75%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2%;
`;

export const CreateButton = styled.button`
  width: 100%;
  height: 70%;
  max-width: 250px;

  color: white;
  font-size: 1.4rem;
  font-family: "Roboto";
  font-weight: bold;

  text-align: center;

  background-color: #6f9bcb;

  &:hover {
    color: #6f9bcb;
    background-color: white;
    border: 1px solid #6f9bcb;
  }

  border-radius: 4px;
  border: none;

  transition: 0.4s ease-in;

  cursor: pointer;
  user-select: none;

  @media (min-width: 1900px) {
    font-size: 2rem;
    height: 50%;
  }
`;

export const BackButton = styled.button`
  width: 100%;
  height: 70%;
  max-width: 250px;

  color: #c62c24;
  font-size: 1.4rem;
  font-family: "Roboto";
  font-weight: bold;

  text-align: center;

  background-color: white;

  &:hover {
    color: white;
    background-color: #c62c24;
    border: none;
  }

  border-radius: 4px;
  border: 1px solid #c62c24;

  transition: 0.4s ease-in;

  cursor: pointer;
  user-select: none;

  @media (min-width: 1900px) {
    font-size: 2rem;
    height: 50%;
  }
`;

export const TitleTerm = styled.h3`
  color: #3c5774;
  font-weight: 400;
  font-family: "Inter", Courier, monospace;
  text-align: left;

  @media (max-width: 900px) {
    font-size: 0.80rem;
  }
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
  @media (min-width: 1900px) {
    font-size: 1.6rem;
  }
  @media (min-width: 2500px) {
    font-size: 2rem;
  }
  @media (min-width: 3000px) {
    font-size: 2.5rem;
  }
`;

export const SubTitleTerm = styled.h2`
  color: #3c5774;
  font-weight: bolder;
  font-family: "Inter", Courier, monospace;
  text-align: left;
  @media (max-width: 900px) {
    font-size: 1.1rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
  @media (min-width: 1900px) {
    font-size: 2rem;
  }
  @media (min-width: 2500px) {
    font-size: 2.5rem;
  }
  @media (min-width: 3000px) {
    font-size: 3rem;
  }
`;
interface ErrorProps {
  haserror: string;
}

export const CheckBox = styled.input.attrs({ type: "checkbox" })<ErrorProps>`
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${(p) => (p.haserror === "true" ? "red" : "#555")};
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  margin-right: 8px;

  &:checked {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  &:checked::after {
    content: "✔";
    color: white;
    position: absolute;
    top: 0;
    left: 3px;
    font-size: 14px;
  }

  &:hover {
    filter: brightness(0.9);
  }

  transition: 0.4s ease;
`;
