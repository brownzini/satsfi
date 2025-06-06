import { useState } from "react";

import Link from "next/link";

import {
  ChromaContent,
  Container,
  DownloadContent,
  NodeArea,
  NodeObsContainer,
  TutorialContainer,
} from "./styles";

//Components
import Field from "../Field";

//Contexts
import { useMessage } from "@/contexts/useMessage";
import { useData } from "@/contexts/useData";
import { updateConfig } from "@/app/firebase/services/Users";

export default function ChromaKey() {
  const { data, updateData } = useData();

  const [allow, setAllow] = useState<boolean>(data.chromaKey.allow);
  const [port, setPort] = useState<string>("4444");
  const [password, setPassword] = useState<string>(
    data.chromaKey.obsPassword ? data.chromaKey.obsPassword : ""
  );

  const [controlClick, setControlClick] = useState<boolean>(false);

  const { dispatchMessage } = useMessage();

  const hasChange = () => {
    if (password === data.chromaKey.obsPassword) {
      return false;
    } else {
      return true;
    }
  };

  const handleSave = async () => {
    const validationChange = hasChange();
    if (validationChange && !controlClick) {
      setControlClick(true);
      updateData("chromaKey", {
        allow: allow,
        obsPassword: password,
      });
      await updateConfig(
        data.generateKey.idString,
        JSON.stringify({
          config: data.config,
          survey: data.survey,
          chromaKey: {
            allow: allow,
            obsPassword: password,
          },
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
      setTimeout(() => {
        setControlClick(false);
      }, 30000);
      dispatchMessage("[SUCESSO]: Seus Dados foram registrados", true);
    }
  };

  return (
    <Container className="flex">
      <ChromaContent className="flex fd">
        <Field
          type="title"
          text="Permitir Chroma Key:"
          center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;

                                @media only screen and (min-width: 2560px) {
                                    height: 5%;
                                }
                            `}
          styler={`
                                color: #3C5774;
                                font-size: 1.2rem;
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

                            @media only screen and (min-width: 2560px) {
                                margin-bottom: 3%;
                            }
                        `}
          styler={`
                    
                        `}
          checked={true}
          setChecked={setAllow}
          disabled
        />
        <br />
        <Field
          type="title"
          center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;

                                @media only screen and (min-width: 2560px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1600px) {
                                    font-size: 1rem;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1300px) {
                                    height: 7%;
                                    align-items: flex-end;
                                }
                            `}
          text="OBS Porta:"
          styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-width: 1600px) {
                            font-size: 2rem;
                            border-radius: 10px;
                        }
                    `}
        />
        <Field
          type="input"
          center={`
                            width: 100%;
                            height: 10%;
                            padding-left: 12%;

                            
                            @media only screen and (min-width: 2560px) {
                                margin-bottom: 3%;
                            }
                    `}
          styler={`
                            width: 30%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${true ? "#6a5212" : "red"};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 5%;

                            @media only screen and (min-width: 1600px) {
                                font-size: 1.6rem;
                            }

                            outline:none;
                            user-select: none;

                            cursor:pointer;
                    `}
          maxLength={5}
          inputType="nit"
          inputValue={port}
          setInputValue={setPort}
          placeholder=" Ex: 4455"
          disabled={true}
        />
        <Field
          type="title"
          center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;

                                @media only screen and (min-width: 2560px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1600px) {
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1300px) {
                                    height: 7%;
                                    align-items: flex-end;
                                }
                            `}
          text="OBS Password:"
          styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-width: 1600px) {
                            font-size: 1.6rem;
                        }
                    `}
        />
        <Field
          type="input"
          center={`
                            width: 100%;
                            height: 10%;
                            padding-left: 12%;
                    `}
          styler={`
                            width: 70%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${true ? "#6a5212" : "red"};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 5%;

                            @media only screen and (min-width: 1600px) {
                                font-size: 1.6rem;
                            }

                            outline:none;
                            user-select: none;

                            cursor:pointer;
                    `}
          maxLength={50}
          inputType="text"
          inputValue={password}
          setInputValue={setPassword}
          placeholder=" Senha ... "
        />
        <br />
        <Field
          type="button"
          center={`
                            width: 100%;
                            height: 20%;
                            justify-content: flex-start;
                            align-items: center;
                            padding-left: 12%;
                            user-select: none;
                        `}
          text="SALVAR"
          styler={`
                            width: 70%;
                            height: 70%;

                            max-width: 250px;
                            min-width: 200px;

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

                            @media only screen and (min-width: 1920px) {
                                font-size: 3rem;
                            }

                            @media only screen and (min-width: 1600px) {
                                font-size: 2rem;
                            }

                        `}
          onClick={handleSave}
        />
      </ChromaContent>
      <DownloadContent className="flex fd">
        <TutorialContainer>
          <Link id="link-initial-button-style" href="/">
            <Field
              type="button"
              center={`
                            width: 100%;
                            height: 100%;
                            justify-content: flex-start;
                            align-items: center;
                            padding-right: 11.1%;
                            user-select: none;

                            @media only screen and (min-width: 2560px) {
                                align-items: flex-start;
                                border-radius: 10px;
                            }

                            @media only screen and (min-width: 1920px) {
                                align-items: flex-start;
                                border-radius: 10px;
                            }

                            @media only screen and (min-width: 1600px) {
                                align-items: flex-start;
                                border-radius: 10px;
                            }
                        `}
              text="TUTORIAL"
              styler={`
                            width: 100%;
                            height: 50%;

                            color: white;
                            font-size: 1.4rem;
                            font-family: 'Poppins';
                            font-weight: bold;

                            border: none;
                            border-radius: 5px;
                            background-color: #3B1170;

                            transition: 0.75s;

                            &:hover {
                                background-color: #521997;
                            }

                            cursor:pointer;

                            @media only screen and (min-width: 2560px) {
                                border-radius: 10px;
                            }
                            @media only screen and (min-width: 1920px) {
                                font-size: 3rem;
                            }

                            @media only screen and (min-width: 1600px) {
                                font-size: 2rem;
                            }

                        `}
            />
          </Link>
        </TutorialContainer>
        <NodeObsContainer className="flex">
          {/* <Link
                        id="link-initial-button-style"
                        href="/"
                    >
                        <GithubArea className="flex fd">
                            <br />
                            <Field
                                type="title"
                                center={`
                                height: 5%;
                                justify-content: flex-start;
                                
                                @media only screen and (min-width: 2560px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1600px) {
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1300px) {
                                    height: 7%;
                                    align-items: flex-end;
                                }
                                
                            `}
                                text="OBS Filtro:"
                                styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                            padding-right:0%;
                        }
                    `}
                            />
                            <GithubSvgArea className="flex fd">
                                <GithubSvgContent className="flex">
                                    <SvgModel
                                        name="githubSvg"
                                        width="100%"
                                        height="100%"
                                    />
                                </GithubSvgContent>
                            </GithubSvgArea>
                        </GithubArea>
                    </Link> */}
          <Link id="link-initial-button-style" href="/">
            <NodeArea className="flex fd">
              <br />
              {/* <Field
                                type="title"
                                center={`
                                height: 5%;
                                justify-content: flex-start;
                                padding-left: 0%;

                                @media only screen and (min-width: 2560px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1600px) {
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1300px) {
                                    height: 7%;
                                    align-items: flex-end;
                                }
                            `}
                                text="Node:"
                                styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                            padding-right:0%;
                        }
                    `}
                            />
                            <NodeSvgArea>
                                <NodeSvgContent className="flex">
                                    <SvgModel
                                        name="nodeSvg"
                                        width="100%"
                                        height="100%"
                                    />
                                </NodeSvgContent>
                            </NodeSvgArea> */}
            </NodeArea>
          </Link>
        </NodeObsContainer>
        <br />
        {/* <InitializerContainer className="flex fd">
                    <Field
                        type="title"
                        center={`
                                height: 10%;
                                justify-content: flex-start;

                                @media only screen and (min-width: 2560px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1600px) {
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1300px) {
                                    height: 7%;
                                    align-items: flex-end;
                                }
                            `}
                        text="Inicializador:"
                        styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                            padding-right:0%;
                        }
                    `}
                    />
                    <Link
                        id="link-initial-button-style"
                        href="/"
                    >
                        <Field
                            type="button"
                            center={`
                            width: 100%;
                            height: 100%;
                            justify-content: flex-start;
                            align-items: center;
                            padding-right: 11.1%;
                            user-select: none;
                        `}
                            text="ChromaKey.js"
                            styler={`
                            width: 100%;
                            height: 70%;

                            color: #212121;
                            font-size: 1.4rem;
                            font-family: 'Poppins';
                            font-weight: bold;

                            border: 2px solid #212121;
                            border-radius: 5px;
                            background-color: white;

                            transition: 0.75s;

                            &:hover {
                                background-color: #F7E2AE;
                            }

                            cursor:pointer;
                            
                            @media only screen and (min-width: 2560px) {
                                border-radius: 10px;
                            }
                            
                            @media only screen and (min-width: 1920px) {
                                font-size: 3rem;
                            }

                            @media only screen and (min-width: 1600px) {
                                font-size: 2rem;
                            }

                        `}
                        />
                    </Link>
                </InitializerContainer> */}
      </DownloadContent>
    </Container>
  );
}
