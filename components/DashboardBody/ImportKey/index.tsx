import { useState } from "react";
import {
    Button,
    Container,
    Input,
    InputArea,
    MessageError,
    Title,
    TitleArea,
} from "./styles";
import { useMessage } from "@/contexts/useMessage";

interface ErrorProps {
    status:boolean;
    message: string;
}

export default function ImportKey() {
    const [key, setKey] = useState<string>('');

    const [error, setError] = useState<ErrorProps>({
        status: false, message: ''
    });

    const { dispatchMessage } = useMessage();

    const handleImport = () => {
     
        if(key === "banana") {
            setError({status:true, message: '[ERRO]: Chave não encontrada'});
            dispatchMessage('[ERRO]: Chave não encontrada', false);
        }
        if (key !== "") {

        } else {
          setError({status:true, message: '[ERRO]: Campo vazio. Preencha corretamente'});
          dispatchMessage('[ERRO]: Campo vazio. Preencha corretamente', false);
        }
    }

    return (
        <Container className="flex fd">
            <TitleArea>
                <Title>Importar a chave do seu hub</Title>
            </TitleArea>
            <InputArea >
                <Input
                    type="text"
                    value={key}
                    name="import-key-input"
                    placeholder="Copie e cole sua chave aqui..."
                    styler={(error.status) ? 'red' : '#E2DEF9'}
                    onChange={(e) => setKey(e.target.value)}
                    onClick={() => setError({status: false, message: error.message})}
                />
                <Button onClick={handleImport}> Importar </Button>
            </InputArea>
        </Container>
    );
}