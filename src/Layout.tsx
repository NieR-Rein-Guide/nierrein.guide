import Link from "next/link";
import { CREDITS, NAVIGATION } from "../constants";

function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <header className="flex justify-between items-center flex-wrap gap-y-8 px-8 py-6">
        <Link href="/" passHref={true}>
          <a className="logo flex items-center">
            <img className="h-20 mr-4" src="/logo-256.png" alt="gem" />
            <h1 className="text-3xl">NieR Re[in] Guide</h1>
          </a>
        </Link>

        <nav className="flex">
          <ul className="nav flex flex-wrap gap-y-6">
            {NAVIGATION.map((nav) => (
              <li key={nav.label} className="nav-item w-28">
                <Link href={nav.href} passHref={true}>
                  <a className="inline-flex flex-col items-center">
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
      </header>

      <main className="container flex flex-col w-full flex-1">{children}</main>

      <footer className="flex flex-col items-center justify-center w-full py-14 border-t border-white border-opacity-20">
        <div className="container">
          <section className="flex flex-col flex-wrap mt-14 w-full">
            <h2>Wonderful people that are working on this website</h2>

            <ul className="grid grid-cols-1 md:grid-cols-4 gap-y-6">
              {CREDITS.map((credit) => (
                <li className="flex items-center gap-x-6" key={credit.name}>
                  <img
                    height="64"
                    width="64"
                    className="h-16"
                    src={`/credits/${credit.name.toLowerCase()}.png`}
                    alt={`NieR Avatar of ${credit.name}`}
                  />
                  <a
                    href={credit.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="serif text-2xl"
                  >
                    {credit.name}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-4">
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
