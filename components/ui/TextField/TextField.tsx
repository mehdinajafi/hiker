import React from "react";
import clsx from "clsx";
import useControllable from "@/hooks/useControllable";
import ChevronDownIcon from "@/public/icons/chevron-down.svg";

interface ITextField {
  select?: boolean;
  /**
   * The value of the input element, required for a controlled component.
   */
  value?: string;
  /**
   * The default value of input element. Use when the component is not controlled.
   */
  defaultValue?: string;
  /**
   * The id of `input` element.
   * Use this prop to make label and helperText accessible for screen readers.
   */
  id?: string;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * Type attribute of the `input` element.
   */
  type?: HTMLInputElement["type"];
  /**
   * The label content. This value is also used for `input` placeholder.
   */
  label?: string;
  /**
   * Callback fired when the value is changed.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: (e: React.ChangeEvent) => void;
  /**
   * If `true`, the TextField is displayed in an error state.
   */
  error?: boolean;
  /**
   * The helper text content.
   */
  helperText?: string | boolean;
  /**
   * The className of component root.
   */
  className?: string;
  /**
   * Content of component. Use in case like when the component is select.
   */
  children?: React.ReactNode;
}

const TextField: React.FC<ITextField> = (props) => {
  const {
    value: valueProp,
    defaultValue = "",
    onChange,
    type = "text",
    name,
    id,
    label,
    error,
    helperText,
    className,
    select,
    children,
  } = props;

  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
  });

  const isEmpty = value.trim() === "" ? "empty" : "fill";
  const helperTextId = id && id + "-helper-text";

  const handleOnChange = (e: React.ChangeEvent) => {
    setValue((e.target as HTMLInputElement).value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={clsx("relative flex-shrink-0", className)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "absolute top-2 z-10 px-3 text-xs text-gray-400 transition-all",
            {
              "translate-y-1 opacity-0": isEmpty === "empty",
              "translate-y-0 opacity-100": isEmpty === "fill" || children,
            }
          )}
        >
          {label}
        </label>
      )}

      {!select && (
        <input
          type={type}
          id={id}
          value={value}
          placeholder={label}
          onChange={handleOnChange}
          name={name}
          aria-describedby={helperTextId}
          aria-invalid={error ? "true" : "false"}
          className={clsx(
            "relative rounded border",
            "z-20 w-full bg-transparent px-3 text-sm transition-all",
            "focus:border-primary focus:outline-none",
            {
              "border-gray-500": !error,
              "border-rose-600": error,
              "py-4": isEmpty === "empty",
              "pt-6 pb-2": isEmpty === "fill",
            }
          )}
        />
      )}

      {select && (
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleOnChange}
          aria-describedby={helperTextId}
          aria-invalid={error ? "true" : "false"}
          className={clsx(
            "w-full rounded border bg-transparent px-3 text-sm",
            "focus:border-primary focus:outline-none",
            "appearance-none",
            {
              "border-gray-500": !error,
              "py-4": isEmpty === "empty" || !children,
              "pt-6 pb-2": isEmpty === "fill" || children,
            }
          )}
        >
          {children}
        </select>
      )}

      {select && (
        <span
          className={clsx(
            "absolute top-1/2 right-3 -translate-y-1/2 pl-3",
            "border-l border-gray-400"
          )}
        >
          <ChevronDownIcon width={14} height={14} />
        </span>
      )}

      {helperText && (
        <p
          id={helperTextId}
          className={clsx("mt-1 text-xs", {
            "text-rose-600": error,
            "text-gray-400": !error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
