import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import Drawer from "./Drawer";

type DrawerType = typeof Drawer;
type Args = React.ComponentPropsWithoutRef<DrawerType>;

const meta: Meta<DrawerType> = {
  title: "Design System/Drawer",
  component: Drawer,
  argTypes: {
    anchor: {
      defaultValue: "left",
    },
    keepMounted: {
      defaultValue: false,
    },
    fullWidth: {
      defaultValue: false,
    },
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

export const Default: StoryFn<DrawerType> = (args: Args) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="rounded-md bg-rose-400 px-4 py-2 text-white"
      >
        Open Drawer
      </button>

      <Drawer {...args} open={open} onClose={handleClose}>
        <div className="h-full bg-white">content</div>
      </Drawer>
    </div>
  );
};
Default.argTypes = {
  open: {
    control: false,
  },
};
