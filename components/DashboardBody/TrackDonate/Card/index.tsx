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
} from "./styles";

interface Props {
  name: string;
  amount: string;
  description: string;
  audioURL: string | undefined;
}

export default function Card({
  name,
  amount,
  description,
  audioURL,
  ...rest
}: Props) {
  return (
    <WrapperDonationCard className={(audioURL) ? "flex fd audio-donate" : "flex fd normal-donate"} {...rest}>
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
        <DescriptionArea className={(audioURL) ? "dd-audio" : "dd-normal"}>
          {audioURL ? (
            <Audio controls>
              <source src="/audio/connected.MP3" type="audio/mpeg"></source>
              Seu navegador não suporta áudio.
            </Audio>
          ) : (
            <DescriptionTitle>{description}</DescriptionTitle>
          )}
        </DescriptionArea>
      </Body>
    </WrapperDonationCard>
  );
}
