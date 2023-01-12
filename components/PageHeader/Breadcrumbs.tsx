import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface IPageHeaderBreadcrumbs {
  children: React.ReactNode;
}

const PageHeaderBreadcrumbs: React.FC<IPageHeaderBreadcrumbs> = ({
  children,
}) => {
  return <Breadcrumbs>{children}</Breadcrumbs>;
};

export default PageHeaderBreadcrumbs;
