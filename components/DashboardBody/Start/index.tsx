import { useEffect, useState } from "react";

import { Container, ConvertSatoshis, SvgArea } from "./styles";

//Component
import ButtonComponent from "./ButtonComponent";

//Utils
import SvgModel from "@/utils/svg";

//Contexts
import { useData } from "@/contexts/useData";

//Websocket
import WebSocketService from "../../../websocket";
import { useActiveWs } from "@/contexts/useActiveWs";
import { useCampaign } from "@/contexts/campaignContext";
import Field from "../Field";
import getBtcPrice from "@/utils/getBtcPrice";
import { useMessage } from "@/contexts/useMessage";

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
  const { btcPrice }= useMessage()

  const [buttonState, setButtonState] = useState<ButtonStateProps>({
    start: {
      status: !wsConfig,
      color: "#D16EFF, #7B15AA",
    },
    stop: {
      status: wsConfig,
      color: "#F27C7C, #DD4A4A",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [minAmount, setMinAmount] = useState<string>("0");

  const toggleButtonState = (buttonName: ButtonName) => {
    setButtonState((prevState) => {
      const newState = { ...prevState };

      for (let key in newState) {
        newState[key as ButtonName].status = false;
      }

      newState[buttonName].status = true;

      return newState;
    });
  };

  const getActiveButton = (): ButtonName => {
    for (let key in buttonState) {
      if (buttonState[key as ButtonName].status) {
        return key as ButtonName;
      }
    }
    return "start";
  };

  const getButtonName = () => {
    const name = getActiveButton();
    switch (name) {
      case "start":
        return "Iniciar";
      case "stop":
        return "Parar";
    }
  };

  const handleActiveHub = (param: string) =>
    updateData("isActiveHub", param === "start");

  const handleClick = () => {
    const activedButton = getActiveButton();
    const getNextButton = activedButton === "start" ? "stop" : "start";

    handleActiveHub(activedButton);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    toggleButtonState(getNextButton);

    if (data.generateKey.keyHub && activedButton === "start") {
      const ddp = campaign ? campaign.total_percent : 1;
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
    } else {
      if (wsConfig) {
        wsConfig.close();
        setWsConfig(null);
        setActiveWs(false);
      }
    }
  };

  const handleRenderingPrice = (minAmount: string) => {
    const toNumber = Number(minAmount.replace(/[,.]/g, ""));
    const converted = Number(toNumber * btcPrice).toFixed(2);;
    return "Converter -> R$ " + converted+'\n';
  };

  return (
    <Container className="flex">
      {!isLoading ? (
        <ButtonComponent
          buttonState={buttonState}
          getActiveButton={getActiveButton}
          getButtonName={getButtonName}
          handleClick={handleClick}
        />
      ) : (
        <SvgArea className="flex">
          <SvgModel name="loading" width="50%" height="50%" />
        </SvgArea>
      )}
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
