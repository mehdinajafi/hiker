import { Meta } from "@storybook/react";
import Button from "@/components/ui/Button";
import Toast from "./ToastContainer";
import { toast } from "react-toastify";

type ToastType = typeof Toast;

const meta: Meta<ToastType> = {
  title: "Design System/Toast",
  component: Toast,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

export const Default = () => {
  const show = () => {
    toast.success("This is the way!");
  };

  return (
    <div>
      <Toast />

      <Button color="primary" onClick={show}>
        Show
      </Button>
    </div>
  );
};
