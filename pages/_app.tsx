import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import "../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, layoutProps: any) => ReactNode;
};

interface WorkaroundAppProps extends AppProps {
  err: any;
}

export type AppPropsWithLayout = WorkaroundAppProps & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  err,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const { layoutProps, ...modifiedPageProps } = pageProps;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(
          <Component {...modifiedPageProps} err={err} />,
          modifiedPageProps
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
