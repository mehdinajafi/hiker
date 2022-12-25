import { Meta, StoryFn, StoryObj } from "@storybook/react";
import PostCard from "./PostCard";

type PostCardType = typeof PostCard;
type Args = React.ComponentPropsWithoutRef<PostCardType>;

const meta: Meta<PostCardType> = {
  title: "PostCard",
  component: PostCard,
};

export default meta;

const post = {
  time: 1671957358231,
  title: "What level of  hiker are you?",
  description:
    "Determining what level of hiker you are can be an important tool when planning future hikes....",
  image: "/images/header-bg.avif",
  imageAlt: "Mountaineering runs on the mountain.",
  slug: "/blog/what-level-of-hiker-are-you-?",
};

export const Default: StoryObj<PostCardType> = {
  args: post,
  decorators: [
    (Story) => (
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6">
          <Story />
        </div>
      </div>
    ),
  ],
};
