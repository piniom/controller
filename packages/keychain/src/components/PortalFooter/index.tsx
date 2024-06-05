import {
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { CartridgeLogo, WedgeUpIcon } from "@cartridge/ui";
import { Policy } from "@cartridge/controller";
import React, { useMemo } from "react";
import { FOOTER_HEIGHT } from "components";
import { motion } from "framer-motion";
import { TOP_OFFSET } from "../Container/Header";
import { SessionDetails } from "./SessionDetails";
import { TransactionSummary } from "./TransactionSummary";
import { useRouter } from "next/router";
import { useConnection } from "hooks/connection";

export function PortalFooter({
  children,
  origin,
  policies,
  isSignup,
  isSlot,
  showTerm = false,
}: React.PropsWithChildren & {
  origin?: string;
  policies?: Policy[];
  isSignup?: boolean;
  isSlot?: boolean;
  showTerm?: boolean;
}) {
  const { isOpen, onToggle } = useDisclosure();
  const isExpandable = useMemo(() => !!origin, [origin]);
  const hostname = useMemo(
    () => (origin ? new URL(origin).hostname : undefined),
    [origin],
  );

  const height = useMemo(
    () =>
      isOpen ? `${window.innerHeight - TOP_OFFSET - FOOTER_HEIGHT}px` : "auto",
    [isOpen],
  );

  const { context } = useConnection();
  const router = useRouter();
  const showFooter = useMemo(
    () =>
      context?.type === "connect" ||
      router.pathname.startsWith("/login") ||
      router.pathname.startsWith("/signup") ||
      router.pathname.startsWith("/slot") ||
      router.pathname.startsWith("/authenticate"),
    [context?.type, router.pathname],
  );

  return (
    <VStack
      position={["fixed", "fixed", "absolute"]}
      bottom={0}
      w="full"
      zIndex="999999"
    >
      <VStack
        w="full"
        align="flex-start"
        bg="solid.bg"
        p={4}
        pt={0}
        borderTopWidth={1}
        borderColor="solid.spacer"
        as={motion.div}
        layout="position"
        animate={{ height, transition: { bounce: 0 } }}
      >
        <VStack
          pt={6}
          align="stretch"
          w="full"
          h="full"
          overflowY={isOpen ? "auto" : "hidden"}
          css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
          }}
        >
          <HStack align="center">
            <TransactionSummary
              isSignup={isSignup}
              isSlot={isSlot}
              showTerm={showTerm}
              hostname={hostname}
            />

            <Spacer />

            {isExpandable && (
              <IconButton
                aria-label="Expand footer"
                icon={
                  <WedgeUpIcon
                    boxSize={8}
                    color="text.secondary"
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                  />
                }
                size="sm"
                h={8}
                bg="solid.primary"
                zIndex="999999"
                onClick={onToggle}
              />
            )}
          </HStack>

          {isOpen && policies && (
            <SessionDetails policies={policies} isOpen={isOpen} />
          )}
        </VStack>

        <Spacer />

        <VStack align="strech" w="full">
          {children}
        </VStack>
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
          gap={1}
        >
          <Text fontSize="xs" color="currentColor">
            Controller by
          </Text>

          <CartridgeLogo fontSize={100} color="text.secondary" />
        </HStack>
      )}
    </VStack>
  );
}

export const PORTAL_FOOTER_MIN_HEIGHT = 252;
