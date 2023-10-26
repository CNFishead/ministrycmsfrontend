import "@/styles/globals.css";
import "@/styles/globals.scss";
import "@/styles/app.scss";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppWrapper from "@/layout/appWrapper/AppWrapper";
import NProgress from "nprogress"; //nprogress module
import Router from "next/router"; //nprogress module
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  //Route Events.
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      speed: 500,
      easing: "ease",
      trickle: true,
      trickleSpeed: 800,
    });
  }, []);
  console.log(`App started in ${process.env.NODE_ENV} mode, with ${process.env.API_URL} as API_URL`);
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(60, 98, 85)",
            colorText: "rgb(92, 138, 122)",
          },
        }}
      >
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
