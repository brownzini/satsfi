import { useEffect, useState } from "react";
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

//Components
import Field from "../Field";
import TimerComponent from "./TimerComponent";

//Contexts
import { useMessage } from "@/contexts/useMessage";

//Svg
import SvgModel from "@/utils/svg";

//Contexts
import { useData } from "@/contexts/useData";

//Utils
import { filterAmount } from "@/utils/inputFormat";
import { OptionsProps, TimerProps } from "@/utils/types";

export default function Survey() {

    const { data, updateData } = useData();

    const [surveyStatus, setSurveyStatus] = useState<boolean>(data.survey.allow);
    const [minCreateSurvey, setMinCreateSurvey] = useState<string>(data.survey.minCreateSurvey);
    const [durationTime, setDurationTime] = useState<number>(data.survey.durationTime);

    const [surveyCreated, setSurveyCreated] = useState<boolean>(false);

    const [surveyTitle, setSurveyTitle] = useState<string>('');
    const [options, setOptions] = useState<OptionsProps[]>(data.survey.options);
    const [minToVote, setMinToVote] = useState<string>('');

    const [isSurveyCreated, setIsSurveyCreated] = useState<boolean>(false);
    const [SurveyTimerStatus, setSurveyTimerStatus] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [errorTitle, setErrorTitle] = useState<boolean>(false);
    const [errorMinCreate, setErrorMinCreate] = useState<boolean>(false);
    const [errorMinToVote, setErrorMinToVote] = useState<boolean>(false);
    const [errorOptions, setErrorOptions] = useState<boolean>(false);

    const [winnerOption, setWinnerOption] = useState({
           id:'', 
           name:'', 
           percentage: '', 
           amount: ''
    });
    const [changeTitle, setChangeTitle] = useState<boolean>(false);
    const [maxVotes, setMaxVotes] = useState<number>(0);

    const { dispatchMessage } = useMessage();

    const handleClickSurvey = () => {
        if (!isSurveyCreated) {
            setSurveyCreated(!surveyCreated);
        } else {
            handleReset();
            dispatchMessage('[SUCESSO]: Enquete Finalizada', true);
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

    const notChanged = () => {
        const validateSurveyStatus   = (data.survey.allow ===  surveyStatus);
        const validateMinCreate = (data.survey.minCreateSurvey ===  minCreateSurvey);
        const validateDurationSurvey = (data.survey.durationTime === durationTime);
        return (validateSurveyStatus && validateMinCreate && validateDurationSurvey);
    }

    // Right Side
    const handleSave = () => {
        const hasNotChanged = notChanged();
        if (createValidation() && !hasNotChanged) {
            updateData('survey', { 
                allow: surveyStatus,
                minCreateSurvey: minCreateSurvey,
                durationTime: durationTime,
                
                surveyTitle: data.survey.surveyTitle,
                options: data.survey.options,
                minToVote: data.survey.minToVote,
                
                endTime: {
                    day: data.survey.endTime.day,
                    hour: data.survey.endTime.hour,
                    minute: data.survey.endTime.minute,
                    second: data.survey.endTime.second,
                },
                amount: data.survey.amount,
             });
            dispatchMessage('[SUCESSO]: Detalhes de Enquete foram salvos', true);
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
    const fillEmptyNameFields = (options: OptionsProps[]) => {
        const updatedOptions = options.map((option, index) => {
            return {
                ...option,
                name: option.name || `Opção ${index}`
            };
        });
        setOptions(updatedOptions);
    };

    function getNextDay() {
        const today = new Date();
        const nextDay = new Date(today);

        nextDay.setDate(today.getDate() + 1);

        return nextDay;
    }

    const defineTime = () => {
        const now = new Date();

        const completeMinute = now.getMinutes()+ data.survey.durationTime;

        const filterMinute = (completeMinute >= 60) ? completeMinute-60 : completeMinute;

        const zeroHour = (now.getHours()+1 === 24) ? 0 : now.getHours()+1;
        const moreOneHour = (completeMinute >= 60) ? zeroHour : now.getHours();

        const moreOneDay = (moreOneHour === 0) ? getNextDay().getHours() : now.getUTCDate(); ;

        updateData('survey', {
            allow: data.survey.allow,
            minCreateSurvey: data.survey.minCreateSurvey,
            durationTime: data.survey.durationTime,

            surveyTitle: surveyTitle,
            options: options,
            minToVote: minToVote,
            
            endTime: {
                day: moreOneDay,
                hour: moreOneHour,
                minute: filterMinute,
                second: now.getSeconds(),
            },
            amount: '0',
        });
        
    }

    const handleCreate = () => {
       
        const isVotationOk = voteValidation();
        const isOptionsOk = optionsValidation();

        if (isVotationOk && isOptionsOk) {
            fillEmptyNameFields(options);
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
          setWinnerOption({
            id:'', 
            name:'', 
            percentage: '', 
            amount: ''
          });
          updateData('survey', {
            allow: data.survey.allow,
            minCreateSurvey: data.survey.minCreateSurvey,
            durationTime: data.survey.durationTime,

            surveyTitle: 'Enquete',
            options: [],
            minToVote: '',

            endTime: {
                day:0, 
                hour:0,
                minute: 0, 
                second: 0
            },
            amount: '0',
          })
    }

    // const calculatePercentages = (options: OptionsProps[]) => {
    //     const totalVotes = options.reduce((sum, option) => sum + parseInt(option.votes), 0);
    //     return options.map(option => ({
    //         ...option,
    //         percentage: totalVotes === 0 ? 0 : (parseInt(option.votes) / totalVotes) * 100
    //     }));
    // };

    const calculatePercentageForOption = (options: OptionsProps[], optionId: string) => {
        const totalVotes = options.reduce((sum, option) => sum + parseInt(option.votes), 0);

        const chosenOption = options.find(option => option.id === optionId);
        
        if (!chosenOption) {
            return null;
        }

        const chosenOptionVotes = parseInt(chosenOption.votes);
        const percentage = totalVotes === 0 ? 0 : (chosenOptionVotes / totalVotes) * 100;

        return {
            ...chosenOption,
            percentage: percentage.toFixed(2)
        };
    };

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
                {(winnerOption.name !== '') ? winnerOption.name+': '+winnerOption.percentage+'% dos votos' : winnerFilter('name')}
            </WinnerText>
            <br />
            <AmountVotesText> 
                {(winnerOption.name !== '') ? winnerOption.amount+' '+' satohis' : winnerFilter('amount') }
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
             const filterOption = calculatePercentageForOption(options, option.id);
             const totalAmount = filterAmount(data.survey.amount);
             if (parseInt(option.votes) > maxVotes) {
                 setWinnerOption({
                    id: option.id, 
                    name: option.name,
                    percentage: (filterOption) ? filterOption.percentage : '0%', 
                    amount: (totalAmount) ? totalAmount : '0',
                 });
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

    useEffect(() => {
        if (data.survey.options.length === 0) {
            setSurveyCreated(false);
        } else {
            setSurveyCreated(false);
            setIsSurveyCreated(true);
            setSurveyTimerStatus(true);
        }
    },[]);

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
                    disabled={!surveyStatus}
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
                        value={durationTime}
                        setValue={setDurationTime}
                        durationMin="1"
                        durationMax="10"
                        styler={` 
                            @media only screen and (min-width: 2560px) {
                                height: 25%;
                            }
                        `}
                        disabled={!surveyStatus}
                    />
                    <TimerArea>
                        <TimeTitle>{durationTime} min</TimeTitle>
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