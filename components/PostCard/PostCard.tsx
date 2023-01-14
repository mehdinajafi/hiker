import Link from "next/link";
import Image from "next/image";
import format from "date-fns/format";
import { IPost } from "@/interfaces";
import ArrowDownIcon from "@/public/icons/arrow_down.svg";

const PostCard: React.FC<IPost> = (props) => {
  const { time, title, description, image, imageAlt, slug } = props;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-gray-100 shadow-sm">
      <div className="relative h-52 md:h-40 lg:h-52">
        <Image
          src={image}
          width={600}
          height={300}
          alt={imageAlt}
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex grow flex-col p-4">
        <time className="text-xs text-gray-500">
          {format(time, "dd MMM yyyy")}
        </time>
        <h3 className="mt-2 font-serif text-xl font-bold">{title}</h3>

        <p className="ellipsis-2 mt-4 text-sm text-gray-500">{description}</p>

        <div className="mt-auto">
          <Link
            href={"/blog/" + slug}
            className="group/link mt-4 inline-flex items-center space-x-4 text-primary"
          >
            <span className="text-subtitle1">read more</span>
            <ArrowDownIcon className="rotate-[270deg] transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
