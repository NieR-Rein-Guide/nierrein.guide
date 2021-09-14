import "tailwindcss/tailwind.css";
import "@styles/index.scss";
import "@reach/accordion/styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@reach/menu-button/styles.css";
import "rc-slider/assets/index.css";

import NProgress from "@components/nprogress";

function App({ Component, pageProps }): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <NProgress />
    </>
  );
}

export default App;
