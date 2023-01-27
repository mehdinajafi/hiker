import { useRef, useState } from "react";
import {
  motion,
  PanInfo,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import Drawer from "@/components/ui/Drawer";
import type { IDrawer } from "@/components/ui/Drawer";
import CloseIndicator from "./CloseIndicator";

interface ISwipeableDrawer {
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Callback called when the component request to be closed.
   */
  onClose: () => void;
  /**
   * Side from which the swipeable drawer will appear.
   * @default bottom
   */
  anchor?: "bottom";
  /**
   * From this width component will hide.
   */
  hide?: "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * ClassName of SwipeableDrawer.
   */
  className?: string;
  /**
   * A single child content element.
   */
  children: React.ReactNode;
  /**
   * Amount of height is visible when first open the drawer.
   */
  bleedingHeight: number;
}

type Status = "bleeding" | "open" | "closing";

const getArea = (indicatorRect: DOMRect, windowHeight: number) => {
  const top = indicatorRect.top;
  const windowSlice = windowHeight / 4;
  const i = Math.floor(top / windowSlice);
  return i + 1;
};

const getDrawerHeight = (status: Status, bleedingHeight: number) => {
  switch (status) {
    case "bleeding":
      return bleedingHeight;
    case "closing":
      return 0;
    case "open":
      return "100%";
    default:
      break;
  }
};

const SwipeableDrawer: React.FC<ISwipeableDrawer> = (props) => {
  const {
    anchor = "bottom",
    keepMounted = false,
    className,
    hide,
    open,
    onClose,
    bleedingHeight,
    children,
  } = props;

  const [status, setStatus] = useState<Status>("bleeding");

  const height = useMotionValue(bleedingHeight);

  if (open && height.get() === 0) {
    height.set(bleedingHeight);
  }

  const indicatorRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();

  const handleStartDrag: React.PointerEventHandler = (event) => {
    dragControls.start(event);
  };

  const handleOnDragEnd = (event: PointerEvent, info: PanInfo) => {
    const rect = indicatorRef.current?.getBoundingClientRect() as DOMRect;
    // const area = getArea(rect, window.innerHeight);

    if (info.offset.y < 0) {
      // swip up
      setStatus("open");
      height.set(height.get() + info.offset.y * -1 + rect.top);

      // if (status === "bleeding" && area === 1) {
      //   setStatus("open");
      // }
    } else {
      // swip down
      setStatus("closing");
      height.set(0);
      onClose();

      // if (status === "bleeding") {
      //   setStatus("closing");
      //   onClose();
      // }
      // if (status === "open") {
      //   if (area === 1) {
      //     setStatus("bleeding");
      //   } else {
      //     setStatus("closing");
      //     onClose();
      //   }
      // }
    }
  };

  const drawerProps: IDrawer = {
    onClose,
    open,
    anchor,
    className,
    keepMounted,
    hide,
    ContentProps: {
      style: { height, maxHeight: "100%", transition: "height 200ms" },
    },
  };

  return (
    <Drawer {...drawerProps}>
      <motion.div
        drag="y"
        dragSnapToOrigin
        dragListener={false}
        dragElastic={0.6}
        dragTransition={{ bounceStiffness: 0 }}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragControls={dragControls}
        onDragEnd={handleOnDragEnd}
      >
        <CloseIndicator ref={indicatorRef} onPointerDown={handleStartDrag} />

        <div className="h-screen w-full overflow-y-auto pb-10">{children}</div>
      </motion.div>
    </Drawer>
  );
};

export default SwipeableDrawer;
