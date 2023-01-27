import React from "react";
import { m, AnimatePresence, Variants } from "framer-motion";

interface IFade {
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
   * className of transition component.
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
  onClick?: () => void;
  onEnter?: () => void;
  onExited?: () => void;
}

const variants: Variants = {
  exit: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
};

const Fade = React.forwardRef<HTMLDivElement, IFade>((props, ref) => {
  const {
    in: inProp,
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
          variants={variants}
          initial="exit"
          animate={animate}
          exit="exit"
          transition={{ damping: 5 }}
          className={className}
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

Fade.displayName = "Fade";

export default Fade;
