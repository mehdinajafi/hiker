import { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

type SpinnerType = typeof Spinner;

const meta: Meta<SpinnerType> = {
  title: "Design System/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      defaultValue: "sm",
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Default: StoryObj<SpinnerType> = {};

export const SizeSm: StoryObj<SpinnerType> = {
  name: "Size sm",
  args: {
    size: "sm",
  },
};

export const SizeMd: StoryObj<SpinnerType> = {
  name: "Size md",
  args: {
    size: "md",
  },
};
