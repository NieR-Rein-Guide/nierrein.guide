import "tailwindcss/tailwind.css";
import "@styles/index.scss";
import "@reach/accordion/styles.css";
import NProgress from "@components/nprogress";
import { FiGithub } from "react-icons/fi";
import { GITHUB_REPO_LINK } from "@config/constants";
import pkg from "../../package.json";

function App({ Component, pageProps }): JSX.Element {
  return (
    <>
      <a
        href={GITHUB_REPO_LINK}
        title="Click to view the source code on GitHub"
        rel="noopener noreferrer"
        target="_blank"
        className="fixed right-0 z-50 flex items-center gap-x-2 px-4 py-4 bg-beige text-black hover:bg-opacity-90 transition-colors "
      >
        <FiGithub />
        <span>Currently under heavy development (v{pkg.version})</span>
      </a>

      <Component {...pageProps} />
      <NProgress />
    </>
  );
}

export default App;
