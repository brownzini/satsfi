import SvgModel from "@/utils/svg";
import {
    CardAmountContainer,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    ExportSvgArea,
    ExportTitleArea,
    SvgContainer,
    TitleHeader,
} from "./styles";

interface Props {
    day: string;
    amount: string;
    hasExport: boolean;
}

export default function Card({
    day,
    amount,
    hasExport
}: Props) {

    return (
        <Container>
            <CardHeader className="flex">
                <TitleHeader>{day}</TitleHeader>
            </CardHeader>
            <CardBody className="flex">
                <SvgContainer>
                    <SvgModel
                        name="satoshi"
                        width="50%"
                        height="100%"
                    />
                </SvgContainer>
                <CardAmountContainer>
                    <h2>{amount}</h2>
                </CardAmountContainer>
            </CardBody>
            {hasExport && (
                <CardFooter className="flex">
                    <ExportSvgArea>
                        <SvgModel
                            name="export"
                            width="50%"
                            height="50%"
                        />
                    </ExportSvgArea>
                    <ExportTitleArea>
                        <h3>exportar</h3>
                    </ExportTitleArea>
                </CardFooter>
            )}
        </Container>
    );
}