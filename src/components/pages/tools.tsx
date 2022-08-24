import Image from "next/image";
import Link from "next/link";

function ListingTools() {
  return (
    <>
      <Link href="/tools/loadout-builder">
        <a className="md:col-span-2 flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">
          <Image
            height={350}
            width={200}
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
            src="/tools/loadout.jpg"
            alt="Loadout thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow text-center">
            Loadout builder
          </h3>
        </a>
      </Link>

      <Link href="/todolist">
        <a className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">
          <Image
            height={350}
            width={200}
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
            src="/tools/stamina.jpg"
            alt="Loadout thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow text-center">
            Todolist
          </h3>
        </a>
      </Link>

      <a
        href="https://billycool.github.io/NierReinGachaSimulator/"
        rel="noreferrer noopener"
        className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105"
      >
        <Image
          height={350}
          width={200}
          layout="fill"
          objectFit="cover"
          className="-z-1 filter brightness-50"
          src="/tools/summons.jpg"
          alt="Summons thumbnail"
        />
        <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow text-center">
          Gacha simulator <small>(External website)</small>
        </h3>
      </a>

      <Link href="/tools/materials">
        <a className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">
          <Image
            height={350}
            width={200}
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
            src="/tools/materials.jpg"
            alt="Materials thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow text-center max-w-xs">
            EX weapons materials calc
          </h3>
        </a>
      </Link>

      <Link href="/tools/xp-calc">
        <a className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-2 border-beige-text border-opacity-60 transform transition-transform ease-out-cubic hover:scale-105">
          <Image
            height={350}
            width={200}
            layout="fill"
            objectFit="cover"
            className="-z-1 filter brightness-50"
            src="/tools/xp.jpg"
            alt="Xp thumbnail"
          />
          <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow text-center">
            XP calc
          </h3>
        </a>
      </Link>
    </>
  );
}

export default ListingTools;
