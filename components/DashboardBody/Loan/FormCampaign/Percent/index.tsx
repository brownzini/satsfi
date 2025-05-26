import {
  FieldContainer,
  FieldInput,
  FieldInputContainer,
  FieldTitle,
  TitleContainer,
} from "../styles";

interface Props {
  percent: number;
  setPercent: (percent: number) => void;
  percentError: boolean;
  setPercentError: (percentError: boolean) => void;
}

export default function Percent({
  percent,
  setPercent,
  percentError,
  setPercentError,
}: Props) {
  return (
    <FieldContainer>
      <TitleContainer>
        <FieldTitle>Porcentagem:</FieldTitle>
      </TitleContainer>
      <FieldInputContainer>
        <FieldInput
          haserror={percentError.toString()}
          type="number"
          placeholder="Min 1%"
          value={percent}
          onChange={(event) => setPercent(Number(event.target.value))}
          onClick={() => setPercentError(false)}
        />
      </FieldInputContainer>
    </FieldContainer>
  );
}
