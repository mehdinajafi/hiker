import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "@/public/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (res, init) => fetch(res, init).then((res) => res.json()),
        fallback: pageProps.fallback,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default App;
