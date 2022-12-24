import { NextPage } from "next";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { LazyMotion, domAnimation } from "framer-motion";
import Layout from "@/components/Layout";
import "@/public/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
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
