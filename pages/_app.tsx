import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { LazyMotion, domAnimation } from "framer-motion";
import "@/public/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <SWRConfig
        value={{
          fetcher: (res, init) => fetch(res, init).then((res) => res.json()),
          fallback: pageProps.fallback,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </LazyMotion>
  );
};

export default App;
