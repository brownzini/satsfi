import {
  FieldContainer,
  FieldInput,
  FieldInputContainer,
  FieldTitle,
  TitleContainer,
} from "../styles";

interface Props {
  amount: number;
  setAmount: (amount: number) => void;
  amountError: boolean;
  setAmountError: (amountError: boolean) => void;
}

export default function Amount({
  amount,
  setAmount,
  amountError,
  setAmountError,
}: Props) {
  return (
    <FieldContainer>
      <TitleContainer>
        <FieldTitle>Valor:</FieldTitle>
      </TitleContainer>
      <FieldInputContainer>
        <FieldInput
          type="number"
          haserror={amountError.toString()}
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          placeholder="EX: Valor minimo 16,000 de satoshis ... "
          onClick={() => setAmountError(false)}
        />
      </FieldInputContainer>
    </FieldContainer>
  );
}
