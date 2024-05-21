import SvgModel from "@/utils/svg";

import {
    OptionArea,
    OptionTitle,
    SvgContainer,
    TooltipText
} from "./styles";

type FieldScreen = {
    status: boolean;
    name: string;
}

type ScreenProp = {
    initial: FieldScreen;
    importKey: FieldScreen;
    overview: FieldScreen;
    config: FieldScreen;
    survey: FieldScreen;
    test: FieldScreen;
    trackDonate: FieldScreen;
    qrCode: FieldScreen;
    call: FieldScreen;
    generateKey: FieldScreen;
    blackList: FieldScreen;
    chromaKey: FieldScreen;
}

interface Props {
    screen: string;
    name: string;
    status: boolean;
}

export default function Option({
    screen,
    name,
    status,
}: Props) {
    return (status) ? (
        <SvgContainer
            className="flex"
            isselected={(status) ? 'opacity: 1;' : 'opacity: 0.5;'}
        >
            <SvgModel
                name={screen}
                width="16%"
                height="50%"
            />
            <OptionTitle>
                {name}
            </OptionTitle>
        </SvgContainer>
    ) : (
        <SvgContainer
            className="tooltip flex"
            isselected={(status) ? 'opacity: 1;' : 'opacity: 0.5;'}
        >
            <SvgModel
                name={screen}
                width="75%"
                height="100%"
            />
            <TooltipText className="tooltiptext">
                {name}
            </TooltipText>
        </SvgContainer>
    )

}