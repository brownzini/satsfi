import {
    Body,
    Button,
    ButtonArea,
    Container,
    Head,
    HeadTitle
} from "./styles";

export default function Initial() {
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
                    > Import key hub </Button>
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
                    > Create new hub </Button>
                </ButtonArea>
            </Body>
        </Container>
    );
}