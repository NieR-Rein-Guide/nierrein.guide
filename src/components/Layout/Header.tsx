import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "config/constants";
import Lottie from "react-lottie-player";
import logoData from "../../lottie/logo.json";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import SettingsModal from "@components/SettingsModal";
import { Modal } from "@mui/material";
import { BiDonateHeart } from "react-icons/bi";
import { ITEMS } from "@components/DatabaseNavbar";
import { CurrentRelease } from "@components/Header/CurrentVersion";

export default function Header(): JSX.Element {
  const [isWhySupportModalOpen, setIsWhySupportModalOpen] = useState(false);
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
      <div className="absolute xl:fixed right-0 left-0 top-0 mx-auto z-50">
        <div className="relative flex justify-start md:justify-center items-center gap-x-2 px-4 py-2 bg-grey-lighter text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50">
          <div className="hidden absolute left-4 md:flex items-center">
            <a
              className=""
              href="https://ko-fi.com/A0A35V520"
              target="_blank"
              rel="noreferrer"
            >
              <img
                height="36"
                className="border-none h-8"
                src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>

            <button
              onClick={() => setIsWhySupportModalOpen(true)}
              className="inline-block ml-2 underline text-xs"
            >
              why?
            </button>

            <Modal
              open={isWhySupportModalOpen}
              onClose={() => setIsWhySupportModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="bg-grey-dark p-8 absolute border border-beige border-opacity-50 top-0 left-0 md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-3xl space-y-8 overflow-y-auto pt-12 md:pt-8 max-h-screen">
                <div className="flex items-center justify-between mb-4 pt-12">
                  <h3 className="flex items-center gap-x-2 text-3xl">
                    <BiDonateHeart /> Why donate?
                  </h3>
                  <button
                    className="btn"
                    onClick={() => setIsWhySupportModalOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <p>
                  I have been maintaining this website since August 18 2021, and
                  didn't want to put ads since then.
                </p>
                <p>
                  I don't mind paying for the hosting of all the services that
                  make this site work but these last months are particularly
                  complicated for me and I would like to reduce the expenses of
                  my personal projects, that's why I'm putting this ko-fi link
                  publicly as of now.
                </p>
                <p>
                  I am sorry if that bothers some of you. Hope the website is
                  useful to you! {"<3"}
                </p>
                <p>Here are some expenses for all services I maintain:</p>
                <p className="font-display text-xl">
                  Monthly hosting expense (total includes other side projects)
                </p>
                <img
                  src="/images/donating-modal/railway.png"
                  alt="Railway"
                ></img>
                <p className="font-display text-xl">
                  Monthly assets expense (including 3D models)
                </p>
                <img src="/images/donating-modal/wasabi.png" alt="Wasabi"></img>
              </div>
            </Modal>
          </div>

          <span className="text-xs md:text-base">
            <CurrentRelease />
          </span>

          <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-50">
            <SettingsModal />
          </div>
        </div>
      </div>

      <header className="container relative">
        <div className="flex justify-between items-center flex-wrap gap-y-8 mt-12 xl:mt-20 mb-12">
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
                  className="h-16 w-16"
                />
              </span>
              <h1 className="text-3xl z-10 drop-shadow-xl mt-2 lg:mt-4">
                NieR Re[in]
                <p className="inline lg:block">Guide</p>
              </h1>
            </a>
          </Link>

          <button onClick={handleNavToggle} className="xl:hidden">
            <SVG src="/decorations/menu.svg" />
          </button>

          <nav className="hidden xl:block nav justify-center items-center w-full nav-is-closed xl:w-auto inset-0 bg-pattern relative transform">
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
      </header>

      <nav
        className={classNames(
          "xl:flex flex-col gap-y-3 xl:flex-row justify-center gap-x-6 w-full relative bg-grey-dark border-y py-4 border-beige border-opacity-50 -mt-8 xl:mt-0 mb-16 transition ease-out-cubic transform origin-top xl:scale-y-100 xl:max-h-full px-4 xl:px-0",
          isNavOpened ? "flex" : "hidden"
        )}
      >
        <div className="grid grid-cols-3 gap-4 xl:hidden">
          {NAVIGATION.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={classNames(
                  "group flex gap-x-2 items-center transition ease-out-cubic hover:text-white",
                  router.asPath === item.href
                    ? "text-white pointer-events-none"
                    : "text-beige"
                )}
              >
                <Image
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
              </a>
            </Link>
          ))}
        </div>
        <div className="xl:hidden mt-4 pt-2 border-t border-beige border-opacity-50">
          <h3 className="text-beige text-xl text-center">Database</h3>
        </div>
        {ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={classNames(
                "group flex gap-x-2 items-center transition ease-out-cubic hover:text-white",
                router.asPath === item.href
                  ? "text-white pointer-events-none"
                  : "text-beige"
              )}
            >
              <Image
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
            </a>
          </Link>
        ))}
      </nav>
    </>
  );
}
