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
import { format } from "date-fns";
import Skill from "./Skill";
import classNames from "classnames";
import { CDN_URL } from "@config/constants";
import getBaseRarity from "@utils/getBaseRarity";
import WeaponThumbnail from "./WeaponThumbnail";
import CostumeThumbnail from "./CostumeThumbnail";
import StatDisplay from "./StatDisplay";
import Ability from "./Ability";
import slug from "slugg";
import SVG from "react-inlinesvg";
import { useState } from "react";
import skillGaugeColors, {
  skillGaugeBorderColors,
} from "@utils/skillGaugeColors";
import { Tooltip } from "@mui/material";
import getGaugeLevel from "@utils/getGaugeLevel";

const fetcher = (url) => fetch(url).then((res) => res.json());

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
                  <Image
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2">
            <StatDisplay type="hp" value={costume.costume_stat[0].hp} />
            <StatDisplay type="atk" value={costume.costume_stat[0].atk} />
            <StatDisplay type="vit" value={costume.costume_stat[0].vit} />
            <StatDisplay type="agi" value={costume.costume_stat[0].agi} />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex items-center my-1">
              <div className="relative mr-4">
                <SVG src="/decorations/frame.svg" className="h-16 w-16" />
                <div className="h-8 w-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    layout="fixed"
                    width={32}
                    height={32}
                    alt=""
                    src={`${CDN_URL}${costume.costume_skill_link[0].costume_skill.image_path}`}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start text-xs">
                <div
                  className={classNames(
                    "px-2 py-1 mr-2 relative bg-grey-dark border",
                    skillGaugeColors[
                      costume.costume_skill_link[0].costume_skill
                        .gauge_rise_speed
                    ],
                    skillGaugeBorderColors[
                      costume.costume_skill_link[0].costume_skill
                        .gauge_rise_speed
                    ]
                  )}
                >
                  Gauge Level:{" "}
                  {getGaugeLevel(
                    costume.costume_skill_link[0].costume_skill.cooldown_time
                  )}
                </div>
                <p>
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
