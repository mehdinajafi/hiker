import { useState } from "react";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Fade from "./Fade";

type FadeType = typeof Fade;
type Args = React.ComponentProps<FadeType>;

const meta: Meta<typeof Fade> = {
  title: "Design System/Fade",
  component: Fade,
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
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Default: StoryObj<FadeType> = {
  args: {
    in: true,
  },
  play: ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByText(/Element/i);

    step("when in=true element is in document", () => {
      expect(element).toBeInTheDocument();
      expect(element).toHaveStyle({ opacity: 1 });
    });
  },
};

export const UnmountOnExit: StoryFn<FadeType> = (args: Args) => {
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
      <Fade {...args} in={isIn} unmountOnExit />
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
  const element = canvas.queryByText(/Element/i);

  step("in/out", async () => {
    expect(element).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /in/i }));
    expect(element).not.toBeInTheDocument();
  });
};
