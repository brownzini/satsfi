'use client'

import DashboardArea from "@/components/DashboardArea";
import Container from "./styles";

export default function DashboardStruct () {
    return (
        <Container className="flex">
            <DashboardArea />
        </Container>
    );
}