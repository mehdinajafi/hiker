import React from "react";
import { m, AnimatePresence, Variants, MotionProps } from "framer-motion";
import clsx from "clsx";

export interface ISlide extends MotionProps {
  /**
   * If `true`, the component will transition in.
   */
  in: boolean;
  /**
   * A single child content element.
   */
  children: React.ReactNode;
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean;
  /**
   * Direction the child node will enter from.
   * @default 'right'
   */
  direction?: "left" | "right" | "up" | "down";
  /**
   * By default the child component stays mounted.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;
  /**
   * className of transition component.
   */
  className?: string;
  onClick?: () => void;
  onEnter?: () => void;
  onExited?: () => void;
}

const variants = (direction: ISlide["direction"]): Variants => {
  switch (direction) {
    case "left":
      return {
        enter: {
          x: 0,
        },
        exit: {
          x: "100%",
        },
      };
    case "right":
      return {
        enter: {
          x: 0,
        },
        exit: {
          x: "-100%",
        },
      };
    case "up":
      return {
        enter: {
          y: 0,
        },
        exit: {
          y: "100%",
        },
      };
    case "down":
      return {
        enter: {
          y: 0,
        },
        exit: {
          y: "-100%",
        },
      };
    default:
      return {
        enter: {
          x: 0,
        },
        exit: {
          x: "100%",
        },
      };
  }
};

const Slide = React.forwardRef<HTMLDivElement, ISlide>((props, ref) => {
  const {
    in: inProp,
    direction = "right",
    appear = true,
    unmountOnExit,
    className,
    children,
    onClick,
    onEnter,
    onExited,
    ...otherProps
  } = props;

  const show = unmountOnExit ? inProp && unmountOnExit : true;
  const animate = inProp || unmountOnExit ? "enter" : "exit";

  const handleAnimationStart = (definition: string) => {
    if (onEnter && definition === "enter") {
      onEnter();
    }
  };

  const handleAnimationComplete = (definition: string) => {
    if (onExited && definition === "exit") {
      onExited();
    }
  };

  return (
    <AnimatePresence initial={appear}>
      {show && (
        <m.div
          ref={ref}
          variants={variants(direction)}
          initial="exit"
          animate={animate}
          exit="exit"
          transition={{ stiffness: 50 }}
          onClick={onClick}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          className={clsx(className, "fixed", {
            "top-0 left-0 w-full": direction === "down",
            "bottom-0 left-0 w-full": direction === "up",
            "right-0 top-0 h-full": direction === "left",
            "left-0 top-0 h-full": direction === "right",
          })}
          {...otherProps}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
});

Slide.displayName = "Slide";

export default Slide;
