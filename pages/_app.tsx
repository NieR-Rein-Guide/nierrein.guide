import "tailwindcss/tailwind.css";
import "../src/styles/index.scss";

function MyApp({ Component, pageProps, otherProp }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
