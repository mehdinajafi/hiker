import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";

type BreadcrumbsType = typeof Breadcrumbs;
type Args = React.ComponentPropsWithoutRef<BreadcrumbsType>;

const meta: Meta<BreadcrumbsType> = {
  title: "Design System/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    children: {
      control: false,
    },
    separator: {
      defaultValue: "/",
    },
  },
};

export default meta;

export const Default: StoryFn<BreadcrumbsType> = (args: Args) => {
  return (
    <div className="text-white">
      <Breadcrumbs {...args}>
        <Link href="/" key="home">
          Home
        </Link>
        <div key="blog">Blog</div>,
      </Breadcrumbs>
    </div>
  );
};

export const CustomSeparator: StoryFn<BreadcrumbsType> = (args: Args) => {
  return (
    <div className="text-white">
      <Breadcrumbs {...args}>
        <Link href="/" key="home">
          Home
        </Link>
        <div key="blog">Blog</div>,
      </Breadcrumbs>
    </div>
  );
};
CustomSeparator.args = {
  separator: ">",
};
