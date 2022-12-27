import { useState } from "react";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Checkbox from "./Checkbox";

type CheckboxType = typeof Checkbox;

const meta: Meta<CheckboxType> = {
  title: "Design System/Checkbox",
  component: Checkbox,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Uncontrolled: StoryObj<CheckboxType> = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    expect(checkbox.ariaChecked).toBe("false");
    expect(checkbox.children).toHaveLength(1);

    await userEvent.click(checkbox);
    expect(checkbox.ariaChecked).toBe("true");
    // icon added
    expect(checkbox.children).toHaveLength(2);

    await userEvent.click(checkbox);
    expect(checkbox.ariaChecked).toBe("false");
    expect(checkbox.children).toHaveLength(1);
  },
};

export const Controlled: StoryFn<CheckboxType> = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return <Checkbox checked={checked} onCheckedChange={handleChange} />;
};
