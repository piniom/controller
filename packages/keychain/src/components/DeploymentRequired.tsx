import { constants } from "starknet";
import { Container, Banner, Footer, Content } from "components/layout";
import { useEffect, useState } from "react";
import { Status } from "utils/account";
import { Loading } from "./Loading";
import { Button, Link } from "@chakra-ui/react";
import { ExternalIcon } from "@cartridge/ui";
import { useController } from "hooks/controller";

export function DeploymentRequired({
  onClose,
  onLogout,
  children,
}: {
  onClose: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}) {
  const { controller } = useController()
  const account = controller.account;
  const [status, setStatus] = useState<Status>(account.status);
  const [deployHash, setDeployHash] = useState<string>();

  useEffect(() => {
    const fetch = async () => {
      if (account.status !== Status.DEPLOYING) {
        return;
      }
      const hash = await account.getDeploymentTxn();
      setDeployHash(hash);
    };

    fetch();
  }, [account]);

  useEffect(() => {
    const id = setInterval(async () => {
      if (account.status !== Status.DEPLOYING) clearInterval(id);
      setStatus(account.status);
      await account.sync();
    }, 2000);

    return () => clearInterval(id);
  }, [account, setStatus]);

  if (status === Status.DEPLOYING) {
    return (
      <Container onLogout={onLogout}>
        <Banner
          Icon={Loading}
          title={"Deploying your account"}
          description="This may take a second"
        />

        <Content>
          {status === Status.DEPLOYING && (
            <Link
              href={`https://${account.chainId === constants.StarknetChainId.SN_SEPOLIA
                ? "sepolia."
                : undefined
                }starkscan.co/tx/${deployHash}`}
              isExternal
            >
              <Button variant="link" mt={10} rightIcon={<ExternalIcon />}>
                View on Starkscan
              </Button>
            </Link>
          )}
        </Content>

        <Footer>
          <Button onClick={onClose}>close</Button>
        </Footer>
      </Container>
    );
  }

  return <>{children}</>;
}
