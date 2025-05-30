import { useState } from "react";
import { Content, ControlArea, LinkArea } from "./styles";

//Components
import Field from "../Field";

//Contexts
import { useMessage } from "@/contexts/useMessage";
import { useData } from "@/contexts/useData";
import IntialCall from "./InitialCall";
import { updateConfig } from "@/app/firebase/services/Users";

export default function Call() {
  const { data, updateData } = useData();

  const [allow, setAllow] = useState<boolean>(data.call.allow);
  const [minAmount, setMinAmount] = useState<string>(data.call.minAmount);
  const [haveError, setHaveError] = useState<boolean>(false);

  const link = "https://satsfi.com.br/" + data.generateKey.idString;

  const { dispatchMessage } = useMessage();

  const hiddeError = () => {
    haveError && setMinAmount("");
    setHaveError(false);
  };

  const voidFunction = (param: string) => {};

  const hasNotChanged = () =>
    data.call.allow === allow && data.call.minAmount === minAmount;

  const handleSave = async () => {
    const priceFiltered = parseInt(minAmount.replace(/[,.]/g, ""));

    if (minAmount === "" || Number.isNaN(priceFiltered)) {
      setMinAmount("Preencha o campo");
      setHaveError(true);
    } else if (priceFiltered < 12000) {
      setMinAmount("Minimo é de 12.000 sats");
      setHaveError(true);
    } else {
      const notChange = hasNotChanged();
      if (!notChange) {
        await updateConfig(
          data.generateKey.idString,
          JSON.stringify({
            config: data.config,
            survey: data.survey,
            chromaKey: data.chromaKey,
            call: {
              allow,
              minAmount: data.call.minAmount,
            },
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
        updateData("call", {
          allow: allow,
          minAmount: minAmount,
        });
        dispatchMessage("[SUCESSO]: Alterações realizadas", true, 3000);
      }
    }
  };

  function copyTextToClipboard() {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(link).then(
      function () {
        dispatchMessage("Link copiado com sucesso!", true, 2000);
      },
      function (err) {
        dispatchMessage("Erro ao copiar o texto", false, 2000);
      }
    );
  }

  return (
    <Content className="flex">
      <LinkArea className="flex fd">
        <Field
          type="title"
          text="Liberar chamada ao vivo:"
          center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 25%;

                                @media only screen and (min-width: 2560px) {
                                    height: 10%;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 5%;
                                }

                                @media only screen and (min-width: 1600px) {
                                    height: 10%;
                                }
                            `}
          styler={`
                                color: #3C5774;
                                font-size: 1.2rem;
                                font-family: "Inter";
                                font-weight: bold;

                                @media only screen and (min-width: 2560px) {
                                    font-size: 3rem;
                                }

                                @media only screen and (min-width: 1920px) {
                                    font-size: 2rem;
                                }

                                @media only screen and (min-width: 1600px) {
                                    font-size: 2rem;
                                }
                            `}
        />
        <Field
          type="toggle"
          center={`
                            height: 10%;
                            justify-content: flex-start;
                            padding-left: 25%;
                        `}
          text="Permitir donate por audio e IA"
          styler={`
                    
                        `}
          checked={allow}
          setChecked={setAllow}
        />
        <br />
        <Field
          type="title"
          text="Valor minimo (FIXO):"
          center={`
                        height: 10%;
                        justify-content: flex-start;
                        padding-left: 25%;
                    `}
          styler={`
                        color: ${!haveError ? "#3C5774" : "red"};
                        transition: 0.5s;
                        font-size: 1.2rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-width: 2560px) {
                            font-size: 2rem;
                        }

                        @media only screen and (min-width: 1920px) {
                            font-size: 2rem;
                        }

                        @media only screen and (min-width: 1600px) {
                            font-size: 2rem;
                            margin-top:2%;
                        }

                    `}
        />
        <Field
          type="input"
          center={`
                        width: 100%;
                        height: 10%;
                        padding-left: 25%;
                    `}
          styler={`
                        width: 75%;
                        height: 100%;

                        max-width: 250px;

                        border-radius: 5px;

                        color: ${!haveError ? "#6a5212" : "red"};
                        font-family: "Roboto";
                        font-weight: 400;
                        font-size: 1.2rem;

                        transition: 0.5s ease;

                        padding-left: 5%;
                        outline:none;

                        @media only screen and (min-width: 2560px) {
                            font-size: 2rem;
                        }

                        @media only screen and (min-width: 1920px) {
                            font-size: 2rem;
                        }

                        @media only screen and (min-width: 1600px) {
                            font-size: 1.6rem;
                        }
                        
                    `}
          inputType="price"
          disabled={true}
          onClick={hiddeError}
          inputValue={minAmount}
          setInputValue={setMinAmount}
          placeholder="Minimo de 12,000 Sats"
        />

        <Field
          type="title"
          text="Link para acessar:"
          center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 25%;

                                @media only screen and (min-width: 2560px) {
                                    height: 10%;
                                }
                            `}
          styler={`
                                color: #3C5774;
                                font-size: 1.2rem;
                                font-family: "Inter";
                                font-weight: bold;

                                @media only screen and (min-width: 2560px) {
                                    font-size: 2rem;
                                }

                                @media only screen and (min-width: 1920px) {
                                    font-size: 2rem;
                                }

                                @media only screen and (min-width: 1600px) {
                                    font-size: 2rem;
                                    margin-top:2%;
                                }
                            `}
        />
        <Field
          type="input"
          center={`
                            width: 100%;
                            height: 10%;
                            padding-left: 12%;
                            justify-content: center;
                        `}
          styler={`
                            width: 70%;
                            height: 100%;

                            border-radius: 5px;

                            color: #6a5212;
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            transition: 0.5s ease;

                            padding-left: 5%;
                            outline:none;

                            cursor: pointer;
                            user-select:none;

                            @media only screen and (min-width: 2560px) {
                                font-size: 2rem;
                            }

                            @media only screen and (min-width: 1920px) {
                                font-size: 2rem;
                            }
                            @media only screen and (min-width: 1600px) {
                                font-size: 1.6rem;
                                margin-top: 2%;
                            }

                        `}
          inputType="price"
          inputValue={link}
          setInputValue={voidFunction}
          onClick={copyTextToClipboard}
        />
        <br />
        <Field
          type="button"
          center={`
                            width: 100%;
                            height: 20%;
                            justify-content: flex-start;
                            align-items: flex-end;
                            padding-left: 25%;
                           
                        `}
          text="Salvar"
          styler={`
                            width: 25%;
                            height: 70%;
                            color: white;
                            font-size: 1.4rem;
                            font-family: 'Poppins';
                            font-weight: bold;

                            border: none;
                            border-radius: 5px;
                            background-color: #07CCA1;

                            transition: 1s;

                            &:hover {
                                background-color: #11977a;
                            }

                            cursor:pointer;

                            @media only screen and (min-width: 2560px) {
                                font-size: 5rem;
                            }

                            @media only screen and (min-width: 1920px) {
                                font-size: 2.1rem;
                            }

                            @media only screen and (min-width: 1600px) {
                                font-size: 2rem;
                            }
                        `}
          onClick={handleSave}
        />
      </LinkArea>
      <ControlArea className="flex fd">
        <IntialCall handle={data.generateKey.idString} />
      </ControlArea>
    </Content>
  );
}
