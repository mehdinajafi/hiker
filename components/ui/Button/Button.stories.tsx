import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import FunnelIcon from "@/public/icons/funnel.svg";

type ButtonType = typeof Button;

const meta: Meta<ButtonType> = {
  title: "Design System/Button",
  component: Button,
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Gray: StoryObj<ButtonType> = {
  args: {
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
