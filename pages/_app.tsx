import "tailwindcss/tailwind.css";
import "../src/index.scss";
import NProgress from '../components/nprogress'

function MyApp({ Component, pageProps, otherProp }) {
  return (
    <>
      <Component {...pageProps} />
      <NProgress />
    </>
  );
}

export default MyApp;
