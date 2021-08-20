import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { CREDITS, NAVIGATION } from "../constants";

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

function Layout({ children, className }: LayoutProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <header className="container">
        <div className="flex flex-col justify-center items-center flex-wrap gap-y-8 px-8 py-6">
          <Link href="/" passHref={true}>
            <a className="logo flex items-center">
              <img className="h-20 mr-4" src="/logo-256.png" alt="gem" />
              <h1 className="text-3xl">NieR Re[in] Guide</h1>
            </a>
          </Link>

          <nav className="flex">
            <ul className="nav flex justify-center flex-wrap gap-y-6">
              {NAVIGATION.map((nav) => (
                <li key={nav.label} className="nav-item w-28">
                  <Link href={nav.href} passHref={true}>
                    <a className={classNames('inline-flex flex-col items-center', router.asPath === nav.href ? 'active' : null)}>
                      <div className="iso">
                        <img className="icon" src={nav.iconUrl} alt="icon" />
                      </div>
                      <span className="mt-4 text-center serif text-xl">
                        {nav.label}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className={classNames('container flex flex-col w-full flex-1', className)}>{children}</main>

      <footer className="flex flex-col items-center justify-center w-full py-14 border-t border-white border-opacity-20">
        <div className="container">
          <section className="flex flex-col flex-wrap mt-14 w-full">
            <h2>Wonderful people that are working on this website</h2>

            <ul className="grid grid-cols-2 place-items-center md:grid-cols-4 gap-y-6">
              {CREDITS.map((credit) => (
                <li className="flex items-center gap-x-6" key={credit.name}>
                  <img
                    height="64"
                    width="64"
                    className="h-16"
                    src={`/credits/${credit.name.toLowerCase()}.png`}
                    alt={`NieR Avatar of ${credit.name}`}
                  />
                  {credit.link && (
                    <a
                      href={credit.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="serif text-2xl"
                    >
                      {credit.name}
                    </a>
                  ) || (
                    <span className="serif text-2xl">{credit.name}</span>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-8">
              If you are missing please let us know on our Discord !
            </p>
          </section>

          <div className="text-center mt-8">
            <p>
              NieR Re[in] Guide is not affiliated with or endorsed by SQUARE
              ENIX CO. LTD.
            </p>
            <p>All game assets used belongs to © SQUARE ENIX CO. LTD.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
