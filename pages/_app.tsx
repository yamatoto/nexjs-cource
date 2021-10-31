import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Next Event</title>
        <meta name="description" content="NextJS Event" />
        <meta name="viewport" content="initial-scale=1.0 width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
