import { CREDITS, DISCORD_URL } from "config/constants";
import Lines from "@components/decorations/Lines";
import Image from "next/image";
import mamaImg from "../../public/mama.png";
import slugify from "slugify";

export default function Credits(): JSX.Element {
  return (
    <section className="flex flex-col flex-wrap w-full credits">
      <h2 className="overlap">Credits</h2>

      <div className="px-8">
        <Lines className="mb-12" containerClass="justify-center mt-10 md:mt-0">
          <Image src={mamaImg} height={148} width={148} alt="Mama" />
        </Lines>

        <ul className="grid grid-cols-1 place-items-center sm:grid-cols-2 sm:place-items-start md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-8 md:mt-0">
          {CREDITS.map((credit) => (
            <Contributor key={credit.name} credit={credit} />
          ))}
        </ul>

        <p className="mt-8">
          If you are missing please let us know on our{" "}
          <a className="text-beige" href={DISCORD_URL}>
            Discord
          </a>{" "}
          !
        </p>
      </div>
    </section>
  );
}

function Contributor({ credit }): JSX.Element {
  const Content = (
    <li className="flex items-center gap-x-6 hover-bg w-full p-2">
      <Image
        height="64"
        width="64"
        className="h-16"
        src={`/credits/${slugify(credit.name, { lower: true })}.png`}
        alt={`NieR Avatar of ${credit.name}`}
        loading="lazy"
      />
      <span className="serif text-2xl w-44 lg:w-auto">{credit.name}</span>
    </li>
  );

  if (credit.link) {
    return (
      <a
        key={credit.name}
        href={credit.link}
        rel="noopener noreferrer"
        target="_blank"
        className="w-full"
      >
        {Content}
      </a>
    );
  }

  return <>{Content}</>;
}
