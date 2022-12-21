import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
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
      <div className="flex h-12 w-28 items-center justify-center bg-red-400 text-white">
        Element
      </div>
    ),
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

const UnmountOnExitComponent = (args: Args) => {
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
      <Slide {...args} in={isOpen} />
    </div>
  );
};

export const UnmountOnExit: StoryObj<SlideType> = {
  args: {
    in: false,
    unmountOnExit: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.queryByText(/Element/i);

    expect(element).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /in/i }));
    expect(element).not.toBeInTheDocument();
  },
  render: (args) => <UnmountOnExitComponent {...args} />,
};
