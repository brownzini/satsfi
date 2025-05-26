import styled from "styled-components";

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeaderContent = styled.div`
  width: 100%;
  height: 40%;
  justify-content: space-around;
`;

export const CardContainer = styled.div`
  width: 25%;
  height: 30%;
  position: relative;
  border-radius: 10px;
  border: 1px solid #6f9bcb;
`;

export const CardWrapper = styled.div`
  width: auto;
  height: 50%;
  background-color: white;
  position: absolute;
  padding-left: 3%;
  padding-right: 3%;
  top: -25%;
`;

export const CardHeaderText = styled.div`
  color: #6f9bcb;
  font-weight: 300;
  font-family: "Inter", Courier, monospace;

  @media (min-width: 1900px) {
    font-size: 1.2rem;
  }
  @media (min-width: 2500px) {
    font-size: 1.6rem;
  }
`;

export const CardBodyText = styled.div`
  color: #6f9bcb;
  font-weight: bolder;
  font-family: "Inter", Courier, monospace;
  text-align: center;
  white-space: pre-line;
  @media (min-width: 1900px) {
    font-size: 1.2rem;
  }
  @media (min-width: 2500px) {
    font-size: 1.6rem;
  }
`;

export const BodyContent = styled.div`
  width: 100%;
  height: 20%;
`;

export const BodyButton = styled.button`
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
    font-size: 1.2rem;
    height: 50%;
  }
`;

export const FinishButton = styled.button`
  width: 100%;
  height: 70%;
  max-width: 250px;

  color: white;
  font-size: 1rem;
  font-family: "Roboto";
  font-weight: bold;

  text-align: center;

  background-color: #e64747;

  &:hover {
    color: #e64747;
    background-color: white;
    border: 1px solid #e64747;
  }

  border-radius: 4px;
  border: none;

  transition: 0.4s ease-in;

  cursor: pointer;
  user-select: none;

  @media (min-width: 1900px) {
    font-size: 1.2rem;
    height: 50%;
  }
  @media (min-width: 2500px) {
    font-size: 1.6rem;
  }
`;

export const FooterContent = styled.div`
  width: 100%;
  height: 40%;
`;

export const FooterText = styled.h2`
  width: 75%;
  color: #3c5774;
  font-weight: 200;
  font-family: "Inter", Courier, monospace;
  text-align: center;
  @media (min-width: 1900px) {
    font-size: 2rem;
  }
  @media (min-width: 2500px) {
    font-size: 2.5rem;
  }
`;
