import { useState } from "react";

import {
    Button,
    Container,
    ImportContent,
    Input,
    InputArea,
    Label,
    Title,
    TitleArea,
} from "./styles";

//Contexts
import { useData } from "@/contexts/useData";
import { useHeader } from "@/contexts/useHeader";
import { useMessage } from "@/contexts/useMessage";
import SvgModel from "@/utils/svg";

interface ErrorProps {
    status: boolean;
    message: string;
}

export default function ImportKey() {
    
    const { setData } = useData();
    const { setActiveScreen } = useHeader();
    const { dispatchMessage } = useMessage();

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('Nenhum arquivo selecionado');
            return;
        }
        
        if(file.type === "application/json") {
           const reader = new FileReader();

           reader.onload = (e: any) => {
               try {
                   const userHubData = JSON.parse(e.target.result);
                   setData(userHubData);
                   setActiveScreen('overview');
               } catch (error) {
                   dispatchMessage('[ERRO]: Erro na leitura do arquivo JSON', false);
               }
           };

           reader.onerror = (e: any) => {
               console.error('Erro ao ler o arquivo:', e.target.error);
           };

           reader.readAsText(file);
        } else {
           dispatchMessage('[ERRO]: Apenas arquivos JSON são permitidos', false);
        }
    };

    return (
        <Container className="flex fd">
            <InputArea className="flex">
                <Input
                    type="file"
                    onChange={handleFileChange}
                    key="key"
                    id="fileInput"
                    className="hidden-input"
                />

                <ImportContent className="flex">
                <SvgModel 
                    name="import"
                    width="30%"
                    height="100%"
                />
                <Label
                    className="flex"
                    htmlFor="fileInput"
                >
                    Importar
                </Label>
                </ImportContent>
            </InputArea>
        </Container>
    );
}