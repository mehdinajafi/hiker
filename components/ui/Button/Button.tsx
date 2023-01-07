import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The color of the component.
   */
  color: "gray" | "error" | "primary";
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
  /**
   * The URL to link to when the button is clicked.
   * If defined, an a element will be used as the root node.
   */
  href?: string;
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
  let Component: React.ElementType = "button";
  if (otherProps.href) {
    Component = Link;
  }

  return (
    <Component
      {...otherProps}
      className={clsx(
        "inline-flex items-center justify-center",
        "rounded-md py-2 px-4",
        "transition-transform active:scale-95 disabled:opacity-30",
        {
          "bg-gray-700 text-white hover:bg-gray-800 disabled:hover:bg-gray-700":
            color === "gray",
          "bg-rose-700 text-white hover:bg-rose-800 disabled:hover:bg-rose-700":
            color === "error",
          "bg-accent text-gray-900 hover:bg-accent-dark disabled:hover:bg-accent":
            color === "primary",
        },
        className
      )}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </Component>
  );
};

export default Button;
