import { Meta } from "@storybook/react";
import Label from "./Label";
import Checkbox from "@/components/ui/Checkbox";
import Switch from "@/components/ui/Switch";
import RadioGroup from "@/components/ui/RadioGroup";

type LabelType = typeof Label;

const meta: Meta<LabelType> = {
  title: "Design System/Label",
  component: Label,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const WithCheckbox = () => {
  return <Label control={<Checkbox />} label="Label" />;
};

export const WithSwitch = () => {
  return <Label control={<Switch />} label="Label" />;
};

export const WithRadio = () => {
  return (
    <RadioGroup>
      <div>
        <Label control={<RadioGroup.Radio value="val-1" />} label="Label 1" />
      </div>
      <div className="mt-2">
        <Label control={<RadioGroup.Radio value="val-2" />} label="Label 2" />
      </div>
      <div className="mt-2">
        <Label control={<RadioGroup.Radio value="val-3" />} label="Label 3" />
      </div>
    </RadioGroup>
  );
};
