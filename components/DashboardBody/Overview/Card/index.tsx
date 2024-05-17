import SvgModel from "@/utils/svg";
import {
    CardAmountContainer,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    ExportSvgArea,
    ExportTitleArea,
    TitleHeader,
} from "./styles";
import CSVConverter from "../Export";

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
                <CardAmountContainer>
                    <h2>{amount}</h2>
                </CardAmountContainer>
            </CardBody>
            {hasExport && (
                <CardFooter className="flex">
                    <ExportTitleArea>
                    <ExportSvgArea>
                        <SvgModel
                            name="export"
                            width="50%"
                            height="50%"
                        />
                    </ExportSvgArea>
                        <CSVConverter />
                    </ExportTitleArea>
                </CardFooter>
            )}
        </Container>
    );
}