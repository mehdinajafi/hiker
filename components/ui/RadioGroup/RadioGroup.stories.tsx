import { Meta, StoryFn } from "@storybook/react";
import Label from "@/components/ui/Label";
import RadioGroup from "./";

type RadioGroupType = typeof RadioGroup;
type Args = React.ComponentProps<RadioGroupType>;

const meta: Meta<typeof RadioGroup> = {
  title: "Design System/RadioGroup",
  component: RadioGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Default: StoryFn<RadioGroupType> = () => {
  return (
    <div className="p-2">
      <RadioGroup defaultValue="default">
        <div>
          <Label control={<RadioGroup.Radio value="val-1" />} label="Label 1" />
        </div>
        <div className="mt-2">
          <Label control={<RadioGroup.Radio value="val-2" />} label="Label 2" />
        </div>
      </RadioGroup>
    </div>
  );
};
