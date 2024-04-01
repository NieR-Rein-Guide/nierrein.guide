import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Image from "next/legacy/image";
import Link from "next/link";

import storiesImg from "../../public/database/stories.jpg";
import assetsImg from "../../public/database/assets.jpg";
import emblemsImg from "../../public/database/emblems.jpg";
import memoirsImg from "../../public/database/memoirs.jpg";
import companionsImg from "../../public/database/companions.jpg";
import debrisImg from "../../public/database/debris.jpg";
import noticesImg from "../../public/database/notices.jpg";
import eventsImg from "../../public/database/events.jpg";
import abilitiesImg from "../../public/database/abilities.jpg";

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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
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
