"use client";

import Container from "./styles";

import DashboardArea from "@/components/DashboardArea";
import { MessageProvider } from "@/contexts/useMessage";

export default function DashboardStruct() {
  return (
    <Container className="flex">
      <MessageProvider>
        <DashboardArea />
      </MessageProvider>
    </Container>
  );
}
