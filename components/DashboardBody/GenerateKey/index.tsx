import { useState } from "react";

import {
    Content,
    GenerationArea,
    SvgArea,
    SvgAreaWrapper
} from "./styles";

//Components
import Field from "../Field";
import SvgModel from "@/utils/svg";
import { v4 as uuidv4 } from 'uuid';
import { useMessage } from "@/contexts/useMessage";

export default function GenerateKey() {
    const [handle, setHandle] = useState<string>('');
    const [keyHub, setKeyHub] = useState<string>('');
    const [lightningAddress, setLightningAddress] = useState<string>('');

    const [handleError, setHandleError] = useState<boolean>(false);
    const [keyHubError, setKeyHubError] = useState<boolean>(false);
    const [addressError, setAddressError] = useState<boolean>(false);

    const { dispatchMessage } = useMessage();

    function generateCode() {
        if(keyHub === 'Gere a chave primeiro') normalizeKeyHub();
        const cod1 = uuidv4().replace(/[_-]/g, "");
        const cod2 = uuidv4().replace(/[_-]/g, "");
        const cod3 = uuidv4().replace(/[_-]/g, "");
        setKeyHub('satisfi_' + cod1 + cod2 + cod3);
    }

    function copyTextToClipboard() {
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(keyHub).then(function () {
            dispatchMessage('Link copiado com sucesso!', true, 2000);
        }, function (err) {
            dispatchMessage('Erro ao copiar o texto', true, 2000);
        });
    }

    const voidFunction = () => {
        normalizeKeyHub();
    }
    const handleChangeGenerate = (param: string) => { }
    
    const handleClick = () => {
        if (handle === '') {
            setHandle('Nome Inválido');
            setHandleError(true);
        }
        if (keyHub === '') {
            setKeyHub('Gere a chave primeiro');
            setKeyHubError(true);
        }
        if (lightningAddress === '') {
            setLightningAddress('Preencha o campo');
            setAddressError(true);
        }

        if(handle !== 'Nome Inválido' && keyHub !== 'Gere a chave primeiro' && lightningAddress !== 'Preencha o campo' && 
           handle !== '' && keyHub !== '' && lightningAddress !== '') {
           resetAllFields();
           dispatchMessage('[SUCESSO]: Seu hub foi criado com sucesso !!', true);
        }
    }

    const normalizeHandle = () => {
        if (handle === 'Nome Inválido') {
            setHandle('');
        }
        setHandleError(false);
    }

    const normalizeLNAddress = () => {
        if (lightningAddress === 'Preencha o campo') {
            setLightningAddress('');
        }
        setAddressError(false);
    }

    const normalizeKeyHub = () => {
        if (keyHub === 'Gere a chave primeiro') {
            setKeyHub('');
        }
        setKeyHubError(false);
    }

    const resetAllFields = () => {
        setHandleError(false);
        setKeyHubError(false);
        setAddressError(false);
    }

    return (
        <Content>
            <Field
                type="title"
                text={"satsfi.com/" + ((handle === 'Nome Inválido') ? '' : handle)}
                center={`
                            height: 16%;
                            justify-content: flex-start;
                            padding-left: 12%;
                `}
                styler={`
                            color: ${(!handleError) ? '#3C5774' : 'red'};
                            transition: 0.5s;
                            font-size: 1.6rem;
                            font-family: "Inter";
                            font-weight: bold;
                            word-wrap: break-word;
                            max-width: 70%;

                            @media only screen and (min-width: 2560px) {
                                font-size: 3rem;
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
                            width: 100%;
                            height: 100%;
                            max-width: 340px;

                            border-radius: 5px;

                            color: ${(!handleError) ? '#240C42' : 'red'};
                            font-family: "Roboto";
                            font-weight: 300;
                            font-size: 1.4rem;
                            font-style: italic;
                            transition: 0.5s ease;

                            padding-left: 3%;
                            outline:none;

                            @media only screen and (min-width: 2560px) {
                                font-size: 2rem;
                            }
                `}
                maxLength={30}
                placeholder="Ex: satsfi.com/BananaTV"
                inputType="text"
                inputValue={handle}
                setInputValue={setHandle}
                onClick={normalizeHandle}
            />
            <br />
            <Field
                type="title"
                text="Endereço lightning para receber: "
                center={`
                        height: 10%;
                        justify-content: flex-start;
                        padding-left: 12%;
                `}
                styler={`
                        color: ${(!addressError) ? '#3C5774' : 'red'};
                        transition: 0.5s;
                        font-size: 1.6rem;
                        font-family: "Inter";
                        font-weight: bold;

                        @media only screen and (min-width: 2560px) {
                            font-size: 3rem;
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
                    width: 100%;
                    height: 100%;
                    max-width:520px;

                    border-radius: 5px;

                    color: ${(!addressError) ? '#240C42' : 'red'};
                    font-family: "Roboto";
                    font-weight: 300;
                    font-size: 1.2rem;
                    font-style: italic;
                    transition: 0.5s ease;

                    @media only screen and (min-width: 2560px) {
                        font-size: 2rem;
                    }

                    padding-left: 3%;
                    outline:none;
                `}
                maxLength={400}
                placeholder="Seu endereço de receber da sua carteira lightning"
                inputType="text"
                inputValue={lightningAddress}
                setInputValue={setLightningAddress}
                onClick={normalizeLNAddress}
            />
            <br />
            <Field
                type="title"
                text="Chave do seu hub:  "
                center={`
                    height: 10%;
                    justify-content: flex-start;
                    padding-left: 12%;
                `}
                styler={`
                    color: ${(!keyHubError) ? '#3C5774' : 'red'};
                    transition: 0.5s;
                    font-size: 1.6rem;
                    font-family: "Inter";
                    font-weight: bold;

                    @media only screen and (min-width: 2560px) {
                        font-size: 3rem;
                    }
                `}
            />
            <GenerationArea className="flex">
                <Field
                    type="input"
                    center={`   
                        width: 100%;
                        height: 100%;
                        padding-left: 12%;
                    `}
                    styler={`
                        width: 100%;
                        height: 100%;

                        border-radius: 5px;

                        color: ${(!keyHubError) ? '#240C42' : 'red'};
                        font-family: "Roboto";
                        font-weight: 300;
                        font-size: 1.2rem;
                        font-style: italic;
                        transition: 0.5s ease;

                        caret-color: transparent;               

                        padding-left: 3%;
                        outline:none;

                        @media only screen and (min-width: 2560px) {
                            font-size: 2rem;
                        }

                        cursor: pointer;
                    `}
                    maxLength={300}
                    inputType="text"
                    inputValue={keyHub}
                    setInputValue={handleChangeGenerate}
                    placeholder="Nenhuma chave gerada"
                    onClick={() => (keyHub !== '' && keyHub !== 'Gere a chave primeiro') ? copyTextToClipboard() : voidFunction()}
                />
                <SvgAreaWrapper>
                    <SvgArea
                        className="flex"
                        onClick={generateCode}
                    >
                        <SvgModel
                            name="add2"
                            width="100%"
                            height="100%"
                        />
                    </SvgArea>
                </SvgAreaWrapper>
            </GenerationArea>
            <Field
                type="title"
                text="[ ! ] AVISO: Não compartilhe sua chave com ninguém"
                center={`
                    height: 10%;
                    justify-content: flex-start;
                    padding-left: 12%;
                `}
                styler={`
                    color: #0D72AB;
                    transition: 0.5s;
                    font-size: 1rem;
                    font-family: "Inter";
                    font-weight: bold;

                    @media only screen and (min-width: 2560px) {
                        font-size: 2rem;
                    }
                `}
            />
            <br />
            <Field
                type="button"
                center={`
                    width: 100%;
                    height: 20%;
                    justify-content: flex-start;
                    align-items: center;
                    padding-left: 12%;
                    
                `}
                text="Salvar"
                styler={`
                    width: 20%;
                    height: 70%;
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

                    @media only screen and (min-width: 2560px) {
                        font-size: 2rem;
                    }

                    cursor:pointer;
                `}
                onClick={handleClick}
            />
        </Content>
    );
}