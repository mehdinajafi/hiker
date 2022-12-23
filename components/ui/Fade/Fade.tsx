import { useEffect, useRef } from "react";
import { AnimatePresence, m, Variants } from "framer-motion";

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
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const Fade: React.FC<IFade> = (props) => {
  const {
    in: inProp,
    appear = true,
    unmountOnExit,
    className,
    children,
    onClick,
    onEnter,
    onExited,
  } = props;

  const mounted = useRef(false);
  useEffect(() => {
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
      variants={variants}
      initial="hidden"
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

export default Fade;
