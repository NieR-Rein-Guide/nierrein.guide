import "tailwindcss/tailwind.css";
import "../src/index.scss";

import Head from "next/head";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/ui/material/material322002_standard.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
