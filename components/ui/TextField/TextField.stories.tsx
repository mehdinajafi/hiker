import { Meta, StoryFn, StoryObj } from "@storybook/react";
import TextField from ".";

type TextFieldType = typeof TextField;

const meta: Meta<TextFieldType> = {
  title: "Design Design/TextField",
  component: TextField,
};

export default meta;

export const Default: StoryObj<TextFieldType> = {};
