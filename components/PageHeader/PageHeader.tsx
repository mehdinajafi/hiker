interface IPageHeader {
  children: React.ReactNode;
}

const PageHeader: React.FC<IPageHeader> = ({ children }) => {
  return <div className="pt-8">{children}</div>;
};

export default PageHeader;
