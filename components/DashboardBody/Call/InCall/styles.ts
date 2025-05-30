import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70%;
`;

export const ViewerWrapperContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 75%;
  position: relative;
  @media (min-width: 1000px) {
    height: 100%;
  }
`;

export const ImageContent = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 100%;
  position: absolute;
  height: 100%;
`;

export const ImageArea = styled.div`
  width: 70%;
  height: 100%;
  background-color: white;
  border-radius: 100%;
  border: 10px solid #2d9f6c;
  position: relative;

  @media (min-width: 1000px) {
    width: 50%;
  }
`;

export const ViewerNameContainer = styled.div`
  width: auto;
  height: auto;
  background-color: #2d9f6c;
  position: absolute;
  top: 75%;
  border-radius: 5px;
  min-height: 30%;
  min-width: 100%;
`;

export const ViewerName = styled.h2`
  font-weight: bolder;
  font-family: "Inter", Courier, monospace;
  color: white;
  overflow-wrap: anywhere;
  text-align: center;
`;

export const BodyContainer = styled.div`
  width: 100%;
  height: 30%;
  align-items: flex-start;
`;

export const AudioContainer = styled.div`
  width: 50%;
  height: 84%;
`;

export const CanvasArea = styled.canvas`
  width: 100%;
  height: 100%;
`;

export const Video = styled.video`
  display: none;
`;

export const FooterContainer = styled.div`
  width: 100%;
  height: 30%;
  align-items: flex-start;
`;

export const ButtonFooter = styled.button`
  width: 50%;
  height: 75%;
  color: white;

  border-radius: 4px;

  font-size: 1.4rem;
  font-weight: bolder;
  font-family: "Roboto";

  outline: none;
  border: none;

  background-color: #e03c3c;

  transition: 0.5s ease;

  &:hover {
    background-color: #c53030;
  }

  @media (min-width: 1000px) {
    font-size: 1rem;
  }

  @media (min-width: 1900px) {
    font-size: 1.4rem;
  }

  cursor: pointer;
`;
