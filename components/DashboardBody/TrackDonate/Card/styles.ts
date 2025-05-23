import styled from "styled-components";

export const WrapperDonationCard = styled.div``;

export const Header = styled.div`
  width: 100%;
  height: 16%;

  @media only screen and (min-height: 900px) {
    padding-top: 4%;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NameArea = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-top: 3%;
  padding-left: 4%;
`;

export const NameTitle = styled.h3`
  color: #6d357b;
  font-family: "Inter";
  font-weight: bold;
  font-style: italic;
  font-size: 1.24rem;

  @media only screen and (min-height: 900px) {
    font-size: 1.4rem;
  }
`;

export const AmountArea = styled.div`
  width: 100%;
  height: 100%;
`;

export const SatoshiSvgArea = styled.div`
  width: 20%;
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const PriceArea = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding-top: 2%;
  padding-right: 7%;
`;

export const PriceTitle = styled.h3`
  color: #f4b000;
  font-family: "Inter";
  font-weight: bold;
  font-style: italic;
  font-size: 1.6rem;

  @media only screen and (min-height: 900px) {
    font-size: 1.4rem;
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
`;

export const DescriptionArea = styled.div`
  overflow-y: scroll;

  &:-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none; /* Esconde a barra */
  -ms-overflow-style: none;
`;

export const DescriptionTitle = styled.h2`
  width: 97%;
  color: #143707;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2.1rem;
  word-wrap: break-word;
  font-family: "Open sans";
`;

export const Audio = styled.audio`
  width: 84%;
`;
