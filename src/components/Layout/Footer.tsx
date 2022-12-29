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
        <div className="flex gap-x-8 justify-center mt-32 max-w-xl mx-auto">
          {OUR_SOCIALS.map((social) => (
            <Link href={social.href} key={social.label} passHref>
              <a className="flex items-center justify-center text-grey-lighte transition-colors no-underline h-12 w-12 text-grey-lighter bg-beige-inactive rounded-full hover:text-beige-inactive hover:bg-grey-lighter">
                {social.icon}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex gap-x-8 justify-center mt-8 max-w-xl mx-auto">
          {FOOTER_NAVIGATION.map((social) => (
            <Link href={social.href} key={social.label} passHref>
              <a className="flex text-beige text-center hover:text-beige-accent transition-colors no-underline">
                {social.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="font-display text-xl text-center my-16 md:mt-12">
          <p>
            NieR Re[in] Guide is not affiliated with or endorsed by SQUARE ENIX
            CO. LTD.
          </p>
          <p>All game assets used belongs to © SQUARE ENIX CO. LTD.</p>
        </div>
      </div>
    </footer>
  );
}
