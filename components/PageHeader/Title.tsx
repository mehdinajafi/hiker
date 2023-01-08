interface IPageHeaderTitle {
  children: React.ReactNode;
}

const PageHeaderTitle: React.FC<IPageHeaderTitle> = ({ children }) => {
  return <h2 className="heading-2xl text-white">{children}</h2>;
};

export default PageHeaderTitle;
