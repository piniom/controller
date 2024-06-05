import React, { useMemo } from "react";
import {
  Flex,
  Spacer,
  HStack,
  Container as ChakraContainer,
  StyleProps,
  IconButton,
  VStack,
  Image,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowLeftIcon, CartridgeColorIcon } from "@cartridge/ui";
// import { NetworkButton } from "./NetworkButton";
// import { EthBalance } from "./EthBalance";
// import { AccountMenu } from "./AccountMenu";
import { useController } from "hooks/controller";
import { useControllerTheme } from "hooks/theme";
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
  const theme = useControllerTheme();
  const { colorMode } = useColorMode();

  const cover = useMemo(
    () =>
      typeof theme.cover === "string" ? theme.cover : theme.cover[colorMode],
    [theme, colorMode],
  );

  if (!address || hideAccount) {
    return (
      <Container h={BANNER_HEIGHT} position="relative">
        <CloseButton />

        <VStack
          h="full"
          w="full"
          bg={`url('${cover}')`}
          bgSize="cover"
          bgPos="center"
          position="relative"
        >
          <Center
            position="absolute"
            bottom={-ICON_OFFSET / 4}
            left={0}
            right={0}
          >
            <Flex
              bg="darkGray.700"
              borderRadius="lg"
              h={`${ICON_SIZE}px`}
              w={`${ICON_SIZE}px`}
              justify="center"
              alignItems="center"
              borderWidth={4}
              borderColor="solid.bg"
            >
              <Image
                src={theme.icon}
                boxSize={ICON_IMAGE_SIZE / 4}
                alt="Controller Icon"
              />
            </Flex>
          </Center>
        </VStack>
      </Container>
    );
  }

  return (
    <Container h={12} p={2}>
      <CloseButton />
      <HStack w="full">
        {onBack ? (
          <IconButton
            h={8}
            size="sm"
            aria-label="Go back"
            icon={<ArrowLeftIcon />}
            onClick={onBack}
          />
        ) : theme.id === "cartridge" ? (
          <CartridgeColorIcon boxSize={8} />
        ) : (
          <Image src={theme.icon} boxSize={8} alt="Controller Icon" />
        )}

        <Spacer />

        {/* <NetworkButton chainId={chainId} /> */}
        {/* <EthBalance chainId={chainId} address={address} /> */}

        {/* {chainId && <AccountMenu onLogout={onLogout} address={address} />} */}
      </HStack>
    </Container>
  );
}

function CloseButton() {
  const { close } = useConnection();
  const router = useRouter();

  if (router.pathname !== "/") {
    return null
  }

  return (
    <IconButton
      aria-label="Close Keychain"
      icon={<TimesIcon />}
      position="absolute"
      zIndex="9999999"
      colorScheme="translucent"
      top={3}
      left={3}
      onClick={close}
    />
  )
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
      top="0"
      left="0"
      zIndex="overlay"
      align="center"
      justify="center"
      flexShrink={0}
      borderBottomWidth={1}
      borderBottomColor="solid.spacer"
      bg="solid.bg"
      {...rest}
    >
      <ChakraContainer p={0} h="full" centerContent>
        {children}
      </ChakraContainer>
    </Flex>
  );
}

const BANNER_HEIGHT = 150;
const ICON_IMAGE_SIZE = 64;
const ICON_SIZE = 80;
const ICON_OFFSET = 32;
export const TOP_OFFSET = 64;
