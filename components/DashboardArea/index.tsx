import { Container } from "./styles";

//Components
import DashboardHeader from "../DashboardHeader";
import DashboardBody from "../DashboardBody";

//Contexts
import { HeaderProvider } from "@/contexts/useHeader";
import { DataProvider } from "@/contexts/useData";
import { ActiveWsProvider } from "@/contexts/useActiveWs";
import { useEffect, useRef } from "react";
import { getLoan } from "@/app/firebase/services/Loan";
import { useCampaign } from "@/contexts/campaignContext";

export default function DashboardArea() {

  const { setCampaign } = useCampaign();
  const hasRun = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_code = localStorage.getItem("sid");
        if (access_code) {
          const [keyHub, handle] = access_code.split("|");
          const loanData = await getLoan(handle);
          setCampaign(loanData);
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
