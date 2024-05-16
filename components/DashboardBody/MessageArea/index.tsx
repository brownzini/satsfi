import { 
    Container,
    ContentArea, 
    SvgArea
} from "./styles";

import SvgModel from "@/utils/svg";

import { useMessage } from "@/contexts/useMessage";

export default function MessageArea() {
    const { message, status, isSucess } = useMessage();
    return (status) &&  
            <Container className="flex">
                <ContentArea 
                    className="flex"
                    styler={(isSucess) ? '#07CCA1' : '#FF8585'}
                >
                    <SvgArea>
                        <SvgModel
                            name={(isSucess) ? "confirm" : "error"}
                            width="100%"
                            height="100%"
                        />
                    </SvgArea>
                    {message}
                </ContentArea>
            </Container>

}