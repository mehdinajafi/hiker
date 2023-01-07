import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { LazyMotion, domAnimation } from "framer-motion";
import ToastContainer from "@/components/ui/ToastContainer";
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
          fetcher: async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
          },
        }}
      >
        <ToastContainer />
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    </LazyMotion>
  );
};

export default App;
