import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface IPageHeaderBreadcrumbs {
  children: React.ReactNode;
}

const PageHeaderBreadcrumbs: React.FC<IPageHeaderBreadcrumbs> = ({
  children,
}) => {
  return (
    <div className="mt-4 text-gray-500">
      <Breadcrumbs>{children}</Breadcrumbs>
    </div>
  );
};

export default PageHeaderBreadcrumbs;
