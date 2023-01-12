import clsx from "clsx";

interface IDivider {
  /**
   * The divider orientation.
   */
  orientation?: "horizontal" | "vertical";
}

const Divider: React.FC<IDivider> = (props) => {
  const { orientation = "horizontal" } = props;

  return (
    <hr
      className={clsx("divider", "shrink-0 border-0 border-gray-300", {
        "h-auto self-stretch border-r": orientation === "vertical",
        "border-b": orientation === "horizontal",
      })}
    />
  );
};

export default Divider;
