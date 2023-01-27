import * as RadixDialog from "@radix-ui/react-dialog";
import { useState } from "react";
import Backdrop from "@/components/ui/Backdrop";
import Slide from "@/components/ui/Slide";

interface IDialog extends RadixDialog.DialogProps {
  children: React.ReactNode;
  unmountOnExit?: boolean;
}

const Dialog: React.FC<IDialog> = (props) => {
  const { children, unmountOnExit, ...otherProps } = props;

  const [exited, setExited] = useState(true);

  const isOpen = Boolean(otherProps.open);

  const show = !exited || otherProps.open;

  if (unmountOnExit && !otherProps.open && exited) {
    return null;
  }

  return (
    <RadixDialog.Root open={show} onOpenChange={otherProps.onOpenChange}>
      {show && (
        <RadixDialog.Portal forceMount>
          <RadixDialog.Overlay asChild>
            <Backdrop open={isOpen} />
          </RadixDialog.Overlay>

          <div className="fixed inset-0 flex justify-center">
            <Slide
              direction="down"
              in={isOpen}
              onEnter={() => setExited(false)}
              onExited={() => setExited(true)}
              className="max-h-full w-full max-w-md"
              style={{ position: "static" }}
            >
              <RadixDialog.Content asChild>
                <div className="mt-4 bg-white">{children}</div>
              </RadixDialog.Content>
            </Slide>
          </div>
        </RadixDialog.Portal>
      )}
    </RadixDialog.Root>
  );
};

export default Dialog;
