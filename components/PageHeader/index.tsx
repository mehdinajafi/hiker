import PageHeaderBreadcrumbs from "./Breadcrumbs";
import PageHeaderLink from "./Link";
import PageHeader from "./PageHeader";
import PageHeaderTitle from "./Title";

export default Object.assign(PageHeader, {
  Breadcrumbs: PageHeaderBreadcrumbs,
  Link: PageHeaderLink,
  Title: PageHeaderTitle,
});
