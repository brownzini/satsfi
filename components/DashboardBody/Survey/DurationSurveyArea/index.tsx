import { Dispatch, SetStateAction } from "react";
import Field from "../../Field";
import { DurationArea, TimerArea, TimeTitle } from "../styles";

interface Props {
  durationTime: number;
  setDurationTime: Dispatch<SetStateAction<number>>;
  surveyStatus: boolean;
}
export default function DurationSurveyArea({
  durationTime,
  setDurationTime,
  surveyStatus,
}: Props) {
  return (
    <DurationArea className="flex">
      <Field
        type="slider"
        center={`
                                width: 100%;
                                height: 10%;
                                justify-content: center;
                                align-items: center;
                                padding-left: 12%;
                            `}
        value={durationTime}
        setValue={setDurationTime}
        durationMin="1"
        durationMax="10"
        styler={` 
                                @media only screen and (min-width: 2560px) {
                                    height: 25%;
                                }
                            `}
        disabled={!surveyStatus}
      />
      <TimerArea>
        <TimeTitle>{durationTime} min</TimeTitle>
      </TimerArea>
    </DurationArea>
  );
}
