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
  updateData: <K extends keyof DataProps>(
    key: K,
    newData: Partial<DataProps[K]>
  ) => void,
  setsurveySoloDonation: React.Dispatch<
    React.SetStateAction<WebsocketSurveyProps[]>
  >,
  surveySoloDonation: WebsocketSurveyProps[]
) {
  const socket = io("http://localhost:8080", {
    auth: { keyHub: keyHub, handle: handle },
    transports: ["websocket"],
  });

  const encodedHandle = nEncode(handle);

  const channelID = keyHub;

  socket.on(channelID + "_viewer_call", (msg) => {
    const data = JSON.parse(msg);
    addDonate(
      {
        date: getToday(),
        type: "call",
        value: feeConvert("call", data.amount),
        donor_name: data.name,
        message: "",
      },
      false
    );
  });

  socket.on(channelID + "_remove_background", (msg) => {
    const data = JSON.parse(msg);
    addDonate(
      {
        date: getToday(),
        type: data.type,
        value: feeConvert("backgroundDonation", data.amount),
        donor_name: data.name,
        message: data.message,
      },
      false
    );
    addDonate(
      {
        date: getToday(),
        type: data.type,
        value: feeConvert("backgroundDonation", data.amount),
        name: data.name,
        message: data.message,
      },
      true
    );
  });

  socket.on(channelID + "_donated_to_survey", (msg) => {
    const data = JSON.parse(msg);

    addDonate(
      {
        date: getToday(),
        type: "survey",
        value: feeConvert("surveyDonation", data.amount),
        donor_name: "",
        message: "",
      },
      false
    );

    const newDonate = {
      id: data.selectedOption,
      amount: data.amount,
    };

    setsurveySoloDonation((prevItems) => [...prevItems, newDonate]);

    const getDonations = localStorage.getItem("options");
    const options = getDonations ? JSON.parse(getDonations) : [];
    options.push(newDonate);
    localStorage.setItem("options", JSON.stringify(options));
  });

  socket.on(channelID + "_created_survey", (msg) => {
    const now = new Date();
    const data = JSON.parse(msg);
    const canAdd = data.hasOwnProperty("notCIW");
    if (!canAdd) {
        addDonate(
          {
            date: getToday(),
            type: "survey",
            value: feeConvert("createSurveyDonation", data.amount),
            donor_name: data.name,
            message: data.message,
          },
          false
        );

        const minTime = data.survey.minTime;
        const [hour, minute] = minTime.split(":");

        localStorage.setItem(
          "survey",
          JSON.stringify({
            allow: false,
            surveyTitle: data.survey.title,
            options: data.survey.options,

            endTime: {
              day: now.getDate(),
              hour: Number(hour),
              minute: Number(minute),
              second: now.getSeconds(),
            },
            amount: "0",
          })
        );

        updateData("survey", {});

        addDonate(
          {
            name: data.name,
            amount: data.amount,
            description: data.message,
            type: data.type,
          },
          true
        );
    }
  });

  socket.on(channelID + "_normal_donation", (msg) => {
    const data = JSON.parse(msg);

    addDonate(
      {
        date: getToday(),
        type: "normal",
        value: feeConvert("normalDonation", data.amount),
        donor_name: data.name,
        message: data.message,
      },
      false
    );

    const dataToTrackDonate = {
      name: data.name,
      amount: data.amount,
      description: data.message,
      type: data.type,
    };
    if (data.hasOwnProperty("audioURL")) {
      Object.assign(dataToTrackDonate, {
        audioURL: data.audioURL,
      });
    }
    if (data.hasOwnProperty("imgURL")) {
      Object.assign(dataToTrackDonate, {
        imgURL: data.imgURL,
      });
    }
    addDonate(dataToTrackDonate, true);
  });

  socket.on(encodedHandle + "_72206d6f6e7468732c20746865792064", (msg) => {
    if (msg === "getStreamerKeyHub") {
      socket.emit(encodedHandle + "_get_keyhub", keyHub);
    }
  });

  return socket;
}
