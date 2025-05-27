"use client";

import Container from "./styles";

import DashboardArea from "@/components/DashboardArea";
import { CampaignProvider } from "@/contexts/campaignContext";
import { InCallProvider } from "@/contexts/useCall";
import { MessageProvider } from "@/contexts/useMessage";

export default function DashboardStruct() {
  return (
    <Container className="flex">
      <MessageProvider>
        <CampaignProvider>
          <InCallProvider>
            <DashboardArea />
          </InCallProvider>
        </CampaignProvider>
      </MessageProvider>
    </Container>
  );
}
