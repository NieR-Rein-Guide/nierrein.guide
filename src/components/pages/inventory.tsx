import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { CDN_URL } from "@config/constants";
import { CostumesGrid, CostumesTable } from "@components/pages/costumes";
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
import { WeaponsGrid, WeaponsTable } from "@components/pages/weapons";
import Radio from "@components/form/Radio";

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

  /**
   * Using a state and useEffect here because Next.js is
   * complaining about differences between Server/Client
   * And cause rehydration issues that breaks the layout.
   */
  const [displayType, setDisplayType] = useState("table");
  const databaseDisplayType = useSettingsStore(
    (state) => state.databaseDisplayType
  );
  const setDatabaseDisplayType = useSettingsStore(
    (state) => state.setDatabaseDisplayType
  );

  useEffect(() => {
    setDisplayType(databaseDisplayType);
  }, [databaseDisplayType]);

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
    <>
      <div className="flex gap-x-4 mt-6 mb-8">
        <Radio
          name="Table"
          value="table"
          isChecked={databaseDisplayType === "table"}
          setState={setDatabaseDisplayType}
          labelClassname="inline-block text-center md:w-24"
        />
        <Radio
          name="Library"
          value="grid"
          isChecked={databaseDisplayType === "grid"}
          setState={setDatabaseDisplayType}
          labelClassname="inline-block text-center md:w-24"
        />
      </div>
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
            {displayType === "table" && (
              <CostumesTable
                key="table"
                title={`${filteredCostumes.length}/${costumes.length} costumes in your inventory.`}
                costumes={filteredCostumes}
                abilitiesLookup={abilitiesLookup}
                charactersLookup={charactersLookup}
                showUnreleasedContent={showUnreleasedContent}
              />
            )}

            {displayType === "grid" && (
              <CostumesGrid
                key="grid"
                isLibrary={true}
                costumes={costumes.sort(
                  (a, b) => a.character_id - b.character_id
                )}
                abilitiesLookup={abilitiesLookup}
                charactersLookup={charactersLookup}
                showUnreleasedContent={showUnreleasedContent}
              />
            )}
          </TabPanel>
          <TabPanel>
            {displayType === "table" && (
              <WeaponsTable
                title={`${filteredWeapons.length}/${weapons.length} weapons in your inventory.`}
                key="table"
                weapons={filteredWeapons}
                showUnreleasedContent={showUnreleasedContent}
                abilitiesLookup={abilitiesLookup}
              />
            )}

            {displayType === "grid" && (
              <WeaponsGrid
                key="grid"
                isLibrary={true}
                weapons={weapons.sort((a, b) => {
                  return a.weapon_id - b.weapon_id;
                })}
                showUnreleasedContent={showUnreleasedContent}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
