import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";

const storiesImg = "/database/stories.jpg";
const assetsImg = "/database/assets.jpg";
const emblemsImg = "/database/emblems.jpg";
const memoirsImg = "/database/memoirs.jpg";
const companionsImg = "/database/companions.jpg";
const debrisImg = "/database/debris.jpg";
const noticesImg = "/database/notices.jpg";
const eventsImg = "/database/events.jpg";
const abilitiesImg = "/database/abilities.jpg";

export default function Database(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Database"
        description="3D Model viewer, Stories, Assets and Artworks"
        cover="https://nierrein.guide/cover-database.jpg"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Link
          href="/database/abilities"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={abilitiesImg}
            alt="Abilties thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Abilities
          </h3>

        </Link>

        <Link
          href="/database/memoirs"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={memoirsImg}
            alt="Memoirs thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Memoirs
          </h3>

        </Link>

        <Link
          href="/database/companions"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={companionsImg}
            alt="Companions thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Companions
          </h3>

        </Link>

        <Link
          href="/database/debris"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={debrisImg}
            alt="Debris thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Debris
          </h3>

        </Link>

        <Link
          href="/notices"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={noticesImg}
            alt="Notices thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            In-game notices
          </h3>

        </Link>

        <Link
          href="/events"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={eventsImg}
            alt="Events thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Events
          </h3>

        </Link>

        <Link
          href="/database/stories/costumes"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={storiesImg}
            alt="Stories thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Stories
          </h3>

        </Link>

        <Link
          href="/database/assets"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={assetsImg}
            alt="Assets thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Assets
          </h3>

        </Link>

        <Link
          href="/database/emblems"
          className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">

          <img
            height={350}
            width={200}
            className="-z-1 filter brightness-50 object-cover"
            src={emblemsImg}
            alt="Emblems thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
            Emblems
          </h3>

        </Link>
      </div>
    </Layout>
  );
}
