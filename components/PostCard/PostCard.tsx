import Link from "next/link";
import Image from "next/image";
import format from "date-fns/format";
import { IPost } from "@/interfaces";
import ArrowDownIcon from "@/public/icons/arrow_down.svg";

const PostCard: React.FC<IPost> = (props) => {
  const { time, title, description, image, imageAlt, slug } = props;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-gray-100">
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
        <time className="text-xs text-gray-500">
          {format(time, "dd MMM yyyy")}
        </time>
        <h3 className="mt-2 font-serif text-xl font-bold text-primary">
          {title}
        </h3>

        <p className="mt-4 text-sm text-gray-500">{description}</p>

        <div className="mt-4">
          <Link
            href={"/blog/" + slug}
            className="group/link inline-flex items-center space-x-4 text-primary"
          >
            <span className="text-sm">read more</span>
            <ArrowDownIcon className="rotate-[270deg] transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
