import { Meta, StoryFn } from "@storybook/react";
import PageHeader from "./";

type PageHeaderType = typeof PageHeader;

const meta: Meta<PageHeaderType> = {
  title: "PageHeader",
  component: PageHeader,
};

export default meta;

export const Default: StoryFn<PageHeaderType> = () => {
  return (
    <PageHeader>
      <PageHeader.Title>Checkout</PageHeader.Title>
      <PageHeader.Breadcrumbs>
        <PageHeader.Link>Home</PageHeader.Link>
        <PageHeader.Link href="/cart">Cart</PageHeader.Link>
        <PageHeader.Link disabled>Checkout</PageHeader.Link>
      </PageHeader.Breadcrumbs>
    </PageHeader>
  );
};
