import React, { useRef } from "react";
import clsx from "clsx";
import useControllable from "@/hooks/useControllable";
import CheckIcon from "@/public/icons/check.svg";

interface ICheckbox {
  /**
   * if `true`, component is checked
   */
  checked?: boolean;
  /**
   * Callback fired when the state is changed.
   * You can pull out new checked state by accessing `event.target.checked`.
   */
  onCheckedChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * Id of checkbox input.
   */
  id?: string;
}

const Checkbox: React.FC<ICheckbox> = (props) => {
  const { checked, onCheckedChange, defaultChecked = false, id } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [isChecked, setIsChecked] = useControllable<boolean>({
    value: checked,
    defaultValue: defaultChecked,
  });

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onCheckedChange) {
      onCheckedChange(e);
    }
  };

  return (
    <React.Fragment>
      <input
        id={id}
        ref={inputRef}
        type="checkbox"
        className="hidden"
        aria-hidden="true"
        checked={isChecked}
        onChange={handleChange}
      />

      <span
        role="checkbox"
        aria-checked={isChecked}
        className={clsx(
          "user-select-none inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border",
          {
            "border-gray-500": !isChecked,
            "border-accent bg-accent text-black": isChecked,
          }
        )}
        onClick={handleClick}
      >
        {isChecked && <CheckIcon aria-hidden="true" />}
      </span>
    </React.Fragment>
  );
};

export default Checkbox;
