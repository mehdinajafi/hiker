import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Dialog from ".";

type DialogType = typeof Dialog;

const meta: Meta<DialogType> = {
  title: "Design System/Dialog",
  component: Dialog,
};

export default meta;

export const Default: StoryFn<DialogType> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>

      <Dialog open={isOpen} onOpenChange={handleChange} unmountOnExit={false}>
        This is dialog
      </Dialog>
    </>
  );
};
