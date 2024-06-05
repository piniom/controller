import {
  Container as ChakraContainer,
  VStack,
  StyleProps,
  Flex,
  Show,
  HStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { Header, HeaderProps } from "./Header";
import { CartridgeLogo } from "@cartridge/ui";
import { useConnection } from "hooks/connection";
import { useRouter } from "next/router";

export function Container({
  children,
  onBack,
  hideAccount,
  ...rest
}: {
  children: ReactNode;
} & StyleProps &
  HeaderProps) {
  const { context } = useConnection();

  const router = useRouter();
  const showFooter = useMemo(() =>
    context?.type === "connect" || router.pathname.startsWith("/slot/")
    , [context?.type, router.pathname])

  return (
    <Wrapper {...rest}>
      <Header onBack={onBack} hideAccount={hideAccount} />

      <VStack
        w="full"
        h="full"
        p={4}
        pt={12}
        overflowY="auto"
        css={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
        }}
      >
        {children}
      </VStack>

      {showFooter && (
        <HStack
          w="full"
          borderTopWidth={1}
          borderColor="solid.tertiary"
          color="text.secondary"
          alignItems="center"
          justify="center"
          h={FOOTER_HEIGHT / 4}
          bottom={0}
          position={["fixed", "fixed", "absolute"]}
          gap={1}
        >
          <Text fontSize="xs" color="currentColor">
            Controller by
          </Text>

          <CartridgeLogo fontSize={100} color="text.secondary" />
        </HStack>
      )}
    </Wrapper >
  );
}

export const FOOTER_HEIGHT = 40;

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <>
      {/** Show as full page  */}
      <Show below="md">
        <ChakraContainer
          w="100vw"
          bg="solid.bg"
          p={0}
          as={motion.div}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          centerContent
        >
          {children}
        </ChakraContainer>
      </Show>

      {/** Show as modal  */}
      <Show above="md">
        <Flex w="100vw" h="100vh" p={0} align="center">
          <ChakraContainer
            w="432px"
            h="600px"
            borderWidth={1}
            borderColor="solid.primaryAccent"
            verticalAlign="middle"
            // m="auto auto"
            bg="solid.bg"
            p={0}
            as={motion.div}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            centerContent
            borderRadius="md"
            overflow="hidden"
            position="relative"
          >
            {children}
          </ChakraContainer>
        </Flex>
      </Show>
    </>
  );
}
