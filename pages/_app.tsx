import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import React, { useState } from "react";
import theme from "../src/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
