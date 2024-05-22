import { useEffect, useState } from "react";

import {
    Button,
    ButtonArea,
    Content,
    FileArea,
    GenerationArea,
    LinkToDownload,
    SvgArea,
    SvgAreaWrapper
} from "./styles";

//Components
import Field from "../Field";
import { v4 as uuidv4 } from 'uuid';

//Utils
import SvgModel from "@/utils/svg";
import { isOnlySpaces } from "@/utils/inputFormat";

//Contexts
import { useData } from "@/contexts/useData";
import { useMessage } from "@/contexts/useMessage";
import { useHeader } from "@/contexts/useHeader";

export default function GenerateKey() {

    const { data, updateData } = useData();

    const [handle, setHandle] = useState<string>(data.generateKey.idString);
    const [keyHub, setKeyHub] = useState<string>(data.generateKey.keyHub);
    const [lightningAddress, setLightningAddress] = useState<string>(data.generateKey.addressLightning);

    const [handleError, setHandleError] = useState<boolean>(false);
    const [keyHubError, setKeyHubError] = useState<boolean>(false);
    const [addressError, setAddressError] = useState<boolean>(false);

    const { dispatchMessage } = useMessage();
    const { setActiveScreen } = useHeader();

    const userHaveKeyHub = (data.generateKey.idString !== '');

    function generateCode() {
        if (!userHaveKeyHub) {
            if (keyHub === 'Gere a chave primeiro') normalizeKeyHub();
            const cod1 = uuidv4().replace(/[_-]/g, "");
            const cod2 = uuidv4().replace(/[_-]/g, "");
            const cod3 = uuidv4().replace(/[_-]/g, "");
            setKeyHub('satsfi_' + cod1 + cod2 + cod3);
        }
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

    const resetAllErrorFields = () => {
        setHandleError(false);
        setKeyHubError(false);
        setAddressError(false);
    }

    const verifyIfHandleNotExists = () => {
        return true;
    }

    const downloadJson = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'satsFiKeyHub.json';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    
    const handleSave = () => {
        const handleValidation = isOnlySpaces(handle);
        const handleNameValidation = verifyIfHandleNotExists();

        const keyHubValidation = isOnlySpaces(keyHub);
        const lightningAddressValidation = isOnlySpaces(lightningAddress);

        if (handleValidation && handleNameValidation) {
            setHandle('Nome Inválido');
            setHandleError(true);
        }
        if (keyHubValidation) {
            setKeyHub('Gere a chave primeiro');
            setKeyHubError(true);
        }
        if (lightningAddressValidation) {
            setLightningAddress('Preencha o campo');
            setAddressError(true);
        }

        if (handle !== 'Nome Inválido' && keyHub !== 'Gere a chave primeiro' && lightningAddress !== 'Preencha o campo' &&
           (!handleValidation && !keyHubValidation && !lightningAddressValidation)) {
            updateData('generateKey', {
                idString: handle,
                addressLightning: lightningAddress,
                keyHub: keyHub,
            });
            resetAllErrorFields();
            dispatchMessage('[SUCESSO]: Seu hub foi criado com sucesso !!', true);
            setActiveScreen('generateKey');
        }
    }

    const hasChanged = (handle === data.generateKey.idString &&
                       (lightningAddress === data.generateKey.addressLightning) &&
                       (keyHub === data.generateKey.keyHub));

    const handleClick = () => {
        if (!hasChanged) {
            if (userHaveKeyHub) {

            } else {
                handleSave();
            }
        }
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
                inputType="text"
                inputValue={handle}
                disabled={userHaveKeyHub}
                setInputValue={setHandle}
                onClick={normalizeHandle}
                placeholder="Ex: satsfi.com/BananaTV"
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
                inputType="text"
                disabled={userHaveKeyHub}
                onClick={normalizeLNAddress}
                inputValue={lightningAddress}
                setInputValue={setLightningAddress}
                placeholder="Seu endereço de receber da sua carteira lightning"
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
                    disabled={userHaveKeyHub}
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
            <ButtonArea>
                <Button 
                    havekey={userHaveKeyHub.toString()}
                    onClick={handleClick}
                > 
                    {(userHaveKeyHub) ? 'DELETAR HUB' : 'CRIAR HUB'}
                </Button>
                <FileArea>
                   {(userHaveKeyHub) && 
                    <LinkToDownload onClick={downloadJson}> 
                        Baixar Configuração 
                    </LinkToDownload>}
                </FileArea>
            </ButtonArea>
        </Content>
    );
}