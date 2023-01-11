import clsx from "clsx";

interface ILabel {
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: React.ReactNode;
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: React.ReactNode;
  /**
   * ClassName of label element.
   */
  className?: string;
}

const Label: React.FC<ILabel> = (props) => {
  return (
    <label
      className={clsx(
        "inline-flex cursor-pointer items-center",
        props.className
      )}
    >
      {props.control}
      <span className="user-select-none ml-3 w-full text-sm">
        {props.label}
      </span>
    </label>
  );
};

export default Label;
