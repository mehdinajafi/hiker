import { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

type AlertType = typeof Alert;

const meta: Meta<typeof Alert> = {
  title: "Design System/Alert",
  component: Alert,
  argTypes: {
    severity: {
      defaultValue: "info",
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Default: StoryObj<AlertType> = {
  args: {
    children: "This is an info alert — check it out!",
  },
};

export const Info: StoryObj<AlertType> = {
  args: {
    severity: "info",
    children: "This is an info alert — check it out!",
  },
};

export const Warning: StoryObj<AlertType> = {
  args: {
    severity: "warning",
    children: "This is an warning alert — check it out!",
  },
};

export const Success: StoryObj<AlertType> = {
  args: {
    severity: "success",
    children: "This is an success alert — check it out!",
  },
};

export const Error: StoryObj<AlertType> = {
  args: {
    severity: "error",
    children: "This is an error alert — check it out!",
  },
};
