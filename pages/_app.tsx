import "styles/globals.css";

import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "urql";

import RegionsProvider from "@/components/RegionsProvider";
import SaleorProviderWithChannels from "@/components/SaleorProviderWithChannels";
import apolloClient from "@/lib/graphql";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <RegionsProvider>
      <Provider value={apolloClient}>
        <SaleorProviderWithChannels>
          {getLayout(<Component {...pageProps} />)}
        </SaleorProviderWithChannels>
      </Provider>
    </RegionsProvider>
  );
};

export default MyApp;
