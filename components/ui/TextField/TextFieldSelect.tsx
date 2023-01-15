import clsx from "clsx";

interface ITextFieldSelect extends React.HTMLProps<HTMLSelectElement> {
  /**
   * If `true`, the TextFieldSelect is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the TextFieldSelect is displayed in empty state.
   */
  isEmpty: boolean;
  /**
   * Content of this component.
   */
  children?: React.ReactNode;
}

const TextFieldSelect: React.FC<ITextFieldSelect> = ({
  error,
  isEmpty,
  children,
  ...props
}) => {
  return (
    <select
      className={clsx(
        "w-full rounded border bg-transparent px-3 text-sm",
        "focus:border-primary focus:outline-none",
        "appearance-none",
        {
          "border-gray-300": !error,
          "py-4": isEmpty || !children,
          "pt-6 pb-2": !isEmpty || children,
        }
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default TextFieldSelect;
