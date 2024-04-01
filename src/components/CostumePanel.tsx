import useSWR from "swr";
import LoadingIcon from "@components/LoadingIcon";
import { usePanelStore } from "@store/panels";
import { FiArrowDownCircle, FiArrowUpCircle, FiXCircle } from "react-icons/fi";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
  debris,
  emblem,
  weapon,
} from "@prisma/client";
import { Event } from "@models/types";
import Image from "next/legacy/image";
import weaponsIcons from "@utils/weaponsIcons";
import classNames from "classnames";
import { CDN_URL } from "@config/constants";
import CostumeThumbnail from "./CostumeThumbnail";
import StatDisplay from "./StatDisplay";
import Ability from "./Ability";
import slug from "slugg";
import SVG from "react-inlinesvg";
import { useState } from "react";
import { Gauge } from "./Gauge";
import { useInventoryStore } from "@store/inventory";
import Checkbox from "./form/Checkbox";
import { fetcher } from "@utils/fetcher";
import getCostumeLevelsByRarity from "@utils/getCostumeLevelsByRarity";
import { useSettingsStore } from "@store/settings";

type CostumeData = costume & {
  costume_ability_link: (costume_ability_link & {
    costume_ability: costume_ability;
  })[];
  costume_skill_link: (costume_skill_link & {
    costume_skill: costume_skill;
  })[];
  costume_stat: costume_stat[];
  character: character;
  sources: Event[];
  weapon: weapon;
  debris: debris;
  emblem: emblem;
};

/**
 * Costume display
 * Client side fetching
 */
export function CostumePanel({ costumeId }) {
  const {
    data: costume,
    error,
    isLoading,
  } = useSWR<CostumeData>(`/api/costume/${costumeId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const closePanel = usePanelStore((state) => state.addCostume);

  const toggleFromInventory = useInventoryStore((state) => state.toggleCostume);
  const ownedCostumes = useInventoryStore((state) => state.costumes);

  const awakeningLevel = useSettingsStore((state) => state.awakeningLevel);
  const isExalted = useSettingsStore((state) => state.isExalted);

  const { maxWithAsc } = getCostumeLevelsByRarity(costume?.rarity);
  const selectedLevel = maxWithAsc + (isExalted ? 10 : 0);
  const stats = costume?.costume_stat
    ?.filter((stat) => stat.level === selectedLevel)
    ?.sort((a, b) => a.awakening_step - b.awakening_step);

  return (
    <div
      className={classNames(
        "costume-panel relative h-full bg-grey-dark border border-beige border-opacity-50 rounded-tl-3xl rounded-tr-3xl p-4 max-w-sm overflow-y-auto",
        isCollapsed ? "max-h-24" : "max-h-[550px]"
      )}
    >
      <button
        onClick={() => closePanel(costumeId)}
        className="bg-brown p-2 absolute top-2 right-2 rounded-full z-50"
      >
        <FiXCircle />
      </button>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-brown p-2 absolute top-2 right-12 rounded-full z-50"
      >
        {isCollapsed ? <FiArrowUpCircle /> : <FiArrowDownCircle />}
      </button>

      {isLoading && (
        <div className="flex justify-center items-center">
          <LoadingIcon />
        </div>
      )}

      {error && <p>{JSON.stringify(error)}</p>}

      {costume && (
        <div className="flex flex-col gap-y-2 relative">
          <div className="flex w-64">
            <CostumeThumbnail
              href={`/characters/${costume.character.slug}/${costume.slug}`}
              src={`${CDN_URL}${costume.image_path_base}standard.png`}
              alt={costume.title}
              weaponType={costume.weapon_type}
              rarity={costume.rarity}
              isDark={costume.is_ex_costume}
            />
            <div className="flex flex-col gap-x-2 ml-2">
              <span className="inline-flex items-center gap-x-2">
                <span className="inline-block w-8">
                  <img
                    layout="responsive"
                    src={weaponsIcons[costume.weapon_type]}
                    alt={costume.weapon_type}
                  />
                </span>
                <span className="uppercase px-2 text-black bg-beige">
                  {costume.character.name}
                </span>
              </span>
              <span className="text-sm text-beige">{costume.title}</span>
              <div className="flex items-center mt-2">
                <Checkbox
                  label={
                    ownedCostumes.includes(costume.costume_id)
                      ? "Owned"
                      : "Owned?"
                  }
                  isChecked={ownedCostumes.includes(costume.costume_id)}
                  setState={() => toggleFromInventory(costume.costume_id)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2">
            <StatDisplay type="hp" value={stats[awakeningLevel].hp} />
            <StatDisplay type="atk" value={stats[awakeningLevel].atk} />
            <StatDisplay type="vit" value={stats[awakeningLevel].vit} />
            <StatDisplay type="agi" value={stats[awakeningLevel].agi} />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex items-center my-1">
              <div className="relative mr-4">
                <SVG src="/decorations/frame.svg" className="h-16 w-16" />
                <div className="h-8 w-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    layout="fixed"
                    width={32}
                    height={32}
                    alt=""
                    src={`${CDN_URL}${costume.costume_skill_link[0].costume_skill.image_path}`}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start text-xs">
                <Gauge {...costume.costume_skill_link[0].costume_skill} />
                <p className="mt-2">
                  {
                    costume.costume_skill_link[0].costume_skill
                      .short_description
                  }
                </p>
              </div>
            </div>
            {costume.costume_ability_link.map((ability) => (
              <Ability
                href={`/ability/costume/${slug(ability.costume_ability.name)}-${
                  ability.costume_ability.ability_id
                }`}
                key={ability.costume_ability.ability_id}
                name={ability.costume_ability.name}
                description={ability.costume_ability.description}
                imagePathBase={ability.costume_ability.image_path_base}
                level={4}
                isSmall
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
