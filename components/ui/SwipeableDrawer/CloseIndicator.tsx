import React from "react";
import clsx from "clsx";

interface ICloseIndicator {
  onPointerDown: React.PointerEventHandler;
}

const CloseIndicator = React.forwardRef<HTMLButtonElement, ICloseIndicator>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "flex items-center justify-center",
          "h-10 w-full rounded-t-md border-b bg-white",
          "user-select-none cursor-grab touch-pan-x"
        )}
        onPointerDown={props.onPointerDown}
      >
        <div className="h-1 w-20 rounded-full bg-gray-400" />
      </button>
    );
  }
);

CloseIndicator.displayName = "CloseIndicator";

export default CloseIndicator;
