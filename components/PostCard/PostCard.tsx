import Link from "next/link";
import Image from "next/image";
import format from "date-fns/format";
import ArrowDownIcon from "@/public/icons/arrow_down.svg";

interface IPostCard {
  time: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
}

const PostCard: React.FC<IPostCard> = (props) => {
  const { time, title, description, image, imageAlt, slug } = props;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-600">
      <div className="relative h-[300px]">
        <Image
          src={image}
          width={600}
          height={300}
          alt={imageAlt}
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <time className="text-body2 text-gray-400">
          {format(time, "dd MMM yyyy")}
        </time>
        <h3 className="heading-xl mt-2 font-serif text-accent">{title}</h3>
        <p className="text-body2 mt-4 text-white">{description}</p>
        <div className="mt-4">
          <Link
            href={slug}
            className="group/link inline-flex items-center space-x-4 text-accent"
          >
            <span className="text-subtitle2">read more</span>
            <ArrowDownIcon className="rotate-[270deg] transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
