import "tailwindcss/tailwind.css";
import "../src/index.scss";

function MyApp({ Component, pageProps, otherProp }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
