import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Text, VStack } from "@chakra-ui/react";

const meta: Meta<typeof Buttons> = {
  title: "Button",
  component: Buttons,
  argTypes: {
    variant: {
      options: ["solid"],
      control: { type: "radio" },
    },
    size: {
      options: ["md"],
      control: { type: "radio" },
    },
  },
};

export default meta;

function Buttons(props: React.ComponentProps<typeof Button>) {
  return (
    <Flex>
      {colorSchemes.map((c) => (
        <VStack key={c} m={1}>
          <Text
            m={3}
            fontSize="md"
            fontWeight="bold"
            textDecor="underline"
            textTransform="capitalize"
          >
            {c}
          </Text>
          <Button
            w={60}
            colorScheme={c}
            {...props}
            onClick={() => {
              console.log("Clicked !");
            }}
          />
        </VStack>
      ))}
    </Flex>
  );
}

const colorSchemes = [
  "yellow",
  "purple",
  "darkGray",
  "blueGray",
  "whiteAlpha",
  "blackAlpha",
];

type Story = StoryObj<typeof Button>;

export const All: Story = {
  args: {
    variant: "solid",
    size: "md",
    children: "continue",
    isDisabled: false,
    isLoading: false,
  },
};
