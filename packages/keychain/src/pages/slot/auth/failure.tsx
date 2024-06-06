import { NextPage } from "next";
import { Container, Banner, Content } from "components/layout";
import { AlertDuoIcon } from "@cartridge/ui";
import { Text } from "@chakra-ui/react";

const Consent: NextPage = () => {
  return (
    <Container hideAccount>
      <Banner
        icon={<AlertDuoIcon boxSize={8} accent="text.error" />}
        title="Failure"
        description="Uh-oh something went wrong"
      />

      <Content>
        <Text fontSize="xs" align="center" color="text.secondaryAccent">
          If this problem persists swing by the Cartridge
          <Text color="inherit">support channel on Discord</Text>
        </Text>
      </Content>
    </Container>
  );
};

export default Consent;
