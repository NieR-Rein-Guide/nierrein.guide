import { CREDITS } from "config/constants";
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-14 border-t border-white border-opacity-20">
      <div className="container">
        <section className="flex flex-col flex-wrap mt-14 w-full">
          <h2>Wonderful people that are working on this website</h2>

          <ul className="grid grid-cols-1 place-items-center sm:grid-cols-2 sm:place-items-start md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            {CREDITS.map((credit) => (
              <li className="flex items-center gap-x-6" key={credit.name}>
                <Image
                  height="64"
                  width="64"
                  className="h-16"
                  src={`/credits/${credit.name.toLowerCase()}.png`}
                  alt={`NieR Avatar of ${credit.name}`}
                />
                {(credit.link && (
                  <a
                    href={credit.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="serif text-2xl"
                  >
                    {credit.name}
                  </a>
                )) || <span className="serif text-2xl">{credit.name}</span>}
              </li>
            ))}
          </ul>

          <p className="mt-8">
            If you are missing please let us know on our Discord !
          </p>
        </section>

        <div className="text-center mt-8">
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
