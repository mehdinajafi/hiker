interface IPageHeader {
  children: React.ReactNode;
}

const PageHeader: React.FC<IPageHeader> = ({ children }) => {
  return <div>{children}</div>;
};

export default PageHeader;
