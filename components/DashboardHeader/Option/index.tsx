import SvgModel from "@/utils/svg";

import {
    OptionTitle,
    SvgContainer,
    TooltipText
} from "./styles";

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