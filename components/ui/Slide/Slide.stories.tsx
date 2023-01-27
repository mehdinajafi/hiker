import { useState } from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import Slide from "./Slide";

type SlideType = typeof Slide;
type Args = React.ComponentProps<SlideType>;

const meta: Meta<typeof Slide> = {
  title: "Design System/Slide",
  component: Slide,
  args: {
    children: (
      <div className="h-full w-full bg-red-400 text-white">Element</div>
    ),
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    children: {
      control: false,
    },
    direction: {
      defaultValue: "right",
    },
  },
};

export default meta;

export const Default: StoryObj<SlideType> = {
  args: {
    in: true,
  },
  decorators: [
    (Story) => (
      <div className="grid h-screen place-content-center overflow-hidden">
        <Story />
      </div>
    ),
  ],
  play: ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByText(/Element/i);

    step("when in=true element is in document", () => {
      expect(element).toBeInTheDocument();
    });
  },
};

export const UnmountOnExit: StoryFn<SlideType> = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="mb-5 rounded-sm bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleToggle}
      >
        {isOpen ? "out" : "in"}
      </button>
      <Slide {...args} in={isOpen} unmountOnExit />
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
