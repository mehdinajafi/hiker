import { Meta, StoryFn } from "@storybook/react";
import ProductCard from "./ProductCard";

type ProductCardType = typeof ProductCard;
type Args = React.ComponentPropsWithoutRef<ProductCardType>;

const meta: Meta<ProductCardType> = {
  title: "ProductCard",
  component: ProductCard,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

const product: Args = {
  status: "marketable",
  images: {
    main: "/images/products/01.webp",
    optimized: [{ type: "image/webp", url: "/images/products/01.webp" }],
  },
  title: "Tupilak 37+",
  rating: {
    count: 379,
    rate: 90,
  },
  price: 200.0,
  slug: "tupilak-37+",
};

export const Default: StoryFn<ProductCardType> = (args: Args) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <ProductCard {...args} />
      </div>
    </div>
  );
};
Default.args = {
  ...product,
};

export const OutOfStock: StoryFn<ProductCardType> = (args: Args) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <ProductCard {...args} />
      </div>
    </div>
  );
};
OutOfStock.args = {
  ...product,
  status: "out_of_stock",
};

export const LongTitle: StoryFn<ProductCardType> = (args: Args) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <ProductCard {...args} />
      </div>
    </div>
  );
};
LongTitle.args = {
  ...product,
  title:
    "This is long text this is long text this is long text this is long text this is long text",
};
