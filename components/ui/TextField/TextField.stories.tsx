import { Meta, StoryObj } from "@storybook/react";
import TextField from ".";

type TextFieldType = typeof TextField;

const meta: Meta<TextFieldType> = {
  title: "Design System/TextField",
  component: TextField,
};

export default meta;

export const Default: StoryObj<TextFieldType> = {
  args: {
    label: "Label",
  },
};
