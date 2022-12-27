import { useState } from "react";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Switch from "./Switch";

type SwitchType = typeof Switch;

const meta: Meta<SwitchType> = {
  title: "Design System/Switch",
  component: Switch,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Uncontrollable: StoryObj<SwitchType> = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const checkbox = canvas.getByRole("switch");
    context.step("aria attributes changes correctly", async () => {
      expect(checkbox.ariaChecked).toBe("false");
      await userEvent.click(checkbox);
      expect(checkbox.ariaChecked).toBe("true");
      await userEvent.click(checkbox);
      expect(checkbox.ariaChecked).toBe("false");
    });
  },
};

export const Controlled: StoryFn<SwitchType> = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return <Switch checked={isChecked} onCheckedChange={handleCheckedChange} />;
};
