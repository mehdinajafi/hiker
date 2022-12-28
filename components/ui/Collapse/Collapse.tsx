import clsx from "clsx";
import { m, AnimatePresence, Variants } from "framer-motion";

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
  /**
   * The transition orientation.
   */
  orientation?: "horizontal" | "vertical";
  onClick?: () => void;
  onEnter?: () => void;
  onExited?: () => void;
}

const variants = (orientation: ICollapse["orientation"]) => {
  if (orientation === "horizontal") {
    return {
      hidden: {
        width: 0,
      },
      show: {
        width: "auto",
      },
    };
  } else {
    return {
      hidden: {
        height: 0,
      },
      show: {
        height: "auto",
      },
    };
  }
};

const Collapse: React.FC<ICollapse> = (props) => {
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
      variants={variants(orientation)}
      initial="hidden"
      animate={inProp ? "show" : "hidden"}
      exit="hidden"
      className={clsx("overflow-hidden", className)}
      onClick={onClick}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      {...otherProps}
    >
      {children}
    </m.div>
  );

  if (unmountOnExit && !inProp) {
    element = null;
  }

  return <AnimatePresence initial={appear}>{element}</AnimatePresence>;
};

export default Collapse;
