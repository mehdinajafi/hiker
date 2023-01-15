import clsx from "clsx";
import { paddingInlineStyles } from "./TextField";

interface ITextFieldInput extends React.HTMLProps<HTMLInputElement> {
  /**
   * If `true`, the TextFieldInput is displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the TextFieldInput is displayed in empty state.
   */
  isEmpty: boolean;
  /**
   * Start adornment for this component.
   */
  startAdornment?: React.ReactNode;
  /**
   * End adornment for this component.
   */
  endAdornment?: React.ReactNode;
}

const TextFieldInput: React.FC<ITextFieldInput> = ({
  startAdornment,
  endAdornment,
  error,
  isEmpty,
  ...props
}) => {
  return (
    <>
      {startAdornment && (
        <Adornment position="start">{startAdornment}</Adornment>
      )}

      <input
        className={clsx(
          "relative rounded border",
          "z-20 w-full bg-transparent text-sm transition-[border-color]",
          "focus:border-primary focus:outline-none",
          {
            ...paddingInlineStyles({ startAdornment, endAdornment }),
            "border-gray-300": !error,
            "border-rose-600": error,
            "py-4": isEmpty,
            "pt-6 pb-2": !isEmpty,
          }
        )}
        {...props}
      />

      {endAdornment && <Adornment position="end">{endAdornment}</Adornment>}
    </>
  );
};

const Adornment: React.FC<{
  children: React.ReactNode;
  position: "start" | "end";
}> = (props) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center",
        "absolute top-1/2 z-30 -translate-y-1/2",
        {
          "left-3": props.position === "start",
          "right-3": props.position === "end",
        }
      )}
    >
      {props.children}
    </span>
  );
};

export default TextFieldInput;
