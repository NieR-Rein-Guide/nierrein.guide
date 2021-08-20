import { meta } from "@config/constants";
import Document, { Html, Head, Main, NextScript } from "next/document";

const { description, cover, url } = meta;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content="NieR Re[in] Guide" />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={cover} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content="NieR Re[in] Guide" />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={cover}></meta>
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&amp;display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
