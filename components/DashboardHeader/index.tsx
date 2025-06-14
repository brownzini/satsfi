import { useEffect, useState } from "react";

import {
  Header,
  WrapperLogoArea,
  Logo,
  OptionsArea,
  OptionArea,
} from "./styles";

//Component
import Option from "./Option";

//Contexts
import { useHeader } from "@/contexts/useHeader";

//Types
import { ScreenProp } from "@/utils/types";
import { useData } from "@/contexts/useData";
import { getUserProfile } from "@/firebase/services/Users";

export default function DashboardHeader() {
  const [screenStatus, setScreenStatus] = useState<boolean>(false);

  const { data, setData } = useData();
  const { screens, setActiveScreen } = useHeader();

  const exceptionScreens = (screen: string) =>
    screen !== "initial" && screen !== "importKey";

  useEffect(() => {
    const filterScreen =
      screens.generateKey.status && data.generateKey.keyHub === "";
    setScreenStatus(
      screens.initial.status || screens.importKey.status || filterScreen
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screens]);

  useEffect(() => {
    
    setTimeout(async () => {
      const accessCode = localStorage.getItem("sid");
      if (accessCode) {
        const [keyHub, handle] = accessCode.split("|");
        const response = await getUserProfile(handle, accessCode);
        if (response) {
          setData(response);
          setActiveScreen("start");
        }
      }
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Header className="flex">
      <WrapperLogoArea className="flex">
        <Logo>SatsFI</Logo>
      </WrapperLogoArea>
      <OptionsArea className="flex">
        {!screenStatus &&
          Object.keys(screens).map(
            (screen) =>
              exceptionScreens(screen) && (
                <OptionArea
                  key={screen}
                  className="flex"
                  width={
                    screens[screen as keyof ScreenProp].status ? "50%" : "10%"
                  }
                  last={
                    screens[screen as keyof ScreenProp].name === "Minha Chave"
                      ? "white"
                      : "#DADEDE"
                  }
                  onClick={() => setActiveScreen(screen as keyof ScreenProp)}
                >
                  <Option
                    screen={screen}
                    name={screens[screen as keyof ScreenProp].name}
                    status={screens[screen as keyof ScreenProp].status}
                  />
                </OptionArea>
              )
          )}
      </OptionsArea>
    </Header>
  );
}
