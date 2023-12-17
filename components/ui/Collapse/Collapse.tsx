"use client";

import React from "react";
import { m, AnimatePresence, Variants } from "framer-motion";
import clsx from "clsx";

interface ICollapse {
  /**
   * If `true`, the component will transition in.
   */
  in: boolean;
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean;
  /**
   * ClassName of transition component.
   */
  className?: string;
  /**
   * A single child content element.
   */
  children?: React.ReactNode;
  /**
   * By default the child component stays mounted.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit?: boolean;
  /**
   * The transition orientation.
   */
  orientation?: "horizontal" | "vertical";
  onClick?: () => void;
  onEnter?: () => void;
  onExited?: () => void;
}

const variants = (orientation: ICollapse["orientation"]): Variants => {
  if (orientation === "horizontal") {
    return {
      exit: {
        width: 0,
      },
      enter: {
        width: "auto",
      },
    };
  } else {
    return {
      exit: {
        height: 0,
      },
      enter: {
        height: "auto",
      },
    };
  }
};

const Collapse = React.forwardRef<HTMLDivElement, ICollapse>((props, ref) => {
  const {
    in: inProp,
    appear = true,
    orientation = "vertical",
    unmountOnExit = false,
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
          variants={variants(orientation)}
          initial="exit"
          animate={animate}
          exit="exit"
          className={clsx("overflow-hidden", className)}
          onClick={onClick}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          {...otherProps}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
});

Collapse.displayName = "Collapse";

export default Collapse;
