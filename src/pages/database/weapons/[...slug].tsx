import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { Weapon } from "@models/types";
import Link from "next/link";
import SVG from "react-inlinesvg";
import urlSlug from "url-slug";
import { getAllWeapons, getSingleWeapon } from "@models/weapon";
import { sheets } from "@libs/s3";
import WeaponInfo from "@components/WeaponInfo";

interface DatabaseWeaponProps {
  weapon: Weapon;
}

export default function SingleWeapon({
  weapon,
}: DatabaseWeaponProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title={`${weapon.name.en} Weapon`}
        description={`${
          weapon.name.en
        } is a ${weapon.attribute.toLowerCase()} weapon.`}
        cover={`https://nierrein.guide/ui/weapon/wp${weapon.ids.asset}_full.png`}
      />

      <nav className="mb-16">
        <Link href="/database/weapons" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Weapons</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">{weapon.name.en}</h2>

        <WeaponInfo weapon={weapon} />
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const [, id] = context.params.slug;

  const [weapon, charactersSheet, weaponsSheet] = await Promise.all([
    getSingleWeapon(Number(id)),
    sheets.get("characters"),
    sheets.get("weapons"),
  ]);

  const characterMetadata = charactersSheet.find(
    (character) => character.weaponId === weapon.ids.base.toString()
  );

  const weaponMetadata = weaponsSheet.find(
    (sheetWeapon) => sheetWeapon.id === weapon.ids.base.toString()
  );

  return {
    props: {
      weapon: JSON.parse(
        JSON.stringify({
          ...weapon,
          metadata: {
            character: characterMetadata,
            weapon: weaponMetadata,
          },
        })
      ),
    },
  };
}
export async function getStaticPaths() {
  const allWeapons = await getAllWeapons();

  const paths = allWeapons.map((weapon) => ({
    params: {
      slug: [
        `${weapon.name.en ? urlSlug(weapon.name.en) : "unnamed"}`,
        `${weapon.ids.base}`,
      ],
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
