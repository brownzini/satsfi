import { Container } from "./styles";

//Components
import DashboardHeader from "../DashboardHeader";
import DashboardBody from "../DashboardBody";

//Contexts
import { HeaderProvider } from "@/contexts/useHeader";
import { DataProvider } from "@/contexts/useData";
import { ActiveWsProvider } from "@/contexts/useActiveWs";
import { useEffect, useRef } from "react";
import { getLoan } from "@/firebase/services/Loan";
import { useCampaign } from "@/contexts/campaignContext";
import { streamerSocket } from "@/utils/CallWebsocket";
import { useCall } from "@/contexts/useCall";
import { useMessage } from "@/contexts/useMessage";
import getBtcPrice from "@/utils/getBtcPrice";

export default function DashboardArea() {
  const { setCampaign } = useCampaign();
  const {
    setUsername,
    setStartCallHash,
    setEndCallHash,
    setIsCalling,
    setFinishedCall,
    setSocket,
  } = useCall();
  const { setBtcPrice } = useMessage();
  const hasRun = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_code = localStorage.getItem("sid");
        if (access_code) {
          const [keyHub, handle] = access_code.split("|");
          const loanData = await getLoan(handle);
          setCampaign(loanData);
          const socket = streamerSocket({
            handle,
            setUsername,
            setStartCallHash,
            setEndCallHash,
            setIsCalling,
            setFinishedCall,
          });
          setSocket(socket);
          const response = await getBtcPrice();
          setBtcPrice(response);
        }
      } catch (error) {}
    };

    if (!hasRun.current) {
      hasRun.current = true;
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="flex fd">
      <HeaderProvider>
        <DataProvider>
          <ActiveWsProvider>
            <DashboardHeader />
            <DashboardBody />
          </ActiveWsProvider>
        </DataProvider>
      </HeaderProvider>
    </Container>
  );
}
