import { Dispatch, SetStateAction, useState } from "react";
import Amount from "./Amount";
import Description from "./Description";
import Percent from "./Percent";
import Period from "./Period";
import {
  BackButton,
  ButtonTermArea,
  CheckBox,
  CreateButton,
  InputContainer,
  MainContent,
  SubTitleTerm,
  TermArea,
  TermsContainer,
  TitleTerm,
} from "./styles";
import { filterAmount } from "@/utils/inputFormat";
import { updateLoan } from "@/app/firebase/services/Loan";
import { useCampaign } from "@/contexts/campaignContext";

interface Props {
  handle: string;
  setScreen: Dispatch<SetStateAction<string>>;
  dispatchMessage: (msg: string, type: boolean, time?: number) => void;
}

export default function FormCampaign({
  handle,
  setScreen,
  dispatchMessage,
}: Props) {
  const { campaign, setCampaign } = useCampaign();

  const [description, setDescription] = useState<string>("");
  const [percent, setPercent] = useState<number>(95);
  const [amount, setAmount] = useState<number>(10000);
  const [period, setPeriod] = useState<Date | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [percentError, setPercentError] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<boolean>(false);
  const [periodError, setPeriodError] = useState<boolean>(false);
  const [checkBoxError, setCheckBoxError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(new Date(event.target.value));
  };

  function onChangeDescription(text: string) {
    if (description.length <= 100) {
      setDescription(text.replace(/[,.]/g, ""));
    } else {
      setDescription(text.slice(0, -1));
    }
  }

  function onChangePercent(text: number) {
    if (typeof text === "number") {
      if (percent <= 95) {
        setPercent(Math.round(text));
      } else {
        setPercent(95);
      }
    }
  }

  function onChangeAmount(text: number) {
    if (typeof text === "number") {
      if (amount > 0 && amount < 1000000000000) {
        setAmount(Math.round(text));
      } else {
        setAmount(1);
      }
    }
  }

  function validationFields() {
    const total_percent = campaign ? campaign?.total_percent * 100 : 95;

    const hasDescriptionNotOK = description.length > 100 || description === "";
    const hasPercentNotOK = percent > total_percent || percent <= 0;
    const hasAmountNotOK = amount <= 0;
    const hasPeriodNotOK =
      period === null || period === undefined || period < new Date();

    if (
      hasDescriptionNotOK ||
      hasPercentNotOK ||
      hasAmountNotOK ||
      hasPeriodNotOK ||
      !isChecked
    ) {
      if (hasDescriptionNotOK) setDescriptionError(true);
      if (hasPercentNotOK) setPercentError(true);
      if (hasAmountNotOK) setAmountError(true);
      if (hasPeriodNotOK) setPeriodError(true);
      if (!isChecked) setCheckBoxError(true);

      dispatchMessage(
        "[ERRO]: Não é possivel criar a campanha nessa configuração !!",
        false
      );

      return false;
    } else {
      return true;
    }
  }

  async function handleSave(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.detail > 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 10 * 1000);
      return;
    }

    const result = validationFields();

    if (result) {
      const open_in = new Date().toString();

      const total_percent = campaign ? campaign.total_percent : 0.95;
      const total_campaign = campaign ? campaign.total_campaign + 1 : 0;

      const response = await updateLoan(handle, {
        description,
        percent_sale: percent / 100,
        total_campaign,
        sale_amount: amount,
        expiration_date: period + "",
        open_in,
        total_percent,
      });

      if (response) {
        setCampaign({
          description,
          total_percent,
          total_campaign,
          size: campaign ? campaign.size : 0,
          open_in,
        });
        setScreen("dashboardCampaign");
        dispatchMessage("[SUCESSO]: CAMPANHA CRIADA !!", true);
      } else {
        dispatchMessage("[ERRO]: NÃO FOI POSSIVEL CRIAR A CAMPANHA !!", true);
      }
    }
  }

  return (
    <MainContent className="flex">
      <InputContainer className="flex fd">
        <Description
          descriptionError={descriptionError}
          setDescriptionError={setDescriptionError}
          description={description}
          setDescription={onChangeDescription}
        />
        <Percent
          percent={percent}
          setPercent={onChangePercent}
          percentError={percentError}
          setPercentError={setPercentError}
        />
        <Amount
          amount={amount}
          setAmount={onChangeAmount}
          amountError={amountError}
          setAmountError={setAmountError}
        />
        <Period
          handleChangeDate={handleChangeDate}
          periodError={periodError}
          setPeriodError={setPeriodError}
        />
      </InputContainer>
      <TermsContainer className="flex fd">
        <TermArea className="flex fd">
          <TitleTerm>
            Quem pagar pelo valor de{" "}
            <b>{filterAmount(amount.toString())} satoshis</b> terá um direito de
            participação (DDP) de <b>{percent}%</b> sobre <b>TODAS</b> as suas
            transações.
          </TitleTerm>
        </TermArea>
        <TermArea className="flex">
          <SubTitleTerm>
            Ao receber o valor, a distribuição para o DDP começa automaticamente
            sem pré definição de datas
          </SubTitleTerm>
        </TermArea>
        <TermArea className="flex">
          <CheckBox
            haserror={checkBoxError.toString()}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            onClick={() => setCheckBoxError(true)}
          />
          <TitleTerm>Concordo</TitleTerm>
        </TermArea>
        <ButtonTermArea className="flex">
          <CreateButton disabled={loading} onClick={async (event: any) => await handleSave(event)}>
            CRIAR
          </CreateButton>
          <BackButton onClick={() => setScreen("dashboardCampaign")}>
            VOLTAR
          </BackButton>
        </ButtonTermArea>
      </TermsContainer>
    </MainContent>
  );
}
