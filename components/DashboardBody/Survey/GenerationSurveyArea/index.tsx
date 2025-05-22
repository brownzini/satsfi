import SvgModel from "@/utils/svg";
import Field from "../../Field";
import {
  DescriptionArea,
  GenerationArea,
  GenerationWrapper,
  LeftSideArea,
  OptionSvgArea,
  OptionsWrapper,
  RightSideArea,
  TextArea,
  Text,
  OptionsList,
  InputWrapper,
  InputArea,
  Input,
  RemoveArea,
  MessageErrorArea,
  SaveButtoArea,
  BackButton,
  CreateButton,
  CreateSurveyArea,
  TitleArea,
  Title,
  SvgArea,
  ButtonArea,
  Button,
} from "../styles";
import { Dispatch, SetStateAction } from "react";
import { OptionsProps } from "@/utils/types";

interface Props {
  surveyCreated: boolean;
  errorTitle: boolean;
  surveyTitle: string;
  setSurveyTitle: Dispatch<SetStateAction<string>>;
  removeErrorTitle: () => void;
  errorMinToVote: boolean;
  minToVote: string;
  setMinToVote: Dispatch<SetStateAction<string>>;
  addOption: () => void;
  removeMinToVoteError: () => void;
  options: OptionsProps[];
  handleChange: (index: number, value: string, maxLength: number) => void;
  removeOption: (id: string) => void;
  errorOptions: boolean;
  handleReset: () => void;
  handleCreate: () => Promise<void>;
  isSurveyCreated: boolean;
  titleAreaRendering: () => "Enquete expira em" | "Vencedor da enquete";
  timerRendering: () => JSX.Element;
  handleClickSurvey: () => Promise<void>;
}

export default function GenerationSurveyArea({
  surveyCreated,
  errorTitle,
  surveyTitle,
  setSurveyTitle,
  removeErrorTitle,
  errorMinToVote,
  minToVote,
  setMinToVote,
  addOption,
  removeMinToVoteError,
  options,
  handleChange,
  removeOption,
  errorOptions,
  handleReset,
  handleCreate,
  isSurveyCreated,
  titleAreaRendering,
  timerRendering,
  handleClickSurvey,
}: Props) {
  return (
    <GenerationArea className="flex">
      {surveyCreated ? (
        <GenerationWrapper className="flex">
          <LeftSideArea>
            <br />
            <br />
            <Field
              type="title"
              center={`
                                    height: 15%;
                                    justify-content: flex-start;
                                    padding-left: 12%;

                                    @media only screen and (min-height: 900px) {
                                        height: 10%;
                                    }
                                `}
              text="Titulo: "
              styler={`
                                    color: ${!errorTitle ? "#3C5774" : "red"};
                                    font-size: 1.6rem;
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
                                    justify-content: flex-start;
                                    padding-left: 12%;
                                    
                                `}
              styler={`
                                    width: 75%;
                                    height: 100%;

                                    border-radius: 5px;

                                    color: ${!errorTitle ? "#6a5212" : "red"};
                                    font-family: "Roboto";
                                    font-weight: 400;
                                    font-size: 1.2rem;

                                    padding-left: 10%;
                                    
                                    @media only screen and (min-height: 900px) {
                                        width: 100%;
                                        font-size: 2rem;
                                    }
                                `}
              maxLength={50}
              inputType="text"
              placeholder="Até 50 carac..."
              inputValue={surveyTitle}
              setInputValue={setSurveyTitle}
              onClick={removeErrorTitle}
            />
            <br />
            <Field
              type="title"
              center={`
                                    height: 14%;
                                    justify-content: flex-start;
                                    padding-left: 12%;
                                    
                                    @media only screen and (min-height: 900px) {
                                        height: 12%;
                                    }

                                    @media only screen and (max-width: 1500px) {
                                        height: 12%;
                                    }
                                `}
              text="Mínimo para votar: "
              styler={`
                                    transition: 0.3s;
                                    color: ${
                                      !errorMinToVote ? "#3C5774" : "red"
                                    };
                                    font-size: 1.6rem;
                                    font-family: "Inter";
                                    font-weight: bold;
                                    word-wrap: break-word;

                                    @media only screen and (min-height: 900px) {
                                        font-size: 1.6rem;
                                    }
                                `}
            />
            <Field
              type="input"
              center={`
                                    width: 100%;
                                    height: 10%;
                                    justify-content: flex-start;
                                    padding-left: 12%;
                                `}
              styler={`
                                    width: 75%;
                                    height: 100%;

                                    border-radius: 5px;

                                    transition: 0.3s;
                                    color: ${
                                      !errorMinToVote ? "#6a5212" : "red"
                                    };
                                    font-family: "Roboto";
                                    font-weight: 400;
                                    font-size: 1.2rem;

                                    padding-left: 10%;

                                    @media only screen and (min-height: 900px) {
                                        width: 100%;
                                        font-size: 2rem;
                                    }
                                `}
              inputType="price"
              inputValue={minToVote}
              setInputValue={setMinToVote}
              placeholder="Min 100 sats"
              onClick={removeMinToVoteError}
            />
          </LeftSideArea>
          <RightSideArea className="flex fd">
            <OptionsWrapper className="flex fd">
              <DescriptionArea>
                <TextArea>
                  <Text>Criar Opção: </Text>
                </TextArea>
                <OptionSvgArea>
                  <SvgModel
                    name="add"
                    width="100%"
                    height="100%"
                    setFunction={addOption}
                  />
                </OptionSvgArea>
              </DescriptionArea>
              <OptionsList>
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <InputWrapper key={index} className="flex">
                      <InputArea>
                        <Input
                          type="text"
                          placeholder={"Digitar opção "}
                          value={option.name}
                          onChange={(e) =>
                            handleChange(index, e.target.value, 30)
                          }
                        />
                      </InputArea>
                      <RemoveArea onClick={() => removeOption(option.id)}>
                        <SvgModel name="delete" width="100%" height="100%" />
                      </RemoveArea>
                    </InputWrapper>
                  ))
                ) : (
                  <MessageErrorArea className="flex">
                    <h2>
                      {" "}
                      {errorOptions &&
                        `É necessário criar pelo menos 2 opções`}{" "}
                    </h2>
                  </MessageErrorArea>
                )}
              </OptionsList>
            </OptionsWrapper>
            <SaveButtoArea className="flex">
              <BackButton onClick={handleReset}>VOLTAR</BackButton>
              <CreateButton onClick={handleCreate}>CRIAR</CreateButton>
            </SaveButtoArea>
          </RightSideArea>
        </GenerationWrapper>
      ) : (
        <CreateSurveyArea className="flex fd">
          <TitleArea>
            <Title>
              {!isSurveyCreated
                ? "Nenhuma Enquete Gerada"
                : titleAreaRendering()}
            </Title>
          </TitleArea>
          <SvgArea className="flex fd">
            {!isSurveyCreated ? (
              <SvgModel name="addSurvey" width="100%" height="50%" />
            ) : (
              timerRendering()
            )}
          </SvgArea>
          <ButtonArea>
            <Button
              styler={
                !isSurveyCreated
                  ? `
                                    background-color: #3B1170;
                                    &:hover {
                                        background-color: #1E0A37;
                                    }
                                `
                  : `
                                    background-color: #606D6A;
                                    &:hover {
                                        background-color: #606D6A;
                                    }
                                `
              }
              onClick={handleClickSurvey}
            >
              {!isSurveyCreated ? "Gerar nova Enquete" : "Finalizar Enquete"}
            </Button>
          </ButtonArea>
        </CreateSurveyArea>
      )}
    </GenerationArea>
  );
}
