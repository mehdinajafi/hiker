import Link from "next/link";

interface IPageHeaderLink {
  disabled?: boolean;
  href?: string;
  children?: React.ReactNode;
}

const PageHeaderLink: React.FC<IPageHeaderLink> = ({
  children,
  disabled,
  href,
}) => {
  if (disabled) {
    return <span className="text-sm">{children}</span>;
  }

  return (
    <Link href={href || "/"} className="text-sm text-gray-500 hover:underline">
      {children}
    </Link>
  );
};

export default PageHeaderLink;
