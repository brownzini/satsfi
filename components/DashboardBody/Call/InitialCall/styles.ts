import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const CallHeader = styled.div`
  width: 84%;
  height: 30%;
  gap: 5%;
`;

export const CallsTotal = styled.div`
  width: 100%;
  height: 75%;
  border-radius: 10px;
  border: 1px solid #44576c;
`;

export const RecivedCallsTotal = styled.div`
  width: 100%;
  height: 75%;
  border-radius: 10px;
  border: 1px solid #44576c;
`;

export const RecivedCallsTotalTitleArea = styled.div`
  width: 100%;
  height: 50%;
  align-items: flex-end;
`;

export const CallsTotalTitleArea = styled.div`
  width: 70%;
  height: 100%;
  border-right: 1px solid #44576c;
`;
export const CallsTotalTitle = styled.p`
  color: #44576c;
  font-family: "Inter", Courier, monospace;
  font-weight: 300;
`;
export const CallsTotalSubTitleArea = styled.div`
  width: 30%;
  height: 100%;
`;
export const RecivedCallsTotalSubTitleArea = styled.div`
  width: 100%;
  height: 100%;
`;

export const CallsTotalSubTitle = styled.h2`
  font-weight: bolder;
  font-family: "Inter", Courier, monospace;
  color: #44576c;
`;

export const CallBody = styled.div`
  width: 100%;
  height: 50%;
`;

export const NoCallMessage = styled.h2`
  color: #44576c;
  font-family: "Inter", Courier, monospace;
  font-weight: bolder;
  text-align: center;
  width: 70%;
`;