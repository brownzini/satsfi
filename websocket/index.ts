import { WebsocketSurveyProps } from "@/utils/types";
import { DataProps } from "../contexts/useData";
import { nEncode } from "../utils/encrypt/encrypt";
import { io } from "socket.io-client";
import { getToday } from "../utils/Date";
import { feeConvert } from "../utils/inputFormat";

export default function WebSocketService(
    handle: string,
    keyHub: string,
    config = null as DataProps | null,
    addDonate: (newDonate: any, normalDonate?: boolean) => void,
    updateData: <K extends keyof DataProps>(key: K, newData: Partial<DataProps[K]>) => void,
    setsurveySoloDonation: React.Dispatch<React.SetStateAction<WebsocketSurveyProps[]>>,
    surveySoloDonation: WebsocketSurveyProps[]
) {

    const socket = io('http://localhost:8080', {
        auth: { keyHub: keyHub, handle: handle },
        transports: ["websocket"],
    });

    const encodedHandle = nEncode(handle);

    const channelID = keyHub;

    socket.on(channelID + '_remove_background', (msg) => {
        const data = JSON.parse(msg);
        addDonate({
            date: getToday(),
            type: "background",
            value: feeConvert("backgroundDonation", data.amount),
            donor_name: data.name,
            message: data.message,
        }, false);
    });

    //Canal para enviar dados do obs
    socket.on(encodedHandle + '_emitAddress', (msg) => {
        if (msg === 'getAddress' && config) {            
            const obsPassword = config.chromaKey.obsPassword;
            socket.emit(
                (channelID + '_sentAddress'), 
                JSON.stringify({ 
                    param: "_sentAddress", 
                    obsPassword: obsPassword 
                })
            );
        }
    });

    //Canal para receber as chamadas
    socket.on(channelID + '_viewer_call', (msg) => {
        const data = JSON.parse(msg);
        addDonate({
            date: getToday(),
            type: "call",
            value: feeConvert("call", data.amount),
            donor_name: data.name,
            message: "",
        }, false);
    });

    socket.on(channelID + '_donated_to_survey', (msg) => {
        const data = JSON.parse(msg);

        addDonate({
            date: getToday(),
            type: "survey",
            value: feeConvert("surveyDonation", data.amount),
            donor_name: data.name,
            message: data.message,
        }, false);

        setsurveySoloDonation((prevItems) => [...prevItems, {
            id: data.selectedOption,
            amount: data.amount
        }]);
    });

    socket.on(channelID + '_created_survey', (msg) => {

        function getNextDay() {
            const today = new Date();
            const nextDay = new Date(today);

            nextDay.setDate(today.getDate() + 1);

            return nextDay;
        }

        const now = new Date();
        const incrementMinute = ((config) ? config.survey.durationTime*10 : 1);

        const completeMinute = now.getMinutes() + incrementMinute;

        const filterMinute = (completeMinute >= 60) ? completeMinute - 60 : completeMinute;

        const zeroHour = (now.getHours() + 1 === 24) ? 0 : now.getHours() + 1;
        const moreOneHour = (completeMinute >= 60) ? zeroHour : now.getHours();

        const moreOneDay = (moreOneHour === 0) ? getNextDay().getHours() : now.getUTCDate();

        const data = JSON.parse(msg);

        addDonate({
            date: getToday(),
            type: "survey",
            value: feeConvert("createSurveyDonation", data.amount),
            donor_name: data.name,
            message: data.message,
        }, false);

        updateData('survey', {
            allow: false,
            minCreateSurvey: config?.survey.minCreateSurvey,
            durationTime: config?.survey.durationTime,

            surveyTitle: data.title,
            options: data.options,
            minToVote: config?.survey.minToVote,

            endTime: {
                day: moreOneDay,
                hour: moreOneHour,
                minute: filterMinute,
                second: now.getSeconds(),
            },
            amount: "0",
        });
    });

    socket.on(channelID + '_normal_donation', (msg) => {
        const data = JSON.parse(msg);

        addDonate({
            date: getToday(),
            type: "normal",
            value: feeConvert("normalDonation", data.amount),
            donor_name: data.name,
            message: data.message,
        }, false);

        addDonate({
            name: data.name,
            amount: data.amount,
            description: data.message,
            type: data.type,
            narrator: "",
            isCalling: false,
            callUrl: "",
            backgroundUrl: "",
        }, true);
    });

    socket.on(encodedHandle + '_72206d6f6e7468732c20746865792064', (msg) => {
        if (msg === "getStreamerKeyHub") {
            socket.emit(encodedHandle + '_get_keyhub', keyHub);
        }
    });

    return socket;
}