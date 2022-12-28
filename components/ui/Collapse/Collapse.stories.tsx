import { useState } from "react";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Collapse from "./Collapse";

type CollapseType = typeof Collapse;
type Args = React.ComponentProps<CollapseType>;

const meta: Meta<typeof Collapse> = {
  title: "Design System/Collapse",
  component: Collapse,
  args: {
    children: (
      <div className="flex h-12 w-28 items-center justify-center bg-red-400 text-white">
        Element
      </div>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
    appear: {
      defaultValue: true,
    },
    orientation: {
      defaultValue: "horizontal",
    },
    unmountOnExit: {
      defaultValue: false,
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Default: StoryObj<CollapseType> = {
  args: {
    in: true,
  },
};

export const UnmountOnExit: StoryFn<CollapseType> = (args: Args) => {
  const [isIn, setIsIn] = useState(false);

  const handleToggle = () => {
    setIsIn(!isIn);
  };

  return (
    <div>
      <button
        className="mb-5 rounded-sm bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleToggle}
      >
        {isIn ? "out" : "in"}
      </button>
      <Collapse {...args} in={isIn} unmountOnExit />
    </div>
  );
};
UnmountOnExit.argTypes = {
  in: {
    control: false,
  },
  unmountOnExit: {
    control: false,
  },
};
UnmountOnExit.play = ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  step("in/out", async () => {
    expect(canvas.queryByText(/Element/i)).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /in/i }));
    expect(await canvas.findByText(/Element/i)).toBeInTheDocument();
  });
};
