import { useEffect, useState } from "react";

import { Container, Timer } from "./styles";

import { useData } from "@/contexts/useData";

interface TimerProps {
    minute: number;
    second: number;
}

interface Props {
    endTime: () => void;
}

export default function TimerComponent({ 
    endTime,
}:Props) {
    const { data } = useData();
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [deadline, setDeadline] = useState<TimerProps>({minute:100, second:0});
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return (minutes >= 0 && remainingSeconds >= 0) ? `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}` : '00:00';
    };

    const checkTime = () => {
        const now = new Date();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        
        if (minute >= deadline.minute && second >= deadline.second) {
            endTime();
            setRemainingTime(0);
            clearInterval(validationTimer);
        }
        clearInterval(validationTimer);
    };
    let validationTimer = setInterval(checkTime, 1000);

    useEffect(() => {
        const now = new Date();   
        const minute = now.getMinutes();
        const second = now.getSeconds();
        
        //Contexto
        const futureMinute = data.survey.endTime.minute;
        const futureSecond = data.survey.endTime.second;
        
        const minuteFilter = (futureMinute-minute);
        
        if(minuteFilter < 0) {
            endTime();
        } 

        const allSeconds = (minute*60)+second;
        const generalSeconds = (futureMinute*60)+futureSecond;

        const result = generalSeconds - allSeconds;
        
        setRemainingTime(result);
        setDeadline({ minute: futureMinute, second: second });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(time => time - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container className="flex">
            <Timer>{formatTime(remainingTime)}</Timer>
        </Container>
    );
}