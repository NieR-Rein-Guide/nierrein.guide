import "tailwindcss/tailwind.css";
import "@styles/index.scss";
import "@reach/accordion/styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@reach/menu-button/styles.css";
import "rc-slider/assets/index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";

const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bda699",
    },
  },
});

import NProgress from "@components/nprogress";

function App({ Component, pageProps }): JSX.Element {
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
      <NProgress />
    </>
  );
}

export default App;
