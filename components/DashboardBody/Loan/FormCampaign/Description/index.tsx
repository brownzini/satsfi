import {
  FieldContainer,
  FieldInput,
  FieldInputContainer,
  FieldTitle,
  TitleContainer,
} from "../styles";

interface Props {
  description: string;
  setDescription: (description: string) => void;
  descriptionError: boolean;
  setDescriptionError: (descriptionError: boolean) => void;
}

export default function Description({
  description,
  setDescription,
  descriptionError,
  setDescriptionError,
}: Props) {
  return (
    <FieldContainer>
      <TitleContainer>
        <FieldTitle>Descrição:</FieldTitle>
      </TitleContainer>
      <FieldInputContainer>
        <FieldInput
          haserror={descriptionError.toString()}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="EX: Estou vendendo 1% de participação ... "
          onClick={() => setDescriptionError(false)}
        />
      </FieldInputContainer>
    </FieldContainer>
  );
}
