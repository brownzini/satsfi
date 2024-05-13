import {
    BackButton,
    Button,
    ButtonArea,
    Container,
    ControlArea,
    CreateButton,
    CreateSurveyArea,
    DescriptionArea,
    DurationArea,
    GenerationArea,
    GenerationWrapper,
    Input,
    InputArea,
    InputWrapper,
    LeftSideArea,
    OptionSvgArea,
    OptionsList,
    OptionsWrapper,
    RemoveArea,
    RightSideArea,
    SaveArea,
    SaveButtoArea,
    SaveButton,
    SvgArea,
    Text,
    TextArea,
    TimeTitle,
    TimerArea,
    Title,
    TitleArea,
} from "./styles";

import Field from "../Field";
import SvgModel from "@/utils/svg";
import { useState } from "react";

interface OptionsProps {
    id: string;
    name: string;
    votes: string;
}

export default function Survey() {

    const [surveyCreated, setSurveyCreated] = useState<boolean>(false);
    const [surveyTitle, setSurveyTitle] = useState<string>('');
    const [surveyStatus, setSurveyStatus] = useState<boolean>(true);
    const [minCreateSurvey, setMinCreateSurvey] = useState<string>('');
    const [minToVote, setMinToVote] = useState<string>('');

    const [surveyTime, setSurveyTime] = useState<number>(1);

    const [options, setOptions] = useState<OptionsProps[]>([]);

    const [errorMinCreate, setErrorMinCreate] = useState<boolean>(false);
    const [errorMinToVote, setErrorMinToVote] = useState<boolean>(false);

    const handleClickSurvey = () => {
        setSurveyCreated(!surveyCreated);
    }

    const addOption = () => {
        if (options.length < 7) {
            setOptions(prevOptions => [
                ...prevOptions,
                { id: String(prevOptions.length + 1), name: '', votes: '0' }
            ]);
        }
    };

    const handleChange = (index: number, value: string, maxLength: number) => {
        setOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index]['name'] = (value.length < maxLength) ? value : value.slice(0, -1);
            return updatedOptions;
        });
    };

    const removeOption = (id: string) => {
        setOptions(prevOptions => prevOptions.filter(option => option.id !== id));
    };

    const handleSave = () => {
        setErrorMinCreate(true);
    }

    const handleCreate = () => {
        setErrorMinToVote(true);
    }

    const removeMinCreateError = () => {
        setErrorMinCreate(false);
    }

    const removeMinToVoteError = () => {
        setErrorMinToVote(false);
    }

    return (
        <Container className="flex">
            <ControlArea
                className="flex fd"
                styler={(!surveyCreated) ? '100%' : '75%'}
            >
                <Field
                    type="title"
                    center={`
                                height: 16%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                    text="Permitir que criem enquetes: "
                    styler={`
                                color: #3C5774;
                                font-size: 1.4rem;
                                font-family: "Inter";
                                font-weight: bold;
                            `}
                />
                <Field
                    type="toggle"
                    center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 12%;
                        `}
                    styler={` `}
                    checked={surveyStatus}
                    setChecked={setSurveyStatus}
                />
                <br />
                <Field
                    type="title"
                    center={`
                                height: 14%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                    text="Mínimo para criar: "
                    styler={`
                                transition: 0.3s;
                                color: ${!errorMinCreate ? '#3C5774' : 'red'};
                                font-size: 1.4rem;
                                font-family: "Inter";
                                font-weight: bold;
                                word-wrap: break-word;
                            `}
                />
                <Field
                    type="input"
                    center={`
                            width: 100%;
                            height: 10%;
                    `}
                    styler={`
                            width: 70%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${!errorMinCreate ? '#6a5212' : 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            outline:none;

                            padding-left: 10%;
                    `}
                    inputType="price"
                    inputValue={minCreateSurvey}
                    placeholder="Minino 2,500 ..."
                    setInputValue={setMinCreateSurvey}
                    onClick={removeMinCreateError}
                />
                <br />
                <Field
                    type="title"
                    center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;
                            `}
                    text="Duração da enquete: "
                    styler={`
                                color: #3C5774;
                                font-size: 1.4rem;
                                font-family: "Inter";
                                font-weight: bold;
                            `}
                />
                <DurationArea className="flex">
                    <Field
                        type="slider"
                        center={`
                            width: 100%;
                            height: 10%;
                            justify-content: center;
                            align-items: center;
                            padding-left: 12%;
                        `}
                        value={surveyTime}
                        setValue={setSurveyTime}
                        durationMin="1"
                        durationMax="10"
                        styler={` `}
                    />
                    <TimerArea>
                        <TimeTitle>{surveyTime} min</TimeTitle>
                    </TimerArea>
                </DurationArea>
                <SaveArea className="flex">
                  <SaveButton onClick={handleSave}>SALVAR</SaveButton>
                </SaveArea>
            </ControlArea>
            <GenerationArea className="flex">
                {(surveyCreated) ? (
                    <GenerationWrapper className="flex">
                        <LeftSideArea>
                            <Field
                                type="title"
                                center={`
                                    height: 15%;
                                    justify-content: flex-start;
                                    padding-left: 12%;
                                `}
                                text="Titulo: "
                                styler={`
                                    color: #3C5774;
                                    font-size: 1.6rem;
                                    font-family: "Inter";
                                    font-weight: bold;
                                `}
                            />
                            <Field
                                type="input"
                                center={`
                                    width: 100%;
                                    height: 10%;
                                `}
                                styler={`
                                    width: 75%;
                                    height: 100%;

                                    border-radius: 5px;

                                    color: #6a5212;
                                    font-family: "Roboto";
                                    font-weight: 400;
                                    font-size: 1.2rem;

                                    padding-left: 10%;
                                `}
                                maxLength={100}
                                inputType="text"
                                placeholder="Até 25 carac..."
                                inputValue={surveyTitle}
                                setInputValue={setSurveyTitle}
                            />
                            <br />
                            <Field
                                type="title"
                                center={`
                                    height: 20%;
                                    justify-content: flex-start;
                                    padding-left: 12%;
                                `}
                                text="Mínimo para votar: "
                                styler={`
                                    transition: 0.3s;
                                    color: ${!errorMinToVote ? '#3C5774' : 'red'};
                                    font-size: 1.6rem;
                                    font-family: "Inter";
                                    font-weight: bold;
                                    word-wrap: break-word;
                                `}
                            />
                            <Field
                                type="input"
                                center={`
                                    width: 100%;
                                    height: 10%;
                                `}
                                styler={`
                                    width: 75%;
                                    height: 100%;

                                    border-radius: 5px;

                                    transition: 0.3s;
                                    color: ${!errorMinToVote ? '#6a5212' : 'red'};
                                    font-family: "Roboto";
                                    font-weight: 400;
                                    font-size: 1.2rem;

                                    padding-left: 10%;
                                `}
                                inputType="price"
                                inputValue={minToVote}
                                setInputValue={setMinToVote}
                                placeholder="Min 10,000 ..."
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
                                    {options.length > 0 &&
                                        options.map((option, index) => (
                                            <InputWrapper
                                                key={index}
                                                className="flex"
                                            >
                                                <InputArea>
                                                    <Input
                                                        type="text"
                                                        placeholder={'Opção ' + (index + 1)}
                                                        value={option.name}
                                                        onChange={(e) => handleChange(index, e.target.value, 30)}
                                                    />
                                                </InputArea>
                                                <RemoveArea onClick={() => removeOption(option.id)}>
                                                    <SvgModel
                                                        name="delete"
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                </RemoveArea>
                                            </InputWrapper>
                                        ))
                                    }
                                </OptionsList>
                            </OptionsWrapper>
                            <SaveButtoArea className="flex">
                                <BackButton onClick={handleClickSurvey}>VOLTAR</BackButton>
                                <CreateButton onClick={handleCreate}>CRIAR</CreateButton>
                            </SaveButtoArea>
                        </RightSideArea>
                    </GenerationWrapper>
                ) : (
                    <CreateSurveyArea className="flex fd">
                        <TitleArea>
                            <Title> Nenhuma Enquete criada </Title>
                        </TitleArea>
                        <SvgArea>
                            <SvgModel
                                name="addSurvey"
                                width="100%"
                                height="50%"
                            />
                        </SvgArea>
                        <ButtonArea>
                            <Button onClick={handleClickSurvey}> Gerar Enquete </Button>
                        </ButtonArea>
                    </CreateSurveyArea>
                )}
            </GenerationArea>
        </Container>
    );
}