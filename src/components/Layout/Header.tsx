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
import { RiTodoLine } from "react-icons/ri";
import { GITHUB_REPO_LINK } from "@config/constants";
import pkg from "../../../package.json";
import { useSpring, animated } from "react-spring";

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

  const expand = useSpring({
    config: { friction: 25 },
    transform: isNavOpened ? "translateY(0vh)" : "translateY(-100vh)",
  });

  const shrink = useSpring({
    config: { friction: 25 },
    transform: isNavOpened ? "scale(1)" : "scale(0.8)",
  });

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

  const firstNavRow = NAVIGATION.slice(0, 5);
  const secondNavRow = NAVIGATION.slice(5, NAVIGATION.length);

  return (
    <>
      <div className="absolute right-0 left-0 top-0 mx-auto z-50">
        <a
          href={GITHUB_REPO_LINK}
          title="Click to view the source code on GitHub"
          rel="noopener noreferrer"
          target="_blank"
          className="flex justify-center items-center gap-x-2 px-4 py-2 bg-grey-lighter text-beige hover:bg-opacity-90 transition-colors w-full border-b border-beige-inactive border-opacity-50"
        >
          <FiGithub />
          <span>Currently under heavy development (v{pkg.version})</span>
        </a>
      </div>
      <header className="container relative">
        <div className="flex justify-between items-center flex-wrap gap-y-8 mt-12 mb-16 xl:mb-24 xl:mt-24">
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
                  className="h-16 w-16 xl:w-42 xl:h-42"
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

          <nav className="hidden xl:block nav justify-center items-center w-full nav-is-closed xl:w-auto inset-0 z-50 bg-pattern relative transform">
            <div className="overflow-hidden h-full w-full pointer-events-auto">
              <div className="flex justify-end mb-11 xl:hidden">
                <button
                  onClick={handleNavToggle}
                  className="mt-4 mr-4 xl:hidden"
                >
                  <SVG src="/decorations/menu-close.svg" />
                </button>
              </div>
              <ul className="grid gap-y-8 grid-cols-5 mx-0 mb-6">
                {firstNavRow.map((nav) => (
                  <li key={nav.label} className="nav-item flex justify-center">
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
                        <span className="text-lg mt-2 text-center font-display xl:text-xl xl:w-28">
                          {nav.label}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="grid gap-y-8 grid-cols-4 ml-12 mx-12">
                {secondNavRow.map((nav) => (
                  <li key={nav.label} className="nav-item flex justify-center">
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
                        <span className="text-lg mt-2 text-center font-display xl:text-xl xl:w-28">
                          {nav.label}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <animated.nav
          style={expand}
          className={classNames(
            "nav flex justify-center items-center w-full nav-is-closed xl:w-auto fixed inset-0 z-50 bg-pattern xl:relative xl:block transform"
          )}
        >
          <animated.div
            style={shrink}
            className="bg-grey-lighter h-9/10 w-4/5 overflow-y-auto border border-beige-inactive xl:border-none xl:bg-transparent xl:hidden pointer-events-auto"
          >
            <div className="flex justify-end mb-11 xl:hidden">
              <button onClick={handleNavToggle} className="mt-4 mr-4 xl:hidden">
                <SVG src="/decorations/menu-close.svg" />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-y-8 mx-12 xl:grid-cols-7 xl:mx-0">
              {NAVIGATION.map((nav) => (
                <li
                  key={nav.label}
                  className="nav-item xl:flex xl:justify-center"
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
                      <span className="text-lg mt-2 text-center font-display xl:text-xl xl:w-28">
                        {nav.label}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </animated.div>
        </animated.nav>
      </header>
    </>
  );
}
