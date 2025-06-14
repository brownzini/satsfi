import { useEffect, useState } from "react";

import { Container, Timer } from "./styles";

import { useData } from "@/contexts/useData";

interface TimerProps {
    hour: number;
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
    const [deadline, setDeadline] = useState<TimerProps>({ hour: 0, minute:100, second:0});
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return (minutes >= 0 && remainingSeconds >= 0) ? `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}` : '00:00';
    };

    const checkTime = () => {
        const now = new Date();
        const day = now.getUTCDate();
        const month = now.getUTCMonth()+1;
        const year = now.getUTCFullYear();

        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        const actualDate = new Date(month+"-"+day+"-"+year+' '+hour+':'+minute+":"+second);
        const targetDate = new Date(month+"-"+day+"-"+year+' '+deadline.hour+':'+deadline.minute+":"+deadline.second);
        
        if (actualDate >= targetDate) {
            endTime();
            setRemainingTime(0);
            clearInterval(validationTimer);
        }
        clearInterval(validationTimer);
    };
    let validationTimer = setInterval(checkTime, 1000);

    useEffect(() => {
        const now = new Date();   
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        
        //Contexto
        const futureMinute = data.survey.endTime.minute;
        const futureSecond = data.survey.endTime.second;
        
        const allSeconds = (minute*60)+second;
        const generalSeconds = (futureMinute*60)+futureSecond;

        const result = generalSeconds - allSeconds;
        
        setRemainingTime(result);
        setDeadline({ hour: (data.survey.endTime.hour) ? data.survey.endTime.hour : hour, minute: futureMinute, second: second });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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