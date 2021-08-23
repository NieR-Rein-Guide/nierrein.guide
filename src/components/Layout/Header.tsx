import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../public/logo-256.png";
import { NAVIGATION } from "config/constants";

export default function Header(): JSX.Element {
  const router = useRouter();

  return (
    <header className="container">
      <div className="flex flex-col justify-center items-center flex-wrap gap-y-8 px-8 py-6">
        <Link href="/" passHref={true}>
          <a className="flex items-center relative group">
            <span className="h-20 w-20 mr-4 z-0 absolute -top-16 left-1/2 transform -translate-x-1/2 scale-100 group-hover:scale-110 transition-transform ease-out-cubic">
              <Image className="" src={logoImage} alt="Logo" />
            </span>
            <h1 className="text-3xl text-center z-10 drop-shadow-xl mt-4">
              NieR Re[in] Guide
            </h1>
          </a>
        </Link>

        <nav className="nav w-full lg:w-auto">
          <ul>
            {NAVIGATION.map((nav) => (
              <li
                key={nav.label}
                className="nav-item lg:flex lg:justify-center lg:w-28"
              >
                <Link href={nav.href} passHref={true}>
                  <a
                    className={classNames(
                      "flex items-center justify-center lg:flex-col",
                      router.asPath === nav.href ? "active" : null
                    )}
                  >
                    <Image
                      height={75}
                      width={75}
                      placeholder="blur"
                      src={nav.icon}
                      alt={`${nav.label} icon`}
                    />
                    <span className="w-44 mt-4 text-center serif text-2xl lg:text-xl lg:w-auto">
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
