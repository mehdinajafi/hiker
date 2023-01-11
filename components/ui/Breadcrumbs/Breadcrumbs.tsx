import clsx from "clsx";
import React from "react";

interface IBreadcrumb {
  /**
   * The content of component.
   */
  children: React.ReactNode;
  /**
   * ClassName of breadcrumbs root.
   */
  className?: string;
  /**
   * Custom separator node.
   * @default '/'
   */
  separator?: React.ReactNode;
}

const insertSeparators = (
  items: JSX.Element[],
  separator: IBreadcrumb["separator"]
) => {
  return items.reduce<JSX.Element[]>((acc, currentItem, currentIndex) => {
    if (currentIndex < items.length - 1) {
      acc = acc.concat(
        currentItem,
        <li
          aria-hidden
          key={`separator-${currentIndex}`}
          className="breadcrumbs--separator user-select-none mx-2"
        >
          {separator}
        </li>
      );
    } else {
      acc.push(currentItem);
    }

    return acc;
  }, []);
};

const Breadcrumbs: React.FC<IBreadcrumb> = (props) => {
  const { children, separator = "/", className } = props;

  const allItems = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child))
    .map((child, index) => (
      <li className="breadcrumbs--li" key={`child-${index}`}>
        {child}
      </li>
    ));

  return (
    <nav className={clsx("breadcrumbs--root", className)}>
      <ol className="breadcrumbs--ol flex">
        {insertSeparators(allItems, separator)}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
