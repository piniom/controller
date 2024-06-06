export { TOP_OFFSET } from "./Header"

import {
  Container as ChakraContainer,
  VStack,
  StyleProps,
  Flex,
  Show,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Header, HeaderProps } from "./Header";

export function Container({
  children,
  onBack,
  hideAccount,
  ...rest
}: {
  children: ReactNode;
} & StyleProps &
  HeaderProps) {
  return (
    <Wrapper {...rest}>
      <Header onBack={onBack} hideAccount={hideAccount} />

      <VStack
        w="full"
        h="full"
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
    </Wrapper>
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
