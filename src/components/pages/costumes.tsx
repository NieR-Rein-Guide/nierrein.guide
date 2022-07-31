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
import statsIcons from "@utils/statsIcons";
import Image from "next/image";
import Link from "next/link";
import slug from "slugg";
import SVG from "react-inlinesvg";

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

      <div className="grid lg:grid-cols-2">
        {characters.map((character) => (
          <div className="bg-black p-4 pl-8" key={character.character_id}>
            <div className="group relative flex items-center py-8">
              <div
                className={`pointer-events-auto overflow-hidden iso-bg group-hover:border-beige transition`}
              >
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
              <h2 className="text-3xl ml-8 group-hover:underline">
                {character.name}
              </h2>
              <p className="absolute top-1/2 transform -translate-y-1/2 right-4 text-xs bg-brown px-2 py-1">
                {character.costume.length} costumes.
              </p>

              <Link href={`/characters/${slug(character.name)}`} passHref>
                <a
                  className="absolute inset-0"
                  title={`View ${character.name} costumes`}
                >
                  <span className="sr-only">
                    View {character.name} costumes
                  </span>
                </a>
              </Link>
            </div>

            <div className="space-y-4">
              {character.costume.map((costume) => (
                <div
                  key={costume.costume_id}
                  className="relative flex flex-col items-start lg:items-stretch p-4 border border-beige-inactive bg-grey-lighter hover:bg-grey-foreground transition"
                >
                  <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:flex-row lg:items-center justify-between">
                    {/* Thumbnail / Name */}
                    <div className="flex">
                      <CostumeThumbnail
                        src={`${CDN_URL}${costume.image_path_base}battle.png`}
                        alt={`${costume.title} thumbnail`}
                        rarity={RARITY[costume.rarity]}
                        imgClasses={classNames(
                          "transition-all filter group-hover:brightness-100"
                        )}
                      />
                      <div className="flex flex-col justify-center px-4">
                        <h3 className="text-2xl lg:text-xl truncate text-beige-active">
                          {costume.title}
                        </h3>
                        <h3 className="text-xl text-beige-inactive">
                          Level {costume.costume_stat[0].level}
                        </h3>
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="flex">
                      <div className="grid grid-rows-2 grid-cols-3">
                        <SingleStat
                          icon={statsIcons.hp}
                          name="HP"
                          value={costume.costume_stat[0].hp ?? "???"}
                        />
                        <SingleStat
                          icon={statsIcons.atk}
                          name="Attack"
                          value={costume.costume_stat[0].atk ?? "???"}
                        />
                        <SingleStat
                          icon={statsIcons.def}
                          name="Defense"
                          value={costume.costume_stat[0].vit ?? "???"}
                        />
                        <SingleStat
                          icon={statsIcons.agility}
                          name="Agility"
                          value={costume.costume_stat[0].agi ?? "???"}
                        />
                        <SingleStat
                          icon={statsIcons.cr}
                          name="Critical Rate"
                          value={`${
                            costume.costume_stat[0].crit_rate ?? "???"
                          }%`}
                        />
                        <SingleStat
                          icon={statsIcons.cd}
                          name="Critical Damage"
                          value={`${
                            costume.costume_stat[0].crit_atk / 10 ?? "???"
                          }%`}
                        />
                      </div>
                    </div>
                  </div>

                  <a className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-beige h-14 w-14 rounded-full flex justify-center items-center lg:hidden">
                    <SVG
                      className="h-6 transition-transform ease-out-cubic text-black transform -scale-x-1"
                      src="/decorations/arrow-left.svg"
                    />
                  </a>

                  <Link
                    href={`/characters/${slug(character.name)}/${slug(
                      costume.title
                    )}`}
                    passHref
                  >
                    <a className="absolute inset-0">
                      <span className="sr-only">View costume info</span>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap text-beige-light px-2">
        <Image
          layout="intrinsic"
          src={icon}
          alt={name}
          width={32}
          height={32}
        />
      </div>
      <div className={classNames("font-light text-s", colors[name])}>
        {value}
      </div>
    </div>
  );
}
