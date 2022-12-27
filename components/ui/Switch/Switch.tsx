import React from "react";
import clsx from "clsx";
import useControllable from "@/hooks/useControllable";

interface ISwitch {
  /**
   * If `true`, component is checked.
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

const Switch: React.FC<ISwitch> = (props) => {
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
      role="switch"
      aria-checked={isChecked}
      className={clsx("relative inline-flex h-5 w-10 items-center")}
    >
      <input
        type="checkbox"
        aria-hidden="true"
        className="hidden"
        checked={isChecked}
        onChange={handleChange}
      />

      <span
        className={clsx(
          "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-transform will-change-transform",
          {
            "translate-x-1 bg-gray-100": !isChecked,
            "translate-x-6 bg-accent": isChecked,
          }
        )}
      />

      <span
        className={clsx("h-full w-full rounded-full border-2", {
          "border-accent": isChecked,
          "border-gray-100": !isChecked,
        })}
      />
    </label>
  );
};

export default Switch;
