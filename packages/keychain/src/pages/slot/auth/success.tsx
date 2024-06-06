import { NextPage } from "next";
import { Container, Banner } from "components/layout";
import { SparklesDuoIcon } from "@cartridge/ui";

const Consent: NextPage = () => {
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

export default Consent;
