import { Meta, StoryObj } from "@storybook/react";
import BagIcon from "@/public/icons/cart.svg";
import Badge from "./Badge";

type BadgeType = typeof Badge;

const meta: Meta<typeof Badge> = {
  title: "Design System/Badge",
  component: Badge,
  argTypes: {
    children: {
      control: false,
    },
    color: {
      defaultValue: "primary",
    },
    anchorOrigin: {
      defaultValue: {
        vertical: "top",
        horizontal: "right",
      },
    },
    max: {
      defaultValue: 99,
    },
    showZero: {
      defaultValue: false,
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-5">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<BadgeType> = {
  args: {
    badgeContent: 5,
    children: <BagIcon className="h-5 w-5" />,
  },
};

export const Maximum: StoryObj<BadgeType> = {
  args: {
    badgeContent: 100,
    children: <BagIcon className="h-5 w-5" />,
  },
};
