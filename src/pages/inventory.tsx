import Layout from "@components/Layout";
import Meta from "@components/Meta";

import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
  emblem,
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import { getAllCostumes } from "@models/costume";
import { getAllWeapons } from "@models/weapon";
import DatabaseNavbar from "@components/DatabaseNavbar";
import Inventory from "@components/pages/inventory";

interface InventoryProps {
  costumes: (costume & {
    costume_ability_link: (costume_ability_link & {
      costume_ability: costume_ability;
    })[];
    costume_skill_link: (costume_skill_link & {
      costume_skill: costume_skill;
    })[];
    costume_stat: costume_stat[];
    character: character;
    emblem: emblem;
  })[];
  weapons: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
  abilitiesLookup;
  charactersLookup;
  weaponsAbilitiesLookup;
}

export default function InventoryPage({
  costumes,
  weapons,
  abilitiesLookup,
  charactersLookup,
  weaponsAbilitiesLookup,
}: InventoryProps): JSX.Element {
  return (
    <Layout hasContainer={false} className="overflow-x-auto">
      <Meta
        title="Inventory"
        description="Display your costumes/weapons inventory and sort/filter them."
        cover="https://nierrein.guide/cover-inventory.jpg"
      />

      <section className="mx-auto p-4 md:p-8">
        <Inventory
          costumes={costumes}
          weapons={weapons}
          abilitiesLookup={abilitiesLookup}
          charactersLookup={charactersLookup}
          weaponsAbilitiesLookup={weaponsAbilitiesLookup}
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const [costumesData, weaponsData] = await Promise.all([
    getAllCostumes({
      orderBy: {
        release_time: "desc",
      },
    }),
    getAllWeapons(),
  ]);

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes: costumesData.costumes,
        weapons: weaponsData.weapons,
        abilitiesLookup: costumesData.abilitiesLookup,
        charactersLookup: costumesData.charactersLookup,
        weaponsAbilitiesLookup: weaponsData.abilitiesLookup,
      })
    ),
  };
}
