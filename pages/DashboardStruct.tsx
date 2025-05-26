"use client";

import Container from "./styles";

import DashboardArea from "@/components/DashboardArea";
import { CampaignProvider } from "@/contexts/campaignContext";
import { MessageProvider } from "@/contexts/useMessage";

export default function DashboardStruct() {
  return (
    <Container className="flex">
      <MessageProvider>
        <CampaignProvider>
          <DashboardArea /> 
        </CampaignProvider>
      </MessageProvider>
    </Container>
  );
}
