import { CREDITS, FOOTER_NAVIGATION, OUR_SOCIALS } from "config/constants";
import SVG from "react-inlinesvg";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import ReactTooltip from "react-tooltip";

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
              <a className="flex text-beige hover:text-beige-accent transition-colors no-underline">
                {social.label}
              </a>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl text-center mt-8">
          {CREDITS.length} contri[b]utors
        </h2>
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 place-items-center relative mt-4 gap-y-2 max-w-4xl mx-auto">
          {CREDITS.map((credit) => {
            const CreditContent = (
              <div>
                <div data-tip data-for={credit.name}>
                  <Image
                    height="64"
                    width="64"
                    className="rounded-full"
                    src={`/credits/${slugify(credit.name, {
                      lower: true,
                    })}.png`}
                    alt={`NieR Avatar of ${credit.name}`}
                    loading="lazy"
                  />
                </div>

                <ReactTooltip
                  id={credit.name}
                  aria-haspopup="true"
                  className="tierlist-tooltip"
                  effect="solid"
                  place="top"
                  multiline
                >
                  <p>{credit.name}</p>
                </ReactTooltip>
              </div>
            );

            if (credit.link) {
              return (
                <Link href={credit.link} key={credit.name}>
                  <a className="rounded-full shadow-border transform transition-transform hover:-translate-y-1">
                    {CreditContent}
                  </a>
                </Link>
              );
            }

            return CreditContent;
          })}
        </div>

        <div className="font-display text-xl md:text-2xl text-center my-16 md:mt-24">
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
