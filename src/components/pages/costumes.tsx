/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React from "react";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";
import CostumeThumbnail from "@components/CostumeThumbnail";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import Skill from "@components/Skill";
import Ability from "@components/Ability";
import statsIcons from "@utils/statsIcons";
import Image from "next/image";
import Checkbox from "@components/form/Checkbox";

interface CharactersPageProps {
  characters: (character & {
    costume: (costume & {
      costume_ability_link: (costume_ability_link & {
        costume_ability: costume_ability;
      })[];
      costume_skill_link: (costume_skill_link & {
        costume_skill: costume_skill;
      })[];
      costume_stat: costume_stat[];
    })[];
  })[];
}

export default function CharactersPage({
  characters,
}: CharactersPageProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Characters"
        description="All the costumes of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <div className="space-y-4">
        {characters.map((character) => (
          <div className="bg-black p-4 pl-8" key={character.character_id}>
            <div className="flex items-center my-8">
              <div className={`pointer-events-auto overflow-hidden iso-bg`}>
                <img
                  style={{
                    minWidth: "74px",
                    maxWidth: "74px",
                    minHeight: "74px",
                    maxHeight: "74px",
                  }}
                  className="select-none object-none"
                  alt={character.name}
                  title={character.name}
                  src={`${CDN_URL}${character.image_path}`}
                />
              </div>
              <h2 className="text-3xl ml-8">{character.name}</h2>
            </div>

            {character.costume.map((costume) => (
              <div className="flex flex-col" key={costume.costume_id}>
                <div className="flex">
                  <CostumeThumbnail
                    src={`${CDN_URL}${costume.image_path_base}battle.png`}
                    alt={`${costume.title} thumbnail`}
                    rarity={RARITY[costume.rarity]}
                    imgClasses={classNames(
                      "transition-all filter group-hover:brightness-100"
                    )}
                  />
                  <div>
                    <StatsOfLevel
                      stats={costume.costume_stat[0]}
                      label={`Level ${costume.costume_stat[0].level}`}
                      description=""
                    />
                  </div>
                </div>
                <div className="flex">
                  <Skill
                    className="text-sm w-1/2"
                    name={costume.costume_skill_link[0].costume_skill.name}
                    description={
                      costume.costume_skill_link[0].costume_skill.description
                    }
                    SkillCooltimeValue={
                      costume.costume_skill_link[0].costume_skill.cooldown_time
                    }
                    level={15}
                    isMaxAscended={true}
                    imagePathBase={
                      costume.costume_skill_link[0].costume_skill.image_path
                    }
                  />

                  {costume.costume_ability_link.map((ability, index) => (
                    <Ability
                      className="flex-1"
                      key={`${costume.costume_id}ability${index}`}
                      name={ability.costume_ability.name}
                      description={ability.costume_ability.description}
                      imagePathBase={ability.costume_ability.image_path_base}
                      level={ability.ability_level}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
}

function SingleStat({ name, value, icon }): JSX.Element {
  const colors = {
    Attack: "text-red-300",
    Defense: "text-blue-300",
    Agility: "text-green-300",
    "Critical Rate": "",
    "Critical Damage": "",
  };

  return (
    <div className="flex items-center justify-between pl-4 pr-8">
      <div className="flex items-center gap text-beige-light">
        <Image
          layout="intrinsic"
          src={icon}
          alt={name}
          width={48}
          height={48}
        />
      </div>
      <div className={classNames("font-light", colors[name])}>{value}</div>
    </div>
  );
}

function StatsOfLevel({
  label,
  stats,
  description,
}: {
  label: string;
  stats: costume_stat;
  description: string;
}): JSX.Element {
  return (
    <div className="border border-beige-inactive bg-grey-lighter">
      <div className="grid lg:grid-rows-2 lg:grid-cols-4">
        <div className="row-span-2 flex flex-col justify-center bg-grey-foreground py-2 text-center">
          <h3 className="text-2xl text-beige-inactive">{label}</h3>
          {description && (
            <span className="text-sm text-beige">{description}</span>
          )}
        </div>
        <SingleStat icon={statsIcons.hp} name="HP" value={stats.hp ?? "???"} />
        <SingleStat
          icon={statsIcons.atk}
          name="Attack"
          value={stats.atk ?? "???"}
        />
        <SingleStat
          icon={statsIcons.def}
          name="Defense"
          value={stats.vit ?? "???"}
        />
        <SingleStat
          icon={statsIcons.agility}
          name="Agility"
          value={stats.agi ?? "???"}
        />
        <SingleStat
          icon={statsIcons.cr}
          name="Critical Rate"
          value={`${stats.crit_rate ?? "???"}%`}
        />
        <SingleStat
          icon={statsIcons.cd}
          name="Critical Damage"
          value={`${stats.crit_atk / 10 ?? "???"}%`}
        />
      </div>
    </div>
  );
}
