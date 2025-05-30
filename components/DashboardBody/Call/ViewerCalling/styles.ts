import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const NameContainer = styled.div`
  width: 100%;
  height: 50%;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  width: 70%;
  height: 50%;
  gap: 2%;
`;

export const NameTitle = styled.h2`
  width: 75%;
  font-weight: 300;
  font-family: "Inter", Courier, monospace;
  color: #533b69;
  text-align: center;
  font-size: 1.2rem;

  @media (min-width: 2500px) {
    font-size: 2rem;
  }
`;

export const ConfirmButton = styled.button`
  width: 50%;
  height: 50%;
  color: white;

  border-radius: 4px;

  font-size: 1.4rem;
  font-weight: 480;
  font-family: "Roboto";

  outline: none;
  border: 1px solid #acf76f;

  background-color: #7faf57;

  transition: 0.5s ease;

  &:hover {
    background-color: #3a6119;
  }

  cursor: pointer;

  @media (min-width: 2500px) {
    font-size: 2rem;
  }
`;

export const RejectButton = styled.button`
  width: 50%;
  height: 50%;
  color: white;

  border-radius: 4px;

  font-size: 1.4rem;
  font-weight: 480;
  font-family: "Roboto";

  outline: none;
  border: 1px solid #910c0c;

  background-color: #eb5252;

  transition: 0.5s ease;

  &:hover {
    background-color: #822121;
  }

  @media (min-width: 2500px) {
    font-size: 2rem;
  }

  cursor: pointer;
`;
