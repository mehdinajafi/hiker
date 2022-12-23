import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Portal from "@/components/ui/Portal";
import Backdrop from "@/components/ui/Backdrop";
import Slide from "@/components/ui/Slide";

interface IDrawer {
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Callback called when the component request to be closed.
   */
  onClose: () => void;
  /**
   * Side from which the drawer will appear.
   * @default left
   */
  anchor?: "left" | "right" | "top" | "bottom";
  /**
   * From this width component will hide.
   */
  hide?: "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * if `true` drawer take whole page.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * ClassName of drawer.
   */
  className?: string;
  /**
   * A single child content element.
   */
  children: React.ReactNode;
}

const direction: Record<
  NonNullable<IDrawer["anchor"]>,
  "up" | "right" | "down" | "left"
> = {
  top: "down",
  right: "left",
  bottom: "up",
  left: "right",
};

const Drawer: React.FC<IDrawer> = (props) => {
  const {
    anchor = "left",
    keepMounted = false,
    fullWidth = false,
    className,
    hide,
    open,
    onClose,
    children,
  } = props;

  const [exited, setExited] = useState(!open);

  useEffect(() => {
    const documentElementStyle = document.documentElement.style;
    if (open) {
      documentElementStyle.setProperty("overflow", "hidden");
    } else {
      documentElementStyle.removeProperty("overflow");
    }
  }, [open]);

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);

  const handleExited = () => {
    setExited(true);
  };

  const handleEnter = () => {
    setExited(false);
  };

  const handleClickBackdrop = () => {
    onClose();
  };

  if (!keepMounted && !open && exited) {
    return null;
  }

  return (
    <Portal>
      <div
        role="presentation"
        className={clsx(
          "drawer fixed inset-0 z-drawer",
          {
            hidden: !open && keepMounted && exited,
          },
          hide && {
            "sm:hidden": hide === "sm",
            "md:hidden": hide === "md",
            "lg:hidden": hide === "lg",
            "xl:hidden": hide === "xl",
            "2xl:hidden": hide === "2xl",
          },
          className
        )}
      >
        <Backdrop open={open} onClick={handleClickBackdrop} />

        <Slide
          in={open}
          appear={mounted.current}
          direction={direction[anchor]}
          onExited={handleExited}
          onEnter={handleEnter}
          unmountOnExit={!keepMounted}
          className={clsx("drawer--content fixed will-change-transform", {
            "top-0 w-full": anchor === "top",
            "right-0 h-full": anchor === "right",
            "bottom-0 w-full": anchor === "bottom",
            "left-0 h-full": anchor === "left",
            "w-full": fullWidth && (anchor === "right" || anchor === "left"),
            "h-full": fullWidth && (anchor === "top" || anchor === "bottom"),
          })}
        >
          {children}
        </Slide>
      </div>
    </Portal>
  );
};

export default Drawer;
