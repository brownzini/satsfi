import {
  FieldContainer,
  FieldInput,
  FieldInputContainer,
  FieldTitle,
  TitleContainer,
} from "../styles";

interface Props {
  handleChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  periodError: boolean;
  setPeriodError: (periodError: boolean) => void;
}

export default function Period({ periodError, setPeriodError, handleChangeDate }: Props) {
  return (
    <FieldContainer>
      <TitleContainer>
        <FieldTitle>Valido até:</FieldTitle>
      </TitleContainer>
      <FieldInputContainer>
        <FieldInput
          haserror={periodError.toString()}
          type="date"
          onChange={handleChangeDate}
          placeholder="25/05/2025"
          onClick={() => setPeriodError(false)}
        />
      </FieldInputContainer>
    </FieldContainer>
  );
}
