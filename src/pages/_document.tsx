import Document, { Html, Head, Main, NextScript } from "next/document";
import { env } from "../env";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="manifest" href="/app.webmanifest" />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="apple-touch-icon" sizes="64x64" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
          {env.NODE_ENV === "production" && (
            <script
              async
              defer
              data-website-id="08a4d8e2-bbe0-42bf-bbc1-ecb59d36402b"
              src="https://umami.keziahmoselle.fr/script.js"
            ></script>
          )}
          {/* Comment system */}
          <script async src="/scripts/cusdis.js"></script>

          <script
            async
            src="https://cdn.strawpoll.com/dist/widgets.js"
            charSet="utf-8"
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
