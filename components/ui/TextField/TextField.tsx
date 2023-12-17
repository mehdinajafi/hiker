"use client";

import React from "react";
import clsx from "clsx";
import TextFieldInput from "./TextFieldInput";
import TextFieldSelect from "./TextFieldSelect";
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
  onChange?: (e: React.FormEvent) => void;
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
   * Start adornment for this component.
   */
  startAdornment?: React.ReactNode;
  /**
   * End adornment for this component.
   */
  endAdornment?: React.ReactNode;
  /**
   * Content of component. Use in case like when the component is select.
   */
  children?: React.ReactNode;
}

export const paddingInlineStyles = ({
  startAdornment,
  endAdornment,
}: {
  startAdornment: ITextField["startAdornment"];
  endAdornment: ITextField["startAdornment"];
}) => {
  return {
    "pl-10 pr-3": Boolean(startAdornment),
    "pr-10 pl-3": Boolean(endAdornment),
    "px-3": !Boolean(startAdornment) && !Boolean(endAdornment),
  };
};

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
    startAdornment,
    endAdornment,
    children,
  } = props;

  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
  });

  const isEmpty = value.trim() === "";
  const ariaInvalid = error ? "true" : "false";
  const helperTextId = id && id + "-helper-text";

  const handleOnChange = (e: React.FormEvent) => {
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
            "absolute top-2 z-10 text-xs text-gray-400 transition-all",
            {
              "translate-y-1 opacity-0": isEmpty,
              "translate-y-0 opacity-100": !isEmpty || children,
              ...paddingInlineStyles({ startAdornment, endAdornment }),
            }
          )}
        >
          {label}
        </label>
      )}

      {!select && (
        <TextFieldInput
          type={type}
          id={id}
          value={value}
          placeholder={label}
          onChange={handleOnChange}
          name={name}
          aria-describedby={helperTextId}
          aria-invalid={ariaInvalid}
          error={error}
          isEmpty={isEmpty}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
        />
      )}

      {select && (
        <TextFieldSelect
          id={id}
          name={name}
          value={value}
          onChange={handleOnChange}
          aria-describedby={helperTextId}
          aria-invalid={ariaInvalid}
          error={error}
          isEmpty={isEmpty}
        >
          {children}
        </TextFieldSelect>
      )}

      {select && (
        <span
          className={clsx(
            "absolute top-1/2 right-3 -translate-y-1/2 pl-3",
            "border-l border-gray-300"
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
