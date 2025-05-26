import { useState } from "react";
import Amount from "./Amount";
import Description from "./Description";
import Percent from "./Percent";
import Period from "./Period";
import {
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
import { useMessage } from "@/contexts/useMessage";

export default function FormCampaign() {
  const { dispatchMessage } = useMessage();

  const [description, setDescription] = useState<string>("");
  const [percent, setPercent] = useState<number>(100);
  const [amount, setAmount] = useState<number>(16000);
  const [period, setPeriod] = useState<Date | null>(null);

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
      setDescription(text);
    } else {
      setDescription(text.slice(0, -1));
    }
  }

  function onChangePercent(text: number) {
    if (typeof text === "number") {
      if (percent <= 100) {
        setPercent(text);
      } else {
        setPercent(100);
      }
    }
  }

  function validationFields() {
    const hasDescriptionNotOK = (description.length > 100 || description === "");
    const hasPercentNotOK = (percent > 100 || percent <= 0);
    const hasAmountNotOK = amount <= 0;
    const hasPeriodNotOK = (period === null || period === undefined);

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
        "[ERRO]: Preencha Todos os campos corretamente !!",
        false
      );
      return false;
    } else {
      return true;
    }
  }

  async function handleSave() {
    const result = validationFields();
    if(result) {
      console.log("pronto pra ir pro banco de dados")
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
          setAmount={setAmount}
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
        <ButtonTermArea className="flex fd">
          <CreateButton className="flex" onClick={handleSave}>CRIAR</CreateButton>
        </ButtonTermArea>
      </TermsContainer>
    </MainContent>
  );
}
