import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The color of the component.
   */
  color?: "gray" | "error" | "primary";
  /**
   * The variant to use.
   */
  variant?: "contained" | "text";
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
    color = "primary",
    variant = "contained",
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
        "rounded-md text-sm font-semibold",
        "transition-transform active:scale-95 disabled:opacity-30",
        {
          "text-gray-100": variant === "text" && color === "gray",
          "text-accent-dark": variant === "text" && color === "primary",
          "text-rose-700": variant === "text" && color === "error",
          "py-2 px-4": variant === "contained",
          "bg-gray-700 text-white hover:bg-gray-800 disabled:hover:bg-gray-700":
            color === "gray" && variant === "contained",
          "bg-rose-700 text-white hover:bg-rose-800 disabled:hover:bg-rose-700":
            color === "error" && variant === "contained",
          "bg-accent text-gray-900 hover:bg-accent-dark disabled:hover:bg-accent":
            color === "primary" && variant === "contained",
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
