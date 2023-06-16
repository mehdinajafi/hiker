"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";

type IBlurImage = Omit<ImageProps, "onLoadingComplete">;

const BlurImage: React.FC<IBlurImage> = (props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={clsx(
        "transition-[filter] duration-700 ease-in-out",
        {
          "animate-pulse rounded-md bg-gray-200 blur-sm ": isLoading,
          "blur-0": !isLoading,
        },
        props.className
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default BlurImage;
