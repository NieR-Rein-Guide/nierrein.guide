import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&amp;display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/app.webmanifest" />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="apple-touch-icon" sizes="64x64" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
          <script
            async
            src="https://analytics.nierrein.guide/tracker.js"
            data-ackee-server="https://analytics.nierrein.guide"
            data-ackee-domain-id="740ae9bc-5bd5-426f-aa18-4f9ae79b0671"
          ></script>
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
