import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

import { NAVIGATION } from "config/constants";
import Lottie from "react-lottie-player";
import logoData from "../../lottie/logo.json";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
// import SettingsModal from "@components/Settings";
import { ITEMS } from "@components/DatabaseNavbar";

export default function Header(): JSX.Element {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const router = useRouter();
  const defaultAnimationPosition = 18;
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
    <>
      <div className="absolute xl:fixed right-0 left-0 top-0 mx-auto z-menu">
        <div className="relative flex gap-y-2 justify-start md:justify-center items-center px-4 py-2 bg-grey-lighter text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 divide-x divide-beige-inactive">
          <a
            href="https://nier.fandom.com/wiki/NieR_Reincarnation"
            className="text-xs md:text-base px-2 hover:underline"
          >
            NieR Wiki
          </a>
          <a
            href="https://accords-library.com/"
            className="text-xs md:text-base px-2 hover:underline"
          >
            Accord's Library
          </a>
          <a
            href="https://reinlibrary.neocities.org/"
            className="text-xs md:text-base px-2 hover:underline"
          >
            Re[in] Library
          </a>
          <a
            href="https://www.youtube.com/@BillyCoolGR/featured"
            className="text-xs md:text-base px-2 hover:underline"
          >
            BillyCool (YT)
          </a>
          <a
            href="https://www.youtube.com/@naotohex/videos"
            className="text-xs md:text-base px-2 hover:underline"
          >
            Naoto Hex (YT)
          </a>
        </div>
      </div>

      <header className="container relative">
        <div className="flex justify-between items-center flex-wrap gap-y-8 mt-12 mb-12">
          <Link
            href="/"
            passHref={true}
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
                className="h-16 w-16"
              />
            </span>
            <h1 className="text-3xl z-10 drop-shadow-xl mt-2 hidden lg:inline-block lg:mt-4">
              NieR Re[in]
              <p className="inline-flex items-center lg:flex gap-2">Guide</p>
            </h1>
          </Link>

          <nav className="hidden xl:block nav justify-center items-center w-full nav-is-closed xl:w-auto inset-0 relative transform">
            <div className="overflow-hidden h-full w-full pointer-events-auto">
              <div className="flex justify-end mb-11 xl:hidden">
                <button
                  onClick={handleNavToggle}
                  className="mt-4 mr-4 xl:hidden"
                >
                  <SVG src="/decorations/menu-close.svg" />
                </button>
              </div>
              <ul className="grid gap-y-8 grid-cols-5 mx-0">
                {NAVIGATION.map((nav) => (
                  <li key={nav.label} className="nav-item flex justify-center">
                    <Link
                      href={nav.href}
                      passHref={true}
                      className={classNames(
                        "flex flex-col items-center justify-center",
                        router.asPath === nav.href ? "active" : null,
                        router.asPath !== nav.href ? "inactive" : null
                      )}
                    >
                      <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-16 xl:w-16">
                        <img
                          height={94}
                          width={94}
                          placeholder="blur"
                          src={nav.icon}
                          alt={`${nav.label} icon`}
                        />
                      </div>
                      <span className="text-lg mt-2 text-center font-display xl:text-xl xl:w-28">
                        {nav.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex gap-x-2 xl:hidden">
            <button onClick={handleNavToggle}>
              <SVG src="/decorations/menu.svg" />
            </button>
          </div>
        </div>
      </header>

      <nav
        className={classNames(
          "xl:flex flex-col gap-y-3 xl:flex-row justify-center gap-x-6 w-full relative bg-grey-dark border-y py-4 border-beige border-opacity-50 -mt-8 xl:mt-0 mb-16 transition ease-out-cubic transform origin-top xl:scale-y-100 xl:max-h-full px-4 xl:px-0",
          isNavOpened ? "flex" : "hidden"
        )}
      >
        <div className="grid grid-cols-3 gap-4 xl:hidden">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={classNames(
                "group flex gap-x-2 items-center transition ease-out-cubic hover:text-white",
                router.asPath === item.href
                  ? "text-white pointer-events-none"
                  : "text-beige"
              )}
            >
              <img
                className={classNames(
                  "transition ease-out-cubic group-hover:opacity-100",
                  router.asPath === item.href ? "opacity-100" : "opacity-50"
                )}
                height={32}
                width={32}
                placeholder="blur"
                src={item.icon}
                alt={`${item.label} icon`}
              />
              <span className="text-lg text-center font-display xl:text-xl">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="xl:hidden mt-4 pt-2 border-t border-beige border-opacity-50">
          <h3 className="text-beige text-xl text-center">Database</h3>
        </div>
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={classNames(
              "group flex gap-x-2 items-center transition ease-out-cubic hover:text-white",
              router.asPath === item.href
                ? "text-white pointer-events-none"
                : "text-beige"
            )}
          >
            <img
              className={classNames(
                "transition ease-out-cubic group-hover:opacity-100",
                router.asPath === item.href ? "opacity-100" : "opacity-50"
              )}
              height={28}
              width={28}
              placeholder="blur"
              src={item.icon}
              alt={`${item.label} icon`}
            />
            <span className="text-lg text-center font-display xl:text-xl">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
