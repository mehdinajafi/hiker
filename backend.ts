const backend = (url: string, init?: RequestInit | undefined) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return fetch(baseUrl + url, init);
};

export default backend;
