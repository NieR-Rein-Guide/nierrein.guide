import { FOOTER_NAVIGATION, OUR_SOCIALS } from "config/constants";
import SVG from "react-inlinesvg";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-center w-full pt-14 relative overflow-hidden">
      <SVG
        src="/decorations/c_rect_outside.svg"
        className="hidden lg:block absolute -top-64 transform max-w-7xl pointer-events-none"
      />
      <SVG
        src="/decorations/c_rect_inside.svg"
        className="hidden lg:block absolute -top-64 transform max-w-7xl pointer-events-none"
      />

      <div className="container">
        <div className="flex justify-center mt-32 mb-8">
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
        </div>
        <div className="flex gap-x-8 justify-center max-w-xl mx-auto">
          {OUR_SOCIALS.map((social) => (
            <Link
              href={social.href}
              key={social.label}
              passHref
              className="flex items-center justify-center text-grey-lighte transition-colors no-underline h-12 w-12 text-grey-lighter bg-beige-inactive rounded-full hover:text-beige-inactive hover:bg-grey-lighter"
            >
              {social.icon}
            </Link>
          ))}
        </div>

        <div className="flex gap-x-8 justify-center mt-8 max-w-xl mx-auto">
          {FOOTER_NAVIGATION.map((social) => (
            <Link
              href={social.href}
              key={social.label}
              passHref
              className="flex text-beige text-center hover:text-beige-accent transition-colors no-underline"
            >
              {social.label}
            </Link>
          ))}
        </div>

        <div className="font-display text-xl text-center my-16 md:mt-12">
          <p className="max-w-md mx-auto">
            NieR Re[in] Guide is not affiliated with or endorsed by SQUARE ENIX
            CO. LTD. neither by Applibot,Inc.
          </p>
          <p>
            All game assets used belongs to © SQUARE ENIX CO. LTD. and Applibot,
            Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
