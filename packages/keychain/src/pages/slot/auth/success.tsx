import { Container, Banner } from "components/layout";
import { SparklesDuoIcon } from "@cartridge/ui";

export default function Consent() {
  return (
    <Container hideAccount>
      <Banner
        Icon={SparklesDuoIcon}
        title="Success!"
        description="Return to your terminal to continue"
      />
    </Container>
  );
};
