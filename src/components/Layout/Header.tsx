import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { NAVIGATION } from "config/constants";

export default function Header() {
  const router = useRouter();

  return (
    <header className="container">
      <div className="flex flex-col justify-center items-center flex-wrap gap-y-8 px-8 py-6">
        <Link href="/" passHref={true}>
          <a className="logo flex items-center">
            <img className="h-20 mr-4" src="/logo-256.png" alt="gem" />
            <h1 className="text-3xl text-center">NieR Re[in] Guide</h1>
          </a>
        </Link>

        <nav className="nav">
          <ul>
            {NAVIGATION.map((nav) => (
              <li key={nav.label} className="nav-item w-28">
                <Link href={nav.href} passHref={true}>
                  <a
                    className={classNames(
                      "inline-flex flex-col items-center",
                      router.asPath === nav.href ? "active" : null
                    )}
                  >
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
  );
}
