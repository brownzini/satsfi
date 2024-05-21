import {
    Body,
    Button,
    ButtonArea,
    Container,
    Head,
    HeadTitle
} from "./styles";

//Contexts
import { useHeader } from "@/contexts/useHeader";

export default function Initial() {
    
    const { setActiveScreen } = useHeader();

    const handleClick = () => setActiveScreen('importKey');
    
    return (
        <Container className="flex fd">
            <Head className="flex">
                <HeadTitle>👋 Bem vindo ao painel SatsFI</HeadTitle>
            </Head>
            <Body className="flex fd">
                <ButtonArea>
                    <Button
                        styles={`
                            background-color:#9BC9EA;
                            color:white;
                            &:hover {
                                background-color:#1F78B9;
                            }
                        `}
                        onClick={handleClick}
                    > 
                      Import key hub 
                    </Button>
                </ButtonArea>
                <ButtonArea>
                    <Button
                        styles={`
                            color:#6D00FF;
                            background-color:#E0C9FF;

                            &:hover {
                                color:white;
                                background-color:#6B3EA5;
                            }
                        `}
                    > 
                      Create new hub 
                    </Button>
                </ButtonArea>
            </Body>
        </Container>
    );
}