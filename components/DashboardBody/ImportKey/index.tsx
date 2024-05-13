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

interface ErrorProps {
    status:boolean;
    message: string;
}

export default function ImportKey() {
    const [key, setKey] = useState<string>('');

    const [error, setError] = useState<ErrorProps>({
        status: false, message: ''
    });
    const handleImport = () => {
     
        if(key === "banana") {
            setError({status:true, message: '[ERRO]: Chave não encontrada'}); 
        }
        if (key !== "") {

        } else {
          setError({status:true, message: '[ERRO]: Campo vazio. Preencha corretamente'});
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
                    placeholder="Copie e cole sua chave aqui..."
                    onChange={(e) => setKey(e.target.value)}
                    onClick={() => setError({status: false, message: error.message})}
                />
                <Button onClick={handleImport}> Importar </Button>
            </InputArea>
            {(error.status) && <MessageError>
                {error.message}
            </MessageError>}
        </Container>
    );
}