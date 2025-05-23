import { Container, ContentContainer, DonationCard } from "./styles";

//Components
import Card from "./Card";

//Utils
import { useData } from "@/contexts/useData";
import SurveyCard from "./SurveyCard";
import BackgroundCard from "./BackgroundCard";

export default function TrackDonate() {
  const { data } = useData();

  const RenderingCards = (
    type: string,
    index: number,
    name: string,
    amount: string,
    description: string,
    audioURL?: string | undefined,
  ) => {
    if (type === "createSurvey") {
      return (
        <SurveyCard
          key={index}
          name={name}
          amount={amount}
          description={description}
        />
      );
    }
    if (type === "normal") {
      return (
        <Card
          key={index}
          name={name}
          amount={amount}
          description={description}
          audioURL={audioURL}
        />
      );
    }

    if (type === "backgroundDonation") {
      return (
        <BackgroundCard
          key={index}
          name={name}
          amount={amount}
          description={description}
        />
      );
    }
  };

  return (
    <Container className="flex fd">
      <ContentContainer className="flex">
        <DonationCard onClick={() => console.log(data)}>
          {data.trackDonate.length > 0 &&
            data.trackDonate.map((donate, index) =>
              RenderingCards(
                donate.type,
                index,
                donate.name,
                donate.amount,
                donate.description,
                donate.audioURL
              )
            )}
        </DonationCard>
      </ContentContainer>
    </Container>
  );
}
