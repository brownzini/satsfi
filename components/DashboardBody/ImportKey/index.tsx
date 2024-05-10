import { useState } from "react";
import { 
    Button,
    Container, 
    Input, 
    InputArea, 
    Title, 
    TitleArea,
} from "./styles";


export default function ImportKey() {
    const [key, setKey] = useState<string>('');
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
                />
                <Button> Importar </Button>
            </InputArea>
        </Container>
    );
}