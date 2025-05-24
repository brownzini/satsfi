import { useEffect, useState } from "react";
import {
  AmountVotesText,
  Container,
  ControlArea,
  SaveArea,
  SaveButton,
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
import { OptionsProps } from "@/utils/types";
import { useActiveWs } from "@/contexts/useActiveWs";
import { updateConfig } from "@/app/firebase/services/Users";
import DurationSurveyArea from "./DurationSurveyArea";
import GenerationSurveyArea from "./GenerationSurveyArea";
import { nEncode } from "@/utils/encrypt/encrypt";
import { unescape } from "querystring";
import axios from "axios";

export default function Survey() {
  const { data, updateData } = useData();
  const { wsConfig, surveySoloDonation, setsurveySoloDonation } = useActiveWs();

  const [surveyStatus, setSurveyStatus] = useState<boolean>(data.survey.allow);
  const [minCreateSurvey, setMinCreateSurvey] = useState<string>(
    data.survey.minCreateSurvey
  );
  const [durationTime, setDurationTime] = useState<number>(
    data.survey.durationTime
  );

  const [surveyCreated, setSurveyCreated] = useState<boolean>(false);

  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [options, setOptions] = useState<OptionsProps[]>(data.survey.options);
  const [minToVote, setMinToVote] = useState<string>("");

  const [isSurveyCreated, setIsSurveyCreated] = useState<boolean>(false);
  const [SurveyTimerStatus, setSurveyTimerStatus] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorMinCreate, setErrorMinCreate] = useState<boolean>(false);
  const [errorMinToVote, setErrorMinToVote] = useState<boolean>(false);
  const [errorOptions, setErrorOptions] = useState<boolean>(false);

  const [winnerOption, setWinnerOption] = useState({
    id: "",
    name: "",
    percentage: "",
    amount: "",
  });
  const [changeTitle, setChangeTitle] = useState<boolean>(false);

  const { dispatchMessage } = useMessage();

  const handleClickSurvey = async () => {
    if (!isSurveyCreated && data.survey.options.length > 0) {
      setSurveyCreated(false);
      setIsSurveyCreated(true);
      setSurveyTimerStatus(true);
    }
    if (!isSurveyCreated && data.survey.options.length === 0) {
      setSurveyCreated(!surveyCreated);
    } else {
      await cleanInDB();
      handleReset();
      dispatchMessage("[SUCESSO]: Enquete Finalizada", true);
      localStorage.removeItem("survey");
      await finishSurvey();
    }
  };

  // [Options Crud]
  const addOption = () => {
    if (options.length < 7) {
      const id = String(options.length + 1);
      setOptions((prevOptions) => [
        ...prevOptions,
        { id: id, name: "Opção " + id, votes: "0" },
      ]);
    }
  };

  const handleChange = (index: number, value: string, maxLength: number) => {
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index]["name"] =
        value.length < maxLength ? value : value.slice(0, -1);
      return updatedOptions;
    });
  };

  const removeOption = (id: string) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  // Right Side
  const createValidation = () => {
    const priceFiltered = parseInt(minCreateSurvey.replace(/[,.]/g, ""));

    if (Number.isNaN(priceFiltered)) {
      setMinCreateSurvey("Preencha o campo");
      setErrorMinCreate(true);
      return false;
    } else if (priceFiltered < 2500) {
      setMinCreateSurvey("Minimo é de 2,500 sats");
      setErrorMinCreate(true);
      return false;
    } else {
      return true;
    }
  };

  const notChanged = () => {
    const validateSurveyStatus = data.survey.allow === surveyStatus;
    const validateMinCreate = data.survey.minCreateSurvey === minCreateSurvey;
    const validateDurationSurvey = data.survey.durationTime === durationTime;
    return validateSurveyStatus && validateMinCreate && validateDurationSurvey;
  };

  // Right Side
  const handleSave = async () => {
    const hasNotChanged = notChanged();
    if (createValidation() && !hasNotChanged) {
      updateData("survey", {
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
      await updateConfig(
        data.generateKey.idString,
        JSON.stringify({
          config: data.config,
          survey: {
            allow: data.survey.allow,
            minCreateSurvey: minCreateSurvey.replace(/[,.]/g, ""),
            durationTime: durationTime,

            surveyTtitle: data.survey.surveyTitle,
            options: data.survey.options,
            minToVote: data.survey.minToVote.replace(/[,.]/g, ""),

            endTime: data.survey.endTime,

            amount: data.survey.amount,
          },
          chromaKey: data.chromaKey,
          call: data.call,
          generateKey: data.generateKey,
          isActiveHub: data.isActiveHub,
          test: {
            allow: true,
          },
          trackDonate: data.trackDonate,
          blackList: data.blackList,
          donations: data.donations,
          qrCode: data.qrCode,
        })
      );
      dispatchMessage("[SUCESSO]: Detalhes de Enquete foram salvos", true);
    }
  };

  // Left Side
  const voteValidation = () => {
    const priceFiltered = parseInt(minToVote.replace(/[,.]/g, ""));

    if (Number.isNaN(priceFiltered)) {
      setMinToVote("Preencha o campo");
      setErrorMinToVote(true);
      return false;
    } else if (priceFiltered < 37) {
      setMinToVote("Minimo é de 37 sats");
      setErrorMinToVote(true);
      return false;
    } else {
      return true;
    }
  };

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
  };

  // Left Side
  const fillEmptyNameFields = (options: OptionsProps[]) => {
    const updatedOptions = options.map((option, index) => {
      return {
        ...option,
        name: option.name || `Opção ${index}`,
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

  const defineTime = async () => {
    const now = new Date();

    const completeMinute = now.getUTCMinutes() + durationTime;

    const filterMinute =
      completeMinute >= 60 ? completeMinute - 60 : completeMinute;

    const zeroHour = now.getHours() + 1 === 24 ? 0 : now.getHours() + 1;
    const moreOneHour = completeMinute >= 60 ? zeroHour : now.getHours();

    const moreOneDay =
      moreOneHour === 0 ? getNextDay().getHours() : now.getUTCDate();

    const seconds = now.getSeconds();

    await updateConfig(
      data.generateKey.idString,
      JSON.stringify({
        config: data.config,
        survey: {
          allow: data.survey.allow,
          minCreateSurvey: minCreateSurvey.replace(/[,.]/g, ""),
          durationTime: data.survey.durationTime,

          surveyTtitle: surveyTitle,
          options: options,
          minToVote: minToVote.replace(/[,.]/g, ""),

          endTime: {
            day: moreOneDay,
            hour: moreOneHour,
            minute: filterMinute,
            second: seconds,
          },

          amount: 0,
        },
        chromaKey: data.chromaKey,
        call: data.call,
        generateKey: data.generateKey,
        test: {
          allow: true,
        },
        trackDonate: data.trackDonate,
        blackList: data.blackList,
        donations: data.donations,
        qrCode: data.qrCode,
        isActiveHub: data.isActiveHub,
      })
    );

    updateData("survey", {
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
        second: seconds,
      },
      amount: "0",
    });
  };

  const handleCreate = async () => {
    const isVotationOk = voteValidation();
    const isOptionsOk = optionsValidation();

    const csHour =
      typeof data.survey.endTime.hour === "number"
        ? data.survey.endTime.hour.toString()
        : undefined;
    const csMinute =
      typeof data.survey.endTime.minute === "number"
        ? data.survey.endTime.minute.toString()
        : undefined;

    if (csHour && csMinute) {
      const createdSurveyData = {
        title: surveyTitle,
        options,
      };

      const minTime = csHour + ":" +csMinute;

      if (isVotationOk && isOptionsOk) {
        const response = await insertSurvey(createdSurveyData, minTime);
        if (response) {
          fillEmptyNameFields(options);
          await defineTime();
          setSurveyCreated(false);
          setIsSurveyCreated(true);
          setSurveyTimerStatus(true);

          dispatchMessage("Enquete criada com sucesso!!", true);
        }
      }
    }
  };

  async function insertSurvey(survey: any, minTime: string) {
    const { idString, keyHub } = data.generateKey;
    if (keyHub) {
      const url = "/api/insertSurvey";
      const response = await axios.post(
        url,
        { handle: idString, keyHub, minTime, survey },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.msg === "ok") {
        return true;
      } else {
        handleReset();
        return false;
      }
    } else {
      handleReset();
      return false;
    }
  }

  async function finishSurvey() {
    const { idString, keyHub } = data.generateKey;
    if (keyHub) {
      const url = "/api/endSurvey";
      const response = await axios.post(
        url,
        { handle: idString, keyHub },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.msg === "ok") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const removeMinCreateError = () => {
    setErrorMinCreate(false);
  };

  const removeMinToVoteError = () => {
    setErrorMinToVote(false);
  };

  const removeErrorTitle = () => {
    setErrorTitle(false);
  };

  const cleanInDB = async () => {
    await updateConfig(
      data.generateKey.idString,
      JSON.stringify({
        config: data.config,
        survey: {
          allow: data.survey.allow,
          minCreateSurvey: minCreateSurvey.replace(/[,.]/g, ""),
          durationTime: durationTime,
          surveyTtitle: "",
          options: [],
          minToVote: "",
          endTime: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
          },
          amount: "0",
        },
        chromaKey: data.chromaKey,
        call: data.call,
        generateKey: data.generateKey,
        test: {
          allow: true,
        },
        trackDonate: data.trackDonate,
        blackList: data.blackList,
        donations: data.donations,
        qrCode: data.qrCode,
        isActiveHub: data.isActiveHub,
      })
    );
  };

  const handleReset = () => {
    setChangeTitle(false);
    setIsSurveyCreated(false);
    setSurveyCreated(false);
    setSurveyTitle("");
    setOptions([]);
    setMinToVote("");
    setErrorTitle(false);
    setErrorMinToVote(false);
    setErrorOptions(false);
    setIsFinished(false);
    setsurveySoloDonation([]);
    setSurveyTimerStatus(false);
    setWinnerOption({
      id: "",
      name: "",
      percentage: "",
      amount: "",
    });
    localStorage.removeItem("survey");
    updateData("survey", {
      allow: true,
      minCreateSurvey: data.survey.minCreateSurvey,
      durationTime: data.survey.durationTime,

      surveyTitle: "Enquete",
      options: [],
      minToVote: "",

      endTime: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      },
      amount: "0",
    });

    setTimeout(async () => {
      await updateConfig(
        data.generateKey.idString,
        JSON.stringify({
          config: data.config,
          survey: {
            allow: true,
            minCreateSurvey: data.survey.minCreateSurvey,
            durationTime: data.survey.durationTime,

            surveyTtitle: data.survey.surveyTitle,
            options: data.survey.options,
            minToVote: data.survey.minToVote,

            endTime: data.survey.endTime,

            amount: data.survey.amount,
          },
          chromaKey: data.chromaKey,
          call: data.call,
          generateKey: data.generateKey,
          isActiveHub: data.isActiveHub,
          test: data.test,
          trackDonate: data.trackDonate,
          blackList: data.blackList,
          donations: data.donations,
          qrCode: data.qrCode,
        })
      );
    }, 0);
  };

  const calculatePercentageForOption = (
    options: OptionsProps[],
    optionId: string
  ) => {
    const totalVotes = options.reduce(
      (sum, option) => sum + parseInt(option.votes),
      0
    );

    const chosenOption = options.find((option) => option.id === optionId);

    if (!chosenOption) {
      return null;
    }

    const chosenOptionVotes = parseInt(chosenOption.votes);
    const percentage =
      totalVotes === 0 ? 0 : (chosenOptionVotes / totalVotes) * 100;

    return {
      ...chosenOption,
      percentage: percentage.toFixed(2),
    };
  };

  const winnerFilter = (type: string) => {
    switch (type) {
      case "name":
        return "Ninguém votou na enquete";
      case "amount":
        return "0 satohis";
    }
  };

  const timerRendering = () => {
    return SurveyTimerStatus ? (
      <TimerComponent endTime={endTime} />
    ) : (
      <>
        <TrophyArea className="flex">
          <SvgModel name="trophy" width="100%" height="100%" />
        </TrophyArea>
        <br />
        <WinnerText>
          {winnerOption.name !== ""
            ? winnerOption.name + ": " + winnerOption.percentage + "% dos votos"
            : winnerFilter("name")}
        </WinnerText>
        <br />
        <AmountVotesText>
          {winnerOption.name !== ""
            ? winnerOption.amount + " " + " satohis"
            : winnerFilter("amount")}
        </AmountVotesText>
        <br />
        <br />
      </>
    );
  };

  const endTime = () => {
    endSurveyData();
    setIsFinished(true);
    findMaxVotesOption();
  };

  const titleAreaRendering = () => {
    return !changeTitle ? "Enquete expira em" : "Vencedor da enquete";
  };

  const getTotalVotes = (options: any) => {
    return options.reduce((total: any, option: any) => {
      return total + parseInt(option.votes);
    }, 0);
  };

  const findMaxVotesOption = () => {
    let maxVote = 0;
    for (const option of options) {
      const filterOption = calculatePercentageForOption(options, option.id);
      const totalAmount = filterAmount(getTotalVotes(options));

      if (parseInt(option.votes) > maxVote) {
        setWinnerOption({
          id: option.id,
          name: option.name,
          percentage: filterOption ? filterOption.percentage : "0%",
          amount: totalAmount ? totalAmount : "0",
        });
        maxVote = parseInt(option.votes);
      }
    }
  };

  const calculateDonationsFromWs = () => {
    // Função para agrupar por id e somar os amounts
    const groupedSums = surveySoloDonation.reduce((acc: any, item: any) => {
      // Verifica se o id já existe no acumulador
      if (!acc[item.id]) {
        acc[item.id] = 0; // Se não existir, inicializa com 0
      }

      // Soma o amount convertendo de string para número
      acc[item.id] += parseInt(item.amount);

      return acc;
    }, {});

    // Transforma o resultado em um array de objetos com id e totalAmount
    const result = Object.entries(groupedSums).map(([id, totalAmount]) => ({
      id,
      totalAmount,
    }));

    return result;
  };

  const endSurveyData = () => {
    const dataOrg = calculateDonationsFromWs();
    const copyData = data.survey.options;
    const copyArr: any = [];

    copyData.filter((param, i) => {
      if (dataOrg[i]) {
        if (param.id === dataOrg[i].id) {
          const vote = dataOrg[i].totalAmount;
          copyArr.push({
            id: dataOrg[i].id,
            name: param.name,
            votes: vote,
          });
        }
      }
    });

    updateData("survey", {
      allow: surveyStatus,
      minCreateSurvey: minCreateSurvey,
      durationTime: durationTime,

      surveyTitle: data.survey.surveyTitle,
      options: copyArr,
      minToVote: data.survey.minToVote,

      endTime: {
        day: data.survey.endTime.day,
        hour: data.survey.endTime.hour,
        minute: data.survey.endTime.minute,
        second: data.survey.endTime.second,
      },
      amount: data.survey.amount,
    });

    setOptions(copyArr);
  };

  useEffect(() => {
    if (isFinished) {
      setSurveyTimerStatus(false);
      setChangeTitle(true);
    }
  }, [isFinished]);

  useEffect(() => {
    if (data.survey.options.length === 0) {
      setSurveyCreated(false);
    } else {
      const getDonations = localStorage.getItem("options");
      const options = getDonations ? JSON.parse(getDonations) : [];
      setsurveySoloDonation(options);
      setSurveyCreated(false);
      setIsSurveyCreated(true);
      setSurveyTimerStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="flex">
      <ControlArea className="flex fd" styler={!surveyCreated ? "100%" : "75%"}>
        <br />
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
                                color: ${!errorMinCreate ? "#3C5774" : "red"};
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
                            color: ${!errorMinCreate ? "#6a5212" : "red"};
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
        <DurationSurveyArea
          durationTime={durationTime}
          setDurationTime={setDurationTime}
          surveyStatus={surveyStatus}
        />
        <SaveArea>
          <SaveButton onClick={handleSave}>SALVAR</SaveButton>
        </SaveArea>
      </ControlArea>
      <GenerationSurveyArea
        surveyCreated={surveyCreated}
        errorTitle={errorTitle}
        surveyTitle={surveyTitle}
        setSurveyTitle={setSurveyTitle}
        removeErrorTitle={removeErrorTitle}
        errorMinToVote={errorMinToVote}
        minToVote={minToVote}
        setMinToVote={setMinToVote}
        addOption={addOption}
        removeMinToVoteError={removeMinToVoteError}
        options={options}
        handleChange={handleChange}
        removeOption={removeOption}
        errorOptions={errorOptions}
        handleReset={handleReset}
        handleCreate={handleCreate}
        isSurveyCreated={isSurveyCreated}
        titleAreaRendering={titleAreaRendering}
        timerRendering={timerRendering}
        handleClickSurvey={handleClickSurvey}
      />
    </Container>
  );
}
