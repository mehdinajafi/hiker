import React from "react";
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
}

const Checkbox: React.FC<ICheckbox> = (props) => {
  const { checked, onCheckedChange, defaultChecked = false } = props;

  const [isChecked, setIsChecked] = useControllable<boolean>({
    value: checked,
    defaultValue: defaultChecked,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onCheckedChange) {
      onCheckedChange(e);
    }
  };

  return (
    <label
      role="checkbox"
      aria-checked={isChecked}
      className={clsx(
        "flex h-5 w-5 items-center justify-center rounded-sm border",
        {
          "border-gray-500": !isChecked,
          "border-accent bg-accent text-black": isChecked,
        }
      )}
    >
      <input
        type="checkbox"
        className="hidden"
        aria-hidden="true"
        checked={isChecked}
        onChange={handleChange}
      />

      {isChecked && <CheckIcon aria-hidden="true" />}
    </label>
  );
};

export default Checkbox;
