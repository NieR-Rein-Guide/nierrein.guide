import "tailwindcss/tailwind.css";
import "../src/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
