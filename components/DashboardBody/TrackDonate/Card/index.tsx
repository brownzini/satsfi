import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  WrapperDonationCard,
  NameTitle,
  Header,
  NameArea,
  AmountArea,
  PriceArea,
  Body,
  DescriptionArea,
  DescriptionTitle,
  PriceTitle,
  Audio,
  Image,
  ButtonArea,
  LoadImageButton,
} from "./styles";
import getYouTubeThumbnail from "@/utils/getYoutubeThumb";
import { getContent } from "@/utils/nostr";
import Link from "next/link";
import SvgModel from "@/utils/svg";

interface Props {
  name: string;
  amount: string;
  description: string;
  audioURL: string | null;
  imgURL: string | null;
  ytURL: string | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Card({
  name,
  amount,
  description,
  audioURL,
  imgURL,
  ytURL,
  loading,
  setLoading,
  ...rest
}: Props) {
  const [audio64URL, setAudio64URL] = useState<string | null>(null);

  const [img64URL, setImage64URL] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);

  const [thumbURL, setThumbURL] = useState<string | null>(null);
  const [fullURL, setFullURL] = useState<string | null>(null);

  function handleRenderingYTThumb(thumbURL: string | null, fullURL: string) {
    if (thumbURL !== null && thumbURL !== "") {
      return (
        <Link
          id="link-paper-button-style"
          className="flex-center"
          href={fullURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DescriptionTitle> Mandou um audio desse video:</DescriptionTitle>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={thumbURL} />
        </Link>
      );
    } else {
      return (
        <DescriptionTitle>
          Mandou um audio desse video: {fullURL}
        </DescriptionTitle>
      );
    }
  }

  useEffect(() => {
    async function handleSplitType(
      audioURL: string | null,
      ytURL: string | null
    ) {
      if (audioURL !== null && audioURL !== "") {
        const base64 = await getContent(audioURL);
        setAudio64URL(base64);
        return;
      }
      if (ytURL !== null && ytURL !== "") {
        const [completeUrl, start_time, end_time] = ytURL.split(" ");
        const fullURL = completeUrl + "&t=" + start_time + "s";
        setFullURL(fullURL);
        const thumbURL = await getYouTubeThumbnail(completeUrl);
        setThumbURL(thumbURL);
        return;
      }
    }
    handleSplitType(audioURL, ytURL);

    return () => {
      setAudio64URL(null);
      setImage64URL(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLoadImage(imgURL: string) {
    setLoading(true);
    setShowImage(true);
    try {
      const stringedData = await getContent(imgURL);
      const parsedData = JSON.parse(stringedData);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      if (parsedData) {
        const promises = parsedData.map(
          async (id: string) => await getContent(id)
        );
        const allImageParts = await Promise.all(promises);
        const result = allImageParts.join("");
        setImage64URL(result);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setShowImage(false);
    }
  }

  return (
    <WrapperDonationCard
      className={audioURL ? "flex fd audio-donate" : "flex fd normal-donate"}
      {...rest}
    >
      <Header>
        <NameArea>
          <NameTitle> {name} </NameTitle>
        </NameArea>
        <AmountArea className="flex">
          <PriceArea>
            <PriceTitle>{amount} sats</PriceTitle>
          </PriceArea>
        </AmountArea>
      </Header>
      <Body className="flex">
        <DescriptionArea className={audioURL ? "dd-audio" : "dd-normal"}>
          {audioURL !== null && audioURL !== "" && (
            <Audio controls src={audio64URL !== null ? audio64URL : ""} />
          )}

          {imgURL !== null &&
            imgURL !== "" &&
            (showImage && !loading ? (
              //eslint-disable-next-line jsx-a11y/alt-text
              <Image src={img64URL !== null ? img64URL : ""} />
            ) : (
              <ButtonArea className="flex">
                {!loading && !showImage ? (
                  <LoadImageButton onClick={() => handleLoadImage(imgURL)}>
                    {" "}
                    CARREGAR IMAGE{" "}
                  </LoadImageButton>
                ) : loading && showImage ? (
                  <SvgModel name="loading" width="50%" height="50%" />
                ) : (
                  <LoadImageButton onClick={() => handleLoadImage(imgURL)}>
                    {" "}
                    CARREGAR IMAGE{" "}
                  </LoadImageButton>
                )}
              </ButtonArea>
            ))}
          {ytURL !== null &&
            ytURL !== "" &&
            handleRenderingYTThumb(thumbURL, fullURL !== null ? fullURL : "")}
          {audioURL === null && imgURL === null && ytURL === null && (
            <DescriptionTitle>{description}</DescriptionTitle>
          )}
        </DescriptionArea>
      </Body>
    </WrapperDonationCard>
  );
}
