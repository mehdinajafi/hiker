import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import FunnelIcon from "@/public/icons/funnel.svg";

type ButtonType = typeof Button;

const meta: Meta<ButtonType> = {
  title: "Design System/Button",
  component: Button,
  argTypes: {
    color: {
      defaultValue: "primary",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<ButtonType> = {
  args: {
    children: "Button",
  },
};

export const ContainedError: StoryObj<ButtonType> = {
  args: {
    color: "error",
    children: "Button",
  },
};

export const ContainedGray: StoryObj<ButtonType> = {
  args: {
    color: "gray",
    children: "Button",
  },
};

export const TextPrimary: StoryObj<ButtonType> = {
  args: {
    variant: "text",
    children: "Button",
  },
};

export const TextError: StoryObj<ButtonType> = {
  args: {
    variant: "text",
    color: "error",
    children: "Button",
  },
};

export const TextGray: StoryObj<ButtonType> = {
  args: {
    variant: "text",
    color: "gray",
    children: "Button",
  },
};

export const WithStartIcon: StoryObj<ButtonType> = {
  args: {
    color: "gray",
    children: "Button",
    startIcon: <FunnelIcon />,
  },
};

export const WithEndIcon: StoryObj<ButtonType> = {
  args: {
    color: "gray",
    children: "Button",
    endIcon: <FunnelIcon />,
  },
};
