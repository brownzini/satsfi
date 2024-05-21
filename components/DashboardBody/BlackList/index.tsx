import { useState } from "react";
import {
    Container,
    RemoveArea,
    TextAreaContainer,
    TextAreaFieldArea,
    TextAreaFieldSvg,
    TextAreaFieldTexxt,
    TextAreaWrapper,
} from "./styles";

//Components
import Field from "../Field";
import SvgModel from "@/utils/svg";
import { useMessage } from "@/contexts/useMessage";

interface WordProps {
    name: string;
}

export default function BlackList() {
    const compactedWords = '';
    
    const [word, setWord] = useState<string>('');
    const [wordList, setWordList] = useState<WordProps[]>([]);

    const { dispatchMessage } = useMessage();

    const alreadyOnTheList = (wordSearch: string) => {
        const response = wordList.filter(word => word.name === wordSearch);
        return (response.length > 0) ? true : false;
    };

    const addWord = () => {
        const validation = alreadyOnTheList(word);
        if (!validation) {
            setWordList(prevWord => [
                ...prevWord,
                { name: word }
            ]);
        }
    }

    const removeWord = (name: string) => {
        const validation = alreadyOnTheList(name);
        if (validation) {
            setWordList(prevWords => prevWords.filter(word => word.name !== name));
        }
    }

    const cleanEverything = () => {
        setWordList([]);
    }

    const handleFilterWords = (compacted: boolean) => {
        if(compacted) {
           return wordList.join(' ');
        } else {
            return compactedWords.split(' ');
        }
    }

    const handleSave = () => {
        if(wordList.length > 0) {
            const compacted = handleFilterWords(true);
            dispatchMessage('[SUCESSO]: Palavras registradas', true, 3000);
        }
    }

    return (
        <Container className="flex fd">
            <Field
                type="title"
                center={`
                                height: 10%;
                                justify-content: flex-start;
                                padding-left: 12%;

                                @media only screen and (min-width: 2560px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1920px) {
                                    height: 3%;
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1600px) {
                                    align-items: flex-end;
                                }

                                @media only screen and (min-width: 1300px) {
                                    height: 7%;
                                    align-items: flex-end;
                                }
                            `}
                text="Lista de palavras bloqueadas:"
                styler={`
                        color: #3C5774;
                        font-size: 1.4rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-height: 900px) {
                            font-size: 2.5rem;
                            padding-right:0%;
                        }
                    `}
            />
            <Field
                type="input"
                center={`
                            width: 100%;
                            height: 10%;
                            padding-left: 12%;
                    `}
                styler={`
                            width: 87.1%;
                            height: 100%;

                            border-radius: 5px;

                            transition: 0.3s;
                            color: ${true ? '#6a5212' : 'red'};
                            font-family: "Roboto";
                            font-weight: 400;
                            font-size: 1.2rem;

                            padding-left: 1%;

                            @media only screen and (min-height: 900px) {
                                font-size: 2rem;
                                padding-right:0%;
                            }

                            outline:none;
                            user-select: none;

                            cursor:pointer;
                    `}
                maxLength={100}
                inputType="text"
                inputValue={word}
                onKeyDown={addWord}
                setInputValue={setWord}
                placeholder="Digite a palavra a ser bloqueada ..."
            />
            <TextAreaContainer className="flex">
                <TextAreaWrapper>
                    {(wordList.length > 0) && wordList.map((word, index) => (
                        <TextAreaFieldArea
                            key={index}
                            className="flex"
                        >
                            <TextAreaFieldSvg
                                className="flex"
                                onClick={() => removeWord(word.name)}
                            >
                                X
                            </TextAreaFieldSvg>
                            <TextAreaFieldTexxt>
                                {word.name}
                            </TextAreaFieldTexxt>
                        </TextAreaFieldArea>
                    ))}
                </TextAreaWrapper>
                <RemoveArea 
                    className="flex"
                    onClick={cleanEverything}
                >
                    <SvgModel
                        name="delete"
                        width="70%"
                        height="100%"
                    />
                </RemoveArea>
            </TextAreaContainer>
            <Field
                type="button"
                center={`
                            width: 100%;
                            height: 20%;
                            justify-content: flex-end;
                            align-items: center;
                            padding-right: 11.1%;
                            user-select: none;
                        `}
                text="SALVAR"
                styler={`
                            width: 50%;
                            height: 70%;

                            max-width: 250px;
                            min-width: 200px;

                            color: white;
                            font-size: 1.4rem;
                            font-family: 'Poppins';
                            font-weight: bold;

                            border: none;
                            border-radius: 5px;
                            background-color: #07CCA1;

                            transition: 1s;

                            &:hover {
                                background-color: #11977a;
                            }

                            cursor:pointer;

                            @media only screen and (min-width: 1920px) {
                                font-size: 3rem;
                            }

                            @media only screen and (min-width: 1600px) {
                                font-size: 2rem;
                            }

                        `}
                onClick={handleSave}
            />
        </Container>
    );
}