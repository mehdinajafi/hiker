import { Meta } from "@storybook/react";
import Divider from "./Divider";

type DividerType = typeof Divider;

const meta: Meta<DividerType> = {
  title: "Design System/Divider",
  component: Divider,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="py-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {};

export const Vertical = () => {
  return (
    <div className="flex h-3 items-center space-x-4 text-white">
      <span>a</span>
      <Divider orientation="vertical" />
      <span>b</span>
      <Divider orientation="vertical" />
      <span>c</span>
    </div>
  );
};
