import Link from "next/link";
import Image from "next/image";
import format from "date-fns/format";
import { IPost } from "@/interfaces";

const PostCard: React.FC<IPost> = (props) => {
  const { time, title, description, image, imageAlt, slug } = props;

  return (
    <article className="h-full overflow-hidden rounded-lg bg-gray-100 shadow-sm">
      <Link href={`/blog/${slug}`} className="flex h-full flex-col">
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
          <time className="text-caption text-gray-500">
            {format(time, "dd MMM yyyy")}
          </time>

          <h3 className="ellipsis-2 heading-xl mt-2 mb-4 font-serif">
            {title}
          </h3>

          <p className="ellipsis-2 text-subtitle2 mt-auto text-gray-500">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
