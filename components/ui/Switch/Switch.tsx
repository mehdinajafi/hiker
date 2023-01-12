import React, { useRef } from "react";
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
  /**
   * Id of switch input.
   */
  id?: string;
}

const Switch: React.FC<ISwitch> = (props) => {
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
      <button
        role="switch"
        aria-checked={isChecked}
        className="relative inline-flex h-5 w-10 shrink-0 items-center"
        onClick={handleClick}
      >
        <span
          className={clsx(
            "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-transform will-change-transform",
            {
              "translate-x-1 bg-gray-500": !isChecked,
              "translate-x-6 bg-primary": isChecked,
            }
          )}
        />

        <span
          className={clsx("h-full w-full rounded-full border-2", {
            "border-primary": isChecked,
            "border-gray-500": !isChecked,
          })}
        />
      </button>

      <input
        id={id}
        ref={inputRef}
        type="checkbox"
        aria-hidden="true"
        className="hidden"
        checked={isChecked}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default Switch;
