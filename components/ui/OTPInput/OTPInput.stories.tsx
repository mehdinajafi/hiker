import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import OTPInput from ".";

type OTPInputType = typeof OTPInput;

const meta: Meta<OTPInputType> = {
  title: "Design System / OTPInput",
  component: OTPInput,
};

export default meta;

export const Default: StoryFn<OTPInputType> = () => {
  const [value, setValue] = useState("");

  const handleOnChange = (value: string) => {
    setValue(value);
  };

  return (
    <OTPInput
      type="password"
      value={value}
      numInputs={4}
      onChange={handleOnChange}
      shouldAutoFocus
    />
  );
};
