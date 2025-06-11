import { useEffect, useState } from "react";

import {
  Container,
  ConvertSatoshis,
  ImageArea,
  WrapperImageArea,
  Image,
} from "./styles";

//Utils
import SvgModel from "@/utils/svg";

//Contexts
import { useData } from "@/contexts/useData";

//Websocket
import WebSocketService from "../../../websocket";
import { useActiveWs } from "@/contexts/useActiveWs";
import { useCampaign } from "@/contexts/campaignContext";
import Field from "../Field";
import { useMessage } from "@/contexts/useMessage";
import { filterAmount } from "@/utils/inputFormat";

type ButtonName = "start" | "stop";

interface ButtonProps {
  status: boolean;
  color: string;
}

interface ButtonStateProps {
  start: ButtonProps;
  stop: ButtonProps;
}

export default function Start() {
  const { data, updateData, addDonate } = useData();
  const { wsConfig, setWsConfig, setActiveWs, setsurveySoloDonation } =
    useActiveWs();
  const { campaign } = useCampaign();
  const { btcPrice } = useMessage();

  const [minAmount, setMinAmount] = useState<string>("1");

  useEffect(() => {
    const hasSessionInSocket = sessionStorage.getItem("ws");
    if (!hasSessionInSocket) {
      const ddp = campaign ? campaign.total_percent : 0.95;
      const socket = WebSocketService(
        data.generateKey.idString,
        data.generateKey.keyHub,
        data,
        addDonate,
        updateData,
        setsurveySoloDonation,
        ddp
      );
      setActiveWs(true);
      setWsConfig(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRenderingPrice = (minAmount: string) => {
    const toNumber =
      minAmount !== "" ? Number(minAmount.replace(/[,.]/g, "")) : 1;
    const converted = (toNumber * btcPrice).toFixed(2);
    const strAmount = minAmount !== "" ? minAmount.replace(/[,.]/g, "") : "1";
    return (
      "Hoje " +
      filterAmount(strAmount) +
      " de satoshis valem R$ " +
      filterAmount(converted) +
      "\n"
    );
  };

  return (
    <Container className="flex">
      <ImageArea className="flex">
        <WrapperImageArea className="flex fd">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src="https://res.cloudinary.com/dqq4f9a1l/image/upload/v1749599347/mascote_welcome_i0cat5.png" />
        </WrapperImageArea>
      </ImageArea>

      <ConvertSatoshis className="flex fd">
        <Field
          type="title"
          center={`
                  width: 100%;
                  height: 20%;
                  justify-content: flex-start;
                  padding-left: 25%;
              
                  @media only screen and (min-height: 900px) {
                      height: 20%;
                  }
              `}
          text={handleRenderingPrice(minAmount)}
          styler={`
                  transition: 0.5s ease;
                  color: ${true ? "#3C5774" : "red"};
                  font-size: 1.2rem;
                  font-family: "Inter";
                  font-weight: bold;
              
                  @media only screen and (min-height: 900px) {
                      font-size: 2rem;
                  }
              `}
        />
        <Field
          type="input"
          center={`
            width: 100%;
            height: 12%;
            padding-left: 25%;
        `}
          styler={`
            width: 70%;
            height: 100%;
        
            border-radius: 5px;
        
            color: ${!false ? "#6a5212" : "red"};
            font-family: "Roboto";
            font-weight: 400;
            font-size: 1.2rem;
        
            transition: 0.5s ease;
        
            padding-left: 5%;
            outline:none;
        
            @media only screen and (min-height: 900px) {
                font-size: 1.6rem;
            }
        `}
          inputType="price"
          inputValue={minAmount}
          setInputValue={setMinAmount}
          placeholder="Digite qualquer valor"
        />
      </ConvertSatoshis>
    </Container>
  );
}
