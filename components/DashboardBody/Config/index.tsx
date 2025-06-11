import { useState } from "react";
import {
  Amounts,
  Container,
  DescriptionArea,
  PercentArea,
  Setups,
  VolumeTitle,
  WrapperContainer,
} from "./styles";

//Components
import Field from "../Field";

import { useData } from "@/contexts/useData";
import { useMessage } from "@/contexts/useMessage";
import { updateConfig } from "@/app/firebase/services/Users";

export default function Config() {
  const { data, updateData } = useData();

  const [minAmount, setMinAmount] = useState<string>(data.config.minDonate);
  const [allowDonate, setAllowDonate] = useState<boolean>(data.config.allow);
  const [donationVolume, setDonationVolume] = useState<number>(
    data.config.alertVolume
  );
  const [durationDonate, setDurationDonate] = useState<number>(
    data.config.durationAlert
  );

  const [haveError, setHaveError] = useState<boolean>(false);

  const { dispatchMessage } = useMessage();

  const notChanged = () => {
    const validateMinAmount = data.config.minDonate === minAmount;
    const validateAllowDonate = data.config.allow === allowDonate;
    const validateDonationVolume = data.config.alertVolume === donationVolume;
    const validateDurationDonate = data.config.durationAlert === durationDonate;

    return (
      validateMinAmount &&
      validateAllowDonate &&
      validateDonationVolume &&
      validateDurationDonate
    );
  };

  const validationField = async () => {
    const hasNotChanged = notChanged();
    const priceFiltered = parseInt(minAmount.replace(/[,.]/g, ""));
    if (minAmount === "" || Number.isNaN(priceFiltered)) {
      setMinAmount("Preencha o campo");
      setHaveError(true);
    } else if (priceFiltered < 500) {
      setMinAmount("Valor minimo é de 500 sats");
      setHaveError(true);
    } else if (!hasNotChanged) {
      updateData("config", {
        allow: allowDonate,
        minDonate: minAmount.replace(/[,.]/g, ""),
        alertVolume: donationVolume,
        durationAlert: durationDonate,
      });
      if (
        data.config.minDonate.replace(/[,.]/g, "") !==
        minAmount.replace(/[,.]/g, "")
      ) {
        await updateConfig(
          data.generateKey.idString,
          JSON.stringify({
            config: {
              allow: true,
              minDonate: Number(minAmount.replace(/[,.]/g, "")),
            },
            survey: data.survey,
            chromaKey: data.chromaKey,
            call: data.call,
            generateKey: data.generateKey,
            test: {
              allow: true,
            },
            trackDonate: [],
            blackList: data.blackList,
            donations: [],
            qrCode: data.qrCode,
            isActiveHub: data.isActiveHub,
          })
        );
      }
      dispatchMessage("[SUCESSO]: Alterações salvas", true, 3000);
    }
  };

  const hiddeError = () => {
    setHaveError(false);
  };

  return (
    <Container className="flex">
      <WrapperContainer className="flex">
        <Amounts className="flex fd">
          <Field
            type="title"
            center={`
    height: 10%;
    justify-content: flex-start;
    padding-left: 25%;

    @media only screen and (min-height: 900px) {
        height: 20%;
    }
`}
            text="Mínimo de satoshi por donate"
            styler={`
    transition: 0.5s ease;
    color: ${!haveError ? "#3C5774" : "red"};
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
    height: 10%;
    padding-left: 25%;
`}
            styler={`
    width: 70%;
    height: 100%;

    border-radius: 5px;

    color: ${!haveError ? "#6a5212" : "red"};
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
            onClick={hiddeError}
            inputValue={minAmount}
            setInputValue={setMinAmount}
            disabled={!allowDonate}
            placeholder="Minimo de 500 Sats"
          />
          <br />
          <Field
            type="title"
            center={`
    height: 10%;
    justify-content: flex-start;
    padding-left: 25%;
`}
            text="Permitir donates"
            styler={`
    color: #3C5774;
    font-size: 1.2rem;
    font-family: "Inter";
    font-weight: bold;

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }
`}
          />
          <Field
            type="toggle"
            center={`
    height: 10%;
    justify-content: flex-start;
    padding-left: 25%;
`}
            styler={`
 
`}
            checked={true}
            setChecked={setAllowDonate}
          />
          <br />
          <br />
          <Field
            type="button"
            center={`
    width: 100%;
    height: 20%;
    justify-content: flex-start;
    padding-left: 25%;
   
`}
            text="Salvar"
            styler={`
    width: 25%;
    height: 70%;
    color: white;
    font-size: 1.4rem;
    font-family: 'Poppins';
    font-weight: bold;

    border: none;
    border-radius: 5px;
    background-color: #07CCA1;

    transition: 1s;

    &:hover {
        background-color: #11977a;
    }

    @media only screen and (min-height: 900px) {
        font-size: 2rem;
    }

    cursor:pointer;
`}
            onClick={validationField}
          />
        </Amounts>
      </WrapperContainer>
    </Container>
  );
}
