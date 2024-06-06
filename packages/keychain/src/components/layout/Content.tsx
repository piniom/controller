import { VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function Content({ children }: PropsWithChildren) {
  return (
    <VStack w="full" px={4}>{children}</VStack>
  );
}
