import clsx from "clsx";
import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The color of the component.
   */
  color: "gray";
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
  /**
   * Element placed after the children.
   */
  endIcon?: React.ReactNode;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
}

const Button: React.FC<IButton> = (props) => {
  const {
    color = "gray",
    startIcon,
    endIcon,
    children,
    className,
    ...otherProps
  } = props;

  return (
    <button
      className={clsx(
        "inline-flex items-center",
        "rounded-md py-2 px-4",
        {
          "bg-gray-700 text-white hover:bg-gray-800 active:bg-gray-900":
            color === "gray",
        },
        className
      )}
      {...otherProps}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
