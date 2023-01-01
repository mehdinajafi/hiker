import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { LazyMotion, domAnimation } from "framer-motion";
import Layout from "@/components/Layout";
import { NextPage } from "@/interfaces";
import "@/public/globals.css";

type AppPropsWithLayout = AppProps & {
  Component: NextPage;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <LazyMotion features={domAnimation}>
      <SWRConfig
        value={{
          fetcher: (res, init) => fetch(res, init).then((res) => res.json()),
          fallback: pageProps.fallback,
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    </LazyMotion>
  );
};

export default App;
