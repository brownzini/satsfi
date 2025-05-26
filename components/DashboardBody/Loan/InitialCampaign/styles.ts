import styled from "styled-components";

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImgContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: flex-end;
`;

export const Img = styled.img`
  width: 30%;
  max-width: 150px;
  min-width: 150px;
  object-fit: cover;
  border-radius: 55%;
  @media (min-width: 1900px) {
    max-width: 250px;
  }
`;

export const BodyContainer = styled.div`
  width: 100%;
  height: 25%;
`;

export const TextContainer = styled.h3`
  font-weight: 300;
  font-family: "Inter", Courier, monospace;
  text-align: center;
  @media (min-width: 1900px) {
    font-size: 2rem;
    height: 50%;
  }
`;

export const FooterContainer = styled.div`
  width: 100%;
  height: 25%;
  align-items: flex-start;
`;

export const CreateButton = styled.div`
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
