import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Image from "next/image";
import Link from "next/link";

import loadoutImg from "../../../public/tools/loadout.jpg";
import xpImg from "../../../public/tools/xp.jpg";
import materialsImg from "../../../public/tools/materials.jpg";
import staminaImg from "../../../public/tools/stamina.jpg";

export default function Database(): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Tools"
        description="Some tools."
        cover="https://nierrein.guide/cover-tools.jpg"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Link href="/todolist">
          <a className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-4 transform transition-transform ease-out-cubic hover:scale-105">
            <Image
              height={350}
              width={200}
              layout="fill"
              objectFit="cover"
              className="-z-1 filter brightness-50"
              src={staminaImg}
              alt="Loadout thumbnail"
            />
            <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
              Stamina calc
            </h3>
          </a>
        </Link>

        <Link href="/tools">
          <a className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-4 transform transition-transform ease-out-cubic hover:scale-105">
            <Image
              height={350}
              width={200}
              layout="fill"
              objectFit="cover"
              className="-z-1 filter brightness-50"
              src={loadoutImg}
              alt="Loadout thumbnail"
            />
            <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
              Loadout builder (WIP)
            </h3>
          </a>
        </Link>

        <Link href="/tools">
          <a className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-4 transform transition-transform ease-out-cubic hover:scale-105">
            <Image
              height={350}
              width={200}
              layout="fill"
              objectFit="cover"
              className="-z-1 filter brightness-50"
              src={materialsImg}
              alt="Materials thumbnail"
            />
            <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
              Materials calc (WIP)
            </h3>
          </a>
        </Link>

        <Link href="/tools">
          <a className="flex justify-center items-center px-4 py-2 h-24 md:h-52 relative z-10 border-4 transform transition-transform ease-out-cubic hover:scale-105">
            <Image
              height={350}
              width={200}
              layout="fill"
              objectFit="cover"
              className="-z-1 filter brightness-50"
              src={xpImg}
              alt="Xp thumbnail"
            />
            <h3 className="text-4xl md:text-5xl font-bold tracking-wider text-beige text-shadow">
              Xp calc (WIP)
            </h3>
          </a>
        </Link>
      </div>
    </Layout>
  );
}
