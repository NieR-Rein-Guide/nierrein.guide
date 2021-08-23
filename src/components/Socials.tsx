import { RiRedditLine } from "react-icons/ri";

function Socials(): JSX.Element {
  return (
    <section className="w-full flex-grow p-8">
      <h2>Links</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-y-12 gap-6 mt-6">
        <li className="w-full text-center">
          <a
            className="flex flex-col gap-y-2 py-8 transition-colors rounded-md bg-white bg-opacity-0 hover:bg-opacity-10"
            href="https://discord.gg/swgHJJdt7f"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img className="max-h-8" src="/discord.svg" alt="Discord" />
            <span>Our Discord</span>
          </a>
        </li>
        <li className="w-full text-center">
          <a
            className="flex flex-col gap-y-2 py-8 transition-colors rounded-md bg-white bg-opacity-0 hover:bg-opacity-10 focus:bg-opacity-10"
            href="https://discord.gg/4QTuC6xR82"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img className="max-h-8" src="/discord.svg" alt="Discord" />
            <span>Official Discord</span>
          </a>
        </li>
        <li className="w-full text-center">
          <a
            className="flex flex-col gap-y-2 py-8 transition-colors rounded-md bg-white bg-opacity-0 hover:bg-opacity-10 focus:bg-opacity-10"
            href="https://discord.gg/MA4yhvF"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img className="max-h-8" src="/discord.svg" alt="Discord" />
            <span>Unofficial Discord</span>
          </a>
        </li>
        <li className="w-full text-center">
          <a
            className="flex flex-col gap-y-2 py-8 transition-colors rounded-md bg-white bg-opacity-0 hover:bg-opacity-10 focus:bg-opacity-10"
            href="https://www.reddit.com/r/NieRReincarnation/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <RiRedditLine size={32} />
            <span>/r/NieRReincarnation/</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Socials;
