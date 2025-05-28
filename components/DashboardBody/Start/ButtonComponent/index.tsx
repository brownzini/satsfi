import { ButtonArea, Container, SvgArea, TextArea, TextTitle } from "./styles";

//Utils
import SvgModel from "@/utils/svg";

type ButtonName = "start" | "stop";

interface ButtonProps {
  status: boolean;
  color: string;
}

interface ButtonStateProps {
  start: ButtonProps;
  stop: ButtonProps;
}

interface Props {
  buttonState: ButtonStateProps;
  getActiveButton: () => ButtonName;
  getButtonName: () => "Iniciar" | "Parar";
  handleClick: () => void;
}

export default function ButtonComponent({
  buttonState,
  getActiveButton,
  getButtonName,
  handleClick,
}: Props) {
  return (
    <Container
      className="flex fd"
      styler={
        getActiveButton() === "stop"
          ? `animation: hit 0.5s ease;`
          : "animation: none;"
      }
    >
      <ButtonArea
        className="flex"
        styler={getActiveButton()}
        onClick={handleClick}
      >
        <SvgArea styler="70%">
          <SvgModel
            name={
              getActiveButton() === "start" ? "initialize" : getActiveButton()
            }
            width="50%"
            height="50%"
          />
        </SvgArea>
        <TextArea>
          <TextTitle> {getButtonName()} </TextTitle>
        </TextArea>
      </ButtonArea>
    </Container>
  );
}
