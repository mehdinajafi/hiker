import { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";

type FooterType = typeof Footer;

const meta: Meta<FooterType> = {
  title: "Footer",
  component: Footer,
};

export default meta;

export const Default: StoryObj<FooterType> = {};
