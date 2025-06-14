import { useState } from "react";

import {
  BackButton,
  ButtonArea,
  ConfirmButton,
  Container,
  ImportContent,
  InputArea,
} from "./styles";

//Contexts
import { useData } from "@/contexts/useData";
import { useHeader } from "@/contexts/useHeader";
import Field from "../Field";
import { getUserProfile } from "@/firebase/services/Users";
import { useMessage } from "@/contexts/useMessage";

export default function ImportKey() {
  const { setData } = useData();
  const { setActiveScreen } = useHeader();

  const { dispatchMessage } = useMessage();

  const [accessCode, setAccessCode] = useState<string>("");

  const [acError, setACError] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    if (!loading) {
      setLoading(true);

      if (e.detail > 1) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 10 * 1000);
        return;
      }

      const [keyHub, handle] = accessCode.split("|");
      const response = await getUserProfile(handle, accessCode);

      if (accessCode.length < 100) {
        setACError(false);
        dispatchMessage("[ERRO]: Campo inválido !!", false);
        return;
      }

      if (response) {
        setData(response);
        setActiveScreen("start");
        localStorage.setItem("sid", accessCode);
      } else {
        setACError(false);
        dispatchMessage("[ERRO]: Hub inválido !!", false);
      }
      setLoading(false);
    }
  }

  const normalizeAccessCode = () => {
    setACError(true);
  };

  const backPage = () => setActiveScreen("initial");

  return (
    <Container className="flex fd">
      <InputArea className="flex fd">
        <ImportContent className="flex fd">
          <Field
            type="title"
            text="Chave do seu Hub:  "
            center={`
                              height: 10%;
                              justify-content: flex-start;
                       
                          `}
            styler={`
                              color: ${acError ? "#3C5774" : "red"};
                              transition: 0.5s;
                              font-size: 1.6rem;
                              font-family: "Inter";
                              font-weight: bold;
          
                              @media only screen and (min-width: 2560px) {
                                  font-size: 3rem;
                              }
                          `}
          />
          <ButtonArea className="flex">
            <Field
              type="input"
              center={`   
                        width: 100%;
                        height: 100%;
                  `}
              styler={`
                        width: 100%;
                        height: 50%;

                        border-radius: 5px;

                        color: ${acError ? "#240C42" : "red"};
                        font-family: "Roboto";
                        font-weight: 300;
                        font-size: 1.2rem;
                        font-style: italic;
                        transition: 0.5s ease;           

                        padding-left: 3%;
                        outline:none;
                    
                        @media only screen and (min-width: 2560px) {
                            font-size: 2rem;
                        }

                        cursor: pointer;
                    `}
              maxLength={300}
              inputType="text"
              inputValue={accessCode}
              setInputValue={setAccessCode}
              placeholder="EX: satsfi_78dsa8d7as5x..."
              isSecret
              onClick={normalizeAccessCode}
            />
            <ConfirmButton onClick={handleLogin} disabled={loading}>
              {!loading ? "ENTRAR" : "CARREGANDO"}
            </ConfirmButton>
          </ButtonArea>
        </ImportContent>
      </InputArea>

      <BackButton onClick={backPage}> voltar </BackButton>
    </Container>
  );
}
