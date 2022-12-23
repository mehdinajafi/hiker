import * as React from "react";
import { m, AnimatePresence, Variants } from "framer-motion";

interface ISlide {
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
        show: {
          x: 0,
        },
        hidden: {
          x: "100vw",
        },
      };
    case "right":
      return {
        show: {
          x: 0,
        },
        hidden: {
          x: "-100vw",
        },
      };
    case "up":
      return {
        show: {
          y: 0,
        },
        hidden: {
          y: "100vh",
        },
      };
    case "down":
      return {
        show: {
          y: 0,
        },
        hidden: {
          y: "-100vh",
        },
      };
    default:
      return {
        show: {
          x: 0,
        },
        hidden: {
          x: "100vw",
        },
      };
  }
};

const Slide: React.FC<ISlide> = (props) => {
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
  } = props;

  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

  const handleAnimationStart = (definition: string) => {
    if (onEnter && definition === "show") {
      onEnter();
    }
  };

  const handleAnimationComplete = (definition: string) => {
    if (onExited && definition === "hidden") {
      onExited();
    }
  };

  let element: React.ReactNode | null = (
    <m.div
      variants={variants(direction)}
      initial={"hidden"}
      animate={inProp ? "show" : "hidden"}
      exit="hidden"
      transition={{ damping: 5 }}
      className={className}
      onClick={onClick}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </m.div>
  );

  if (unmountOnExit && !inProp) {
    element = null;
  }

  return (
    <AnimatePresence initial={appear || (inProp && appear && mounted.current)}>
      {element}
    </AnimatePresence>
  );
};

export default Slide;
