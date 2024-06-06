import React, { useMemo } from "react";
import {
  Flex,
  Spacer,
  HStack,
  Container as ChakraContainer,
  StyleProps,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeftIcon, TimesIcon } from "@cartridge/ui";
// import { NetworkButton } from "./NetworkButton";
// import { EthBalance } from "./EthBalance";
// import { AccountMenu } from "./AccountMenu";
import { useController } from "hooks/controller";
import { useConnection } from "hooks/connection";
import { useRouter } from "next/router";

export type HeaderProps = {
  onLogout?: () => void;
  onBack?: () => void;
  hideAccount?: boolean;
};

export function Header({
  // onLogout,
  onBack,
  hideAccount,
}: HeaderProps) {
  const { controller } = useController();
  const address = useMemo(() => controller?.address, [controller]);

  return (
    <Container>
      <HStack w="full">
        {onBack ? (
          <IconButton
            h={8}
            size="sm"
            aria-label="Go back"
            icon={<ArrowLeftIcon />}
            onClick={onBack}
          />
        ) :
          <CloseButton />
        }

        <Spacer />

        {!!address && !hideAccount && (
          <>
            {/* <NetworkButton chainId={chainId} /> */}
            {/* <EthBalance chainId={chainId} address={address} /> */}
            {/* {chainId && <AccountMenu onLogout={onLogout} address={address} />} */}
          </>
        )}
      </HStack>
    </Container>
  );
}

function CloseButton() {
  const { close } = useConnection();
  const router = useRouter();

  if (router.pathname !== "/") {
    return null;
  }

  return (
    <IconButton
      aria-label="Close Keychain"
      icon={<TimesIcon fontSize={24} />}
      onClick={close}
    />
  );
}

function Container({
  h,
  children,
  ...rest
}: {
  children: React.ReactNode;
} & StyleProps) {
  return (
    <Flex
      h={h}
      w="full"
      zIndex="overlay"
      align="center"
      justify="center"
      flexShrink={0}
      bg="transparent"
      position="fixed"
      p={2}
      {...rest}
    >
      <ChakraContainer p={0} h="full" centerContent>
        {children}
      </ChakraContainer>
    </Flex>
  );
}

export const TOP_OFFSET = 64;
