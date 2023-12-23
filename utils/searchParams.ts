import { headers } from "next/headers";

const searchParams = () => {
  const url = headers().get("x-url")!;
  return new URLSearchParams(new URL(url).searchParams);
};

export default searchParams;
