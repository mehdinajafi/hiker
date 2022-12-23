import type { Meta, StoryObj } from "@storybook/react";
import Nav from "./Navigation";

const meta: Meta<typeof Nav> = {
  title: "Nav",
  component: Nav,
};

export default meta;

type Story = StoryObj<typeof Nav>;

export const Default: Story = {};
