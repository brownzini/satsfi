import { useEffect, useState } from "react";
import { Container, Timer } from "./styles";

interface TimerProps {
    minute: number;
    second: number;
}

interface Props {
    data: TimerProps;
    endTime: () => void;
}

export default function TimerComponent({ 
    data, 
    endTime,
}:Props) {
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
        const futureMinute = data.minute;
        const futureSecond = data.second;
        
        const minuteFilter = (futureMinute-minute);

        const remainingTimeFilter = (minuteFilter <= 0) ? 0 : (minuteFilter);
        const acutalMinute = (minuteFilter <= 0) ? 0 : (minuteFilter+minute); 

        const secondsFilter = ((futureSecond-second) > 0 ? (futureSecond-second) : 0);
        
        if(minuteFilter < 0) {
            endTime();
        } 

        if(minuteFilter > 0) { 
            setRemainingTime((remainingTimeFilter*60)+secondsFilter);
            setDeadline({ minute: acutalMinute, second: futureSecond });
        } else if(minuteFilter === 0 && (futureSecond-second) > 0) { 
            setRemainingTime((remainingTimeFilter*60)+secondsFilter);
            setDeadline({ minute: acutalMinute, second: futureSecond });
        } else {
            endTime();
        }
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