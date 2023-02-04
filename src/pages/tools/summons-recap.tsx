import Layout from "@components/Layout";
import Meta from "@components/Meta";
import WeaponThumbnail from "@components/WeaponThumbnail";
import CostumeThumbnail from "@components/CostumeThumbnail";
import SVG from "react-inlinesvg";
import { memo, useRef } from "react";
import { toJpeg } from "html-to-image";
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
import Link from "next/link";
import { getAllCostumes } from "@models/costume";
import { useSettingsStore } from "../../store/settings";
import { getAllWeapons } from "@models/weapon";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import { useState } from "react";
import CostumeSelect from "@components/characters/CostumeSelect";
import WeaponSelect from "@components/weapons/WeaponSelect";

interface SummonsRecapProps {
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
}

export default function SummonsRecap({
  costumes,
  weapons,
}: SummonsRecapProps): JSX.Element {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  const imageContainer = useRef(null);
  const [summonedCostumes, setSummonedCostumes] = useState([]);
  const [summonedWeapons, setSummonedWeapons] = useState([]);

  const allCostumes = costumes.filter((costume) => {
    if (showUnreleasedContent) return true;
    return new Date() > new Date(costume.release_time);
  });

  const allWeapons = weapons.filter((weapon) => {
    if (showUnreleasedContent) return true;
    return new Date() > new Date(weapon.release_time);
  });

  const selectCostumes = [...allCostumes].sort(
    (a, b) => -b.character.name.localeCompare(a.character.name)
  );

  const selectWeapons = [...allWeapons].sort(
    (a, b) => -b.weapon_type.localeCompare(a.weapon_type)
  );

  function addCostume(costume) {
    setSummonedCostumes([...summonedCostumes, costume]);
  }
  function addWeapon(weapon) {
    setSummonedWeapons([...summonedWeapons, weapon]);
  }

  function removeCostume(index) {
    const newState = [...summonedCostumes];
    newState.splice(index, 1);

    setSummonedCostumes(newState);
  }
  function removeWeapon(index) {
    const newState = [...summonedWeapons];
    newState.splice(index, 1);

    setSummonedWeapons(newState);
  }

  async function save() {
    if (!imageContainer.current) return;
    const dataUrl = await toJpeg(imageContainer.current);
    const link = document.createElement("a");
    link.download = `my-nier-reincarnation-pulls-${new Date().toISOString()}.jpeg`;
    link.href = dataUrl;
    link.click();
  }

  return (
    <Layout>
      <Meta
        title="Summons recap"
        description="Select what you pulled."
        cover="https://nierrein.guide/tools/summons-recap.jpg"
      />

      <nav className="mb-8">
        <Link href="/tools" passHref={true} className="btn">

          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Tools</span>

        </Link>
      </nav>

      <div className="flex justify-center mb-8">
        <button className="btn" onClick={save}>
          Save image
        </button>
      </div>

      <div
        ref={imageContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
      >
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 bg-grey-foreground p-4 border border-beige border-opacity-70">
          {summonedCostumes.map((costume, index) => (
            <CostumeThumbnail
              onClick={() => removeCostume(index)}
              key={costume.costume_id}
              src={`${CDN_URL}${costume.image_path_base}battle.png`}
              alt={`${costume.title} thumbnail`}
              rarity={RARITY[costume.rarity]}
              weaponType={costume.weapon_type}
            />
          ))}

          {summonedCostumes.length === 0 && (
            <img
              src="/decorations/costume_empty_standard.png"
              alt="Select costumes below."
            />
          )}
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 bg-grey-foreground p-4 border border-beige border-opacity-70">
          {summonedWeapons.map((weapon, index) => (
            <WeaponThumbnail
              onClick={() => removeWeapon(index)}
              key={weapon.costume_id}
              element={weapon.attribute}
              rarity={weapon.rarity}
              type={weapon.weapon_type}
              isDark={weapon.is_ex_weapon}
              alt={weapon.name}
              image_path={weapon.image_path}
            />
          ))}

          {summonedWeapons.length === 0 && (
            <img
              src="/decorations/weapon_empty_standard.png"
              alt="Select weapons below."
            />
          )}
        </div>
      </div>

      <Selection
        allCostumes={allCostumes}
        allWeapons={allWeapons}
        addCostume={addCostume}
        addWeapon={addWeapon}
        selectCostumes={selectCostumes}
        selectWeapons={selectWeapons}
      />
    </Layout>
  );
}

const Selection = memo(function SummonSelection({
  allCostumes,
  allWeapons,
  addCostume,
  addWeapon,
  selectCostumes,
  selectWeapons,
}) {
  return (
    <>
      <div className="relative mb-12 md:hidden">
        <SVG
          className="h-8 absolute left-1/2 transform -translate-x-1/2 -rotate-90"
          src="/decorations/arrow.svg"
        />
      </div>
      <div className="grid-cols-1 md:grid-cols-2 gap-4 mb-12 hidden md:grid">
        <div className="relative">
          <SVG
            className="h-8 absolute left-1/2 transform -translate-x-1/2 -rotate-90"
            src="/decorations/arrow.svg"
          />
        </div>
        <div className="relative">
          <SVG
            className="h-8 absolute left-1/2 transform -translate-x-1/2 -rotate-90"
            src="/decorations/arrow.svg"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CostumeSelect
          classes="w-full"
          costumes={selectCostumes}
          onSelect={(e, value) => {
            if (!value) return;
            addCostume(value);
          }}
          label="Add a costume..."
        />
        <WeaponSelect
          classes="w-full"
          weapons={selectWeapons}
          onSelect={(e, value) => {
            if (!value) return;
            addWeapon(value);
          }}
          label="Add a weapon..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 bg-grey-foreground p-4 h-96 overflow-y-auto border border-beige border-opacity-70">
          {allCostumes.map((costume) => (
            <CostumeThumbnail
              onClick={() => addCostume(costume)}
              key={costume.costume_id}
              src={`${CDN_URL}${costume.image_path_base}battle.png`}
              alt={`${costume.title} thumbnail`}
              rarity={RARITY[costume.rarity]}
              weaponType={costume.weapon_type}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 bg-grey-foreground p-4 h-96 overflow-y-auto border border-beige border-opacity-70">
          {allWeapons.map((weapon) => (
            <WeaponThumbnail
              onClick={() => addWeapon(weapon)}
              key={weapon.costume_id}
              element={weapon.attribute}
              rarity={weapon.rarity}
              type={weapon.weapon_type}
              isDark={weapon.is_ex_weapon}
              alt={weapon.name}
              image_path={weapon.image_path}
            />
          ))}
        </div>
      </div>
    </>
  );
});

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
      })
    ),
  };
}
