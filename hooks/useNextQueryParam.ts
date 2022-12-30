import { useRouter } from "next/router";
import { useMemo } from "react";

/**
 *
 * @param key the query key
 * @returns the query value to the query key
 */
const useNextQueryParam = (key: string): string | string[] | undefined => {
  const { asPath } = useRouter();

  const value = useMemo(() => {
    const search = asPath.substring(asPath.indexOf("?"), asPath.length);
    if (!search) {
      return undefined;
    }
    const searchParams = new URLSearchParams(search);
    const match = searchParams.getAll(key);
    if (match.length > 1) return match;
    return match[0];
  }, [asPath, key]);

  return value;
};

export default useNextQueryParam;
