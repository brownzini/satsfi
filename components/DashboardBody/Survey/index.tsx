import {
    AmountVotesText,
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
    MessageErrorArea,
    NoVotesText,
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
    TrophyArea,
    WinnerText,
} from "./styles";

import Field from "../Field";
import SvgModel from "@/utils/svg";
import { useEffect, useState } from "react";
import { useMessage } from "@/contexts/useMessage";
import TimerComponent from "./TimerComponent";

interface OptionsProps {
    id: string;
    name: string;
    votes: string;
}

interface TimerProps {
    minute: number;
    second: number;
}

export default function Survey() {

    const [surveyStatus, setSurveyStatus] = useState<boolean>(true);
    const [minCreateSurvey, setMinCreateSurvey] = useState<string>('');
    const [surveyTime, setSurveyTime] = useState<number>(1);

    const [surveyCreated, setSurveyCreated] = useState<boolean>(false);

    const [surveyTitle, setSurveyTitle] = useState<string>('');
    const [options, setOptions] = useState<OptionsProps[]>([]);
    const [minToVote, setMinToVote] = useState<string>('');

    const [errorTitle, setErrorTitle] = useState<boolean>(false);
    const [errorMinCreate, setErrorMinCreate] = useState<boolean>(false);
    const [errorMinToVote, setErrorMinToVote] = useState<boolean>(false);
    const [errorOptions, setErrorOptions] = useState<boolean>(false);

    const [SurveyTimer, setSurveyTimer] = useState<TimerProps>({ minute: 0, second: 0 });
    const [isSurveyCreated, setIsSurveyCreated] = useState<boolean>(false);
    const [SurveyTimerStatus, setSurveyTimerStatus] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [winnerOption, setWinnerOption] = useState<string>('');
    const [changeTitle, setChangeTitle] = useState<boolean>(false);
    const [maxVotes, setMaxVotes] = useState<number>(0);

    const { dispatchMessage } = useMessage();

    const handleClickSurvey = () => {
        if (!isSurveyCreated) {
            setSurveyCreated(!surveyCreated);
        } else {
            handleReset();
        }
    }

    // [Options Crud]
    const addOption = () => {
        if (options.length < 7) {
            const id = String(options.length + 1);
            setOptions(prevOptions => [
                ...prevOptions,
                { id: id, name: 'Opção ' + id, votes: '0' }
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

    // Right Side
    const createValidation = () => {
        const priceFiltered = parseInt(minCreateSurvey.replace(/[,.]/g, ""));

        if (Number.isNaN(priceFiltered)) {
            setMinCreateSurvey('Preencha o campo');
            setErrorMinCreate(true);
            return false;
        } else if (priceFiltered < 2500) {
            setMinCreateSurvey('Minimo é de 2,500 sats');
            setErrorMinCreate(true);
            return false;
        } else {
            return true;
        }
    }

    // Right Side
    const handleSave = () => {
        if (createValidation()) {
            console.log('clicou')
            dispatchMessage('Salvo com sucesso!!', true);
        }
    }

    // Left Side
    const voteValidation = () => {
        const priceFiltered = parseInt(minToVote.replace(/[,.]/g, ""));

        if (Number.isNaN(priceFiltered)) {
            setMinToVote('Preencha o campo');
            setErrorMinToVote(true);
            return false;
        } else if (priceFiltered < 37) {
            setMinToVote('Minimo é de 37 sats');
            setErrorMinToVote(true);
            return false;
        } else {
            return true;
        }
    }

    const optionsValidation = () => {
        if (options.length < 2) {
            setOptions([]);
            setErrorOptions(true);
            setTimeout(() => {
                setErrorOptions(false);
            }, 4000);
            return false;
        } else {
            return true;
        }
    }

    // Left Side
    const defineTime = () => {
        const now = new Date();
        setSurveyTimer({ minute: now.getMinutes()+surveyTime, second: now.getSeconds() });
    }

    const handleCreate = () => {
       
        const isVotationOk = voteValidation();
        const isOptionsOk = optionsValidation();

        if (isVotationOk && isOptionsOk) {
            defineTime();
            setSurveyCreated(false);
            setIsSurveyCreated(true);
            setSurveyTimerStatus(true);
            dispatchMessage('Enquete criada com sucesso!!', true);
        }

    }

    const removeMinCreateError = () => {
        setErrorMinCreate(false);
    }

    const removeMinToVoteError = () => {
        setErrorMinToVote(false);
    }

    const removeErrorTitle = () => {
        setErrorTitle(false);
    }

    const handleReset = () => {
          setChangeTitle(false);
          setIsSurveyCreated(false);
          setMaxVotes(0);
          setSurveyCreated(false);
          setSurveyTitle('');
          setOptions([]);
          setMinToVote('');
          setErrorTitle(false);
          setErrorMinToVote(false);
          setErrorOptions(false);
          setIsFinished(false);
          setSurveyTimerStatus(false);
          setWinnerOption('');
          setSurveyTimer({minute:0, second:0});
    }

    const winnerFilter = (type:string) => {
        switch (type) {
            case 'name':
                return options[0].name+': 0% dos votos';
            case 'amount':
                return '0 satohis';
        }
    }

    const timerRendering = () => {
        return SurveyTimerStatus ? (
            <TimerComponent
                data={SurveyTimer}
                endTime={endTime}
            />
        ) : 
          <>
            <TrophyArea className="flex">
                <SvgModel 
                    name="trophy" 
                    width="100%" 
                    height="100%" 
                />
            </TrophyArea>
            <br />
            <WinnerText>
                {(winnerOption !== '') ? winnerOption+': 70% dos votos' : winnerFilter('name')}
            </WinnerText>
            <br />
            <AmountVotesText> 
                {(winnerOption !== '') ? '50k satohis' : winnerFilter('amount') }
            </AmountVotesText>
            <br />
            <br />
          </>
    }

    const endTime = () => {
        setIsFinished(true);
        findMaxVotesOption();
    }

    const titleAreaRendering = () => {
        return (!changeTitle) ? 'Enquete expira em' : 'Vencedor da enquete'
    }

    const findMaxVotesOption = () => {
        for (const option of options) {
          if (parseInt(option.votes) > maxVotes) {
              setWinnerOption(option.name);
              setMaxVotes(parseInt(option.votes));
          }
        }
    };

    useEffect(() => {
       if(isFinished) {
           setSurveyTimerStatus(false);
           setChangeTitle(true);
       }
    },[isFinished]);

    return (
        <Container className="flex">
            <ControlArea
                className="flex fd"
                styler={(!surveyCreated) ? '100%' : '75%'}
            ><br />
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
                                height: 16%;
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
                            width: 70%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${!errorMinCreate ? '#6a5212' : 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;
                            
                            @media only screen and (min-height: 900px) {
                                font-size: 1.6rem;
                            }

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

                        @media only screen and (max-width: 1200px) {
                            font-size: 1.4rem;
                        }

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                        }
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
                        styler={` 
                            @media only screen and (min-width: 2560px) {
                                height: 25%;
                            }
                        `}
                    />
                    <TimerArea>
                        <TimeTitle>{surveyTime} min</TimeTitle>
                    </TimerArea>
                </DurationArea>
                <SaveArea>
                    <SaveButton onClick={handleSave}>SALVAR</SaveButton>
                </SaveArea>
            </ControlArea>
            <GenerationArea className="flex">
                {(surveyCreated) ? (
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
                                    color: ${!errorTitle ? '#3C5774' : 'red'};
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

                                    color: ${!errorTitle ? '#6a5212' : 'red'};
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
                                    color: ${!errorMinToVote ? '#3C5774' : 'red'};
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
                                    color: ${!errorMinToVote ? '#6a5212' : 'red'};
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
                                placeholder="Min 37 sats"
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
                                            <InputWrapper
                                                key={index}
                                                className="flex"
                                            >
                                                <InputArea>
                                                    <Input
                                                        type="text"
                                                        placeholder={'Digitar opção '}
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
                                    ) : (
                                        <MessageErrorArea className="flex">
                                            <h2> {(errorOptions) && `É necessário criar pelo menos 2 opções`} </h2>
                                        </MessageErrorArea>
                                    )
                                    }
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
                                {(!isSurveyCreated) ? 'Nenhuma Enquete Gerada' : titleAreaRendering()}
                            </Title>
                        </TitleArea>
                        <SvgArea className="flex fd"> 
                            {(!isSurveyCreated) ? (
                                <SvgModel
                                    name="addSurvey"
                                    width="100%"
                                    height="50%"
                                />
                            ) : timerRendering()}
                        </SvgArea> 
                        <ButtonArea>
                            <Button
                                styler={(!isSurveyCreated) ? `
                                    background-color: #3B1170;
                                    &:hover {
                                        background-color: #1E0A37;
                                    }
                                ` : `
                                    background-color: #606D6A;
                                    &:hover {
                                        background-color: #606D6A;
                                    }
                                `}
                                onClick={handleClickSurvey}
                            >
                                {(!isSurveyCreated) ? 'Gerar nova Enquete' : 'Finalizar Enquete'}
                            </Button>
                        </ButtonArea>
                    </CreateSurveyArea>
                )}
            </GenerationArea>
        </Container>
    );
}