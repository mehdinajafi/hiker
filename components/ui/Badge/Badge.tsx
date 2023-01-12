import clsx from "clsx";

interface IBadge {
  /**
   * The color of the component.
   */
  color?: "primary";
  /**
   * The content rendered within the badge.
   */
  badgeContent: number;
  /**
   * The anchor of the badge.
   */
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "right" | "left";
  };
  /**
   * Max count to show.
   */
  max?: number;
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   */
  showZero?: boolean;
  /**
   * The badge will be added relative to this node.
   */
  children: React.ReactNode;
}

const Badge: React.FC<IBadge> = (props) => {
  const {
    color = "primary",
    badgeContent,
    anchorOrigin = { vertical: "top", horizontal: "right" },
    max = 99,
    showZero = false,
    children,
  } = props;

  return (
    <span className={clsx("relative inline-flex shrink-0 align-middle")}>
      {children}
      <span
        key={badgeContent}
        className={clsx(
          "absolute inline-flex items-center justify-center",
          "h-5 min-w-[1.25rem] rounded-full px-1 text-xs font-medium",
          "translate-x-1/2 -translate-y-1/2",
          {
            "bg-primary text-gray-100": color === "primary",
            "top-0": anchorOrigin.vertical === "top",
            "bottom-0": anchorOrigin.vertical === "bottom",
            "left-0": anchorOrigin.horizontal === "left",
            "right-0": anchorOrigin.horizontal === "right",
            hidden: !showZero && badgeContent === 0,
          }
        )}
      >
        {badgeContent <= max ? badgeContent : max + "+"}
      </span>
    </span>
  );
};

export default Badge;
