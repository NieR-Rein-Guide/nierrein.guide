import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "config/constants";
import Lottie from "react-lottie-player";
import logoData from "../../lottie/logo.json";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";

import { FiGithub } from "react-icons/fi";
import { GITHUB_REPO_LINK } from "@config/constants";
import pkg from "../../../package.json";

export default function Header(): JSX.Element {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const router = useRouter();
  const defaultAnimationPosition = 20;
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPosition] = useState(defaultAnimationPosition);

  function start() {
    setIsAnimating(true);
  }

  function done() {
    setIsAnimating(false);
  }

  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNavToggle() {
    setIsNavOpened(!isNavOpened);
  }

  return (
    <header className="container">
      <div className="flex justify-between items-center flex-wrap gap-y-8 mt-12 mb-8 lg:mb-24">
        <Link href="/" passHref={true}>
          <a
            className="flex items-center relative group"
            onMouseEnter={start}
            onMouseLeave={done}
          >
            <span className="transform scale-100 group-hover:scale-110 transition-transform ease-out-cubic">
              <Lottie
                animationData={logoData}
                play={isAnimating}
                goTo={animationPosition}
                speed={0.7}
                className="h-16 w-16 xl:w-32 xl:h-32"
              />
            </span>
            <h1 className="text-3xl z-10 drop-shadow-xl mt-4">
              NieR Re[in]
              <p>Guide</p>
            </h1>
          </a>
        </Link>

        <button onClick={handleNavToggle} className="xl:hidden">
          <SVG src="/decorations/menu.svg" />
        </button>

        <nav
          className={classNames(
            "nav flex justify-center items-center w-full nav-is-closed xl:w-auto fixed inset-0 z-50 bg-pattern xl:relative xl:block",
            isNavOpened ? "nav-is-opened" : ""
          )}
        >
          <div className="bg-grey-lighter h-9/10 w-4/5 overflow-y-auto border border-beige-inactive xl:border-none xl:bg-transparent xl:overflow-hidden xl:h-full xl:w-full pointer-events-auto">
            <div className="flex justify-end mb-11 xl:hidden">
              <button onClick={handleNavToggle} className="mt-4 mr-4 xl:hidden">
                <SVG src="/decorations/menu-close.svg" />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-y-8 mx-12 xl:grid-cols-7 xl:gap-x-8 xl:mx-0">
              {NAVIGATION.map((nav) => (
                <li
                  key={nav.label}
                  className="nav-item xl:flex xl:justify-center xl:w-28"
                >
                  <Link href={nav.href} passHref={true}>
                    <a
                      className={classNames(
                        "flex flex-col items-center justify-center",
                        router.asPath === nav.href ? "active" : null,
                        router.asPath !== nav.href ? "inactive" : null
                      )}
                    >
                      <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-16 xl:w-16">
                        <Image
                          height={94}
                          width={94}
                          placeholder="blur"
                          src={nav.icon}
                          alt={`${nav.label} icon`}
                        />
                      </div>
                      <span className="text-lg mt-2 text-center font-display xl:text-xl xl:w-auto">
                        {nav.label}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <a
          href={GITHUB_REPO_LINK}
          title="Click to view the source code on GitHub"
          rel="noopener noreferrer"
          target="_blank"
          className="flex justify-center items-center gap-x-2 px-4 py-4 bg-beige text-black hover:bg-opacity-90 transition-colors w-full xl:max-w-xl xl:mx-auto"
        >
          <FiGithub />
          <span>Currently under heavy development (v{pkg.version})</span>
        </a>
      </div>
    </header>
  );
}
