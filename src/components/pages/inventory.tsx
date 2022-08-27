import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { CDN_URL } from "@config/constants";
import { CostumesTable } from "@components/pages/costumes";
import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import TierListTab from "@components/tierlist/TierListTab";

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
import { useSettingsStore } from "../../store/settings";
import { useInventoryStore } from "@store/inventory";
import { useEffect, useState } from "react";
import { WeaponsTable } from "@components/pages/weapons";
import { useRouter } from "next/router";

const TABS = [
  {
    index: 0,
    label: "Costumes",
  },
  {
    index: 1,
    label: "Weapons",
  },
];

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

export default function Inventory({
  costumes,
  weapons,
  abilitiesLookup,
  charactersLookup,
  weaponsAbilitiesLookup,
}: InventoryProps) {
  const router = useRouter();

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  /**
   * Inventory
   */
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const ownedWeapons = useInventoryStore((state) => state.weapons);

  const [filteredCostumes, setFilteredCostumes] = useState([]);
  const [filteredWeapons, setFilteredWeapons] = useState([]);

  // Tabs
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setFilteredCostumes(
      costumes.filter((cost) => {
        return ownedCostumes.includes(cost.costume_id);
      })
    );

    setFilteredWeapons(
      weapons.filter((weap) => {
        return ownedWeapons.includes(weap.weapon_id);
      })
    );
  }, [ownedCostumes, ownedWeapons]);

  return (
    <Tabs
      className="mt-4"
      defaultIndex={tabIndex}
      onChange={(index) => setTabIndex(index)}
    >
      <TabList className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
        {TABS.map((tab) => (
          <TierListTab key={tab.index} index={tab.index}>
            {tab.label}
          </TierListTab>
        ))}
      </TabList>

      <TabPanels>
        <TabPanel className="space-y-16">
          <CostumesTable
            title={`${filteredCostumes.length}/${costumes.length} costumes in your inventory.`}
            costumes={filteredCostumes}
            abilitiesLookup={abilitiesLookup}
            charactersLookup={charactersLookup}
            showUnreleasedContent={showUnreleasedContent}
            onRowClick={(event, costume) =>
              router.push(
                `/characters/${costume.character.slug}/${costume.slug}`
              )
            }
          />
        </TabPanel>
        <TabPanel>
          <WeaponsTable
            title={`${filteredWeapons.length}/${weapons.length} costumes in your inventory.`}
            weapons={filteredWeapons}
            abilitiesLookup={weaponsAbilitiesLookup}
            onRowClick={(event, weapon) =>
              router.push(`/weapons/${weapon.slug}`)
            }
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
