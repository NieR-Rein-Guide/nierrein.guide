/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React, { useEffect, useState } from "react";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
  emblem,
} from "@prisma/client";
import { CDN_URL } from "@config/constants";
import CostumeThumbnail from "@components/CostumeThumbnail";
import RARITY from "@utils/rarity";
import Image from "next/image";
import SVG from "react-inlinesvg";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import weaponsIcons from "@utils/weaponsIcons";
import Star from "@components/decorations/Star";
import { useSettingsStore } from "../../store/settings";
import { useInventoryStore } from "../../store/inventory";
import DatabaseNavbar from "@components/DatabaseNavbar";
import Link from "next/link";
import Checkbox from "@components/form/Checkbox";
import { MdOutlineLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import classNames from "classnames";
import { Tooltip } from "@mui/material";
import AbilityThumbnail from "@components/AbilityThumbnail";

interface CharactersPageProps {
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
  abilitiesLookup;
  charactersLookup;
}

export const weaponTypesLookup = {
  SWORD: "1H Sword",
  BIG_SWORD: "2H Sword",
  FIST: "Fist",
  GUN: "Gun",
  SPEAR: "Spear",
  STAFF: "Staff",
};

export const rarityLookup = {
  RARE: "2*",
  S_RARE: "3*",
  SS_RARE: "4*",
};

export const gaugeLookup = {
  A: "A",
  B: "B",
  C: "C",
};

export default function CharactersPage({
  costumes,
  abilitiesLookup,
  charactersLookup,
}: CharactersPageProps): JSX.Element {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  /**
   * Using a state and useEffect here because Next.js is
   * complaining about differences between Server/Client
   * And cause rehydration issues that breaks the layout.
   */
  const [displayType, setDisplayType] = useState("table");
  const databaseDisplayType = useSettingsStore(
    (state) => state.databaseDisplayType
  );

  useEffect(() => {
    setDisplayType(databaseDisplayType);
  }, [databaseDisplayType]);

  return (
    <Layout hasContainer={false} className="overflow-x-auto">
      <Meta
        title="Costumes"
        description={`${costumes.length} costumes in the database.`}
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <section className="mx-auto p-6">
        <DatabaseNavbar />

        {displayType === "table" && (
          <CostumesTable
            costumes={costumes}
            abilitiesLookup={abilitiesLookup}
            charactersLookup={charactersLookup}
            showUnreleasedContent={showUnreleasedContent}
          />
        )}

        {displayType === "grid" && (
          <CostumesGrid
            costumes={costumes}
            abilitiesLookup={abilitiesLookup}
            charactersLookup={charactersLookup}
            showUnreleasedContent={showUnreleasedContent}
          />
        )}
      </section>
    </Layout>
  );
}

export function CostumesTable({
  title,
  costumes,
  showUnreleasedContent = true,
  charactersLookup = {},
  abilitiesLookup = {},
  onRowClick = undefined,
}: {
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
  showUnreleasedContent?: boolean;
  charactersLookup;
  abilitiesLookup;
  onRowClick?;
  title?: string;
}) {
  const [ownedCostumes, setOwnedCostumes] = useState<number[]>([]);
  const localCostumes = useInventoryStore((state) => state.costumes);
  const toggleFromInventory = useInventoryStore((state) => state.toggleCostume);

  useEffect(() => {
    setOwnedCostumes(localCostumes as number[]);
  }, [localCostumes]);

  return (
    <MaterialTable
      title={title ?? `${costumes.length} costumes in the database.`}
      data={costumes.filter((costume) => {
        if (showUnreleasedContent) return true;
        return new Date() > new Date(costume.release_time);
      })}
      columns={[
        {
          field: "title",
          title: "Title",
          type: "string",
          filterPlaceholder: "Search title or character...",
          render: (costume) => (
            <div className="flex items-center gap-x-4 w-80 relative bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 focus-within:bg-opacity-20 transition">
              <CostumeThumbnail
                src={`${CDN_URL}${costume.image_path_base}battle.png`}
                alt={`${costume.title} thumbnail`}
                rarity={RARITY[costume.rarity]}
              />
              <span className="truncate">
                {costume.is_ex_costume && (
                  <span className="text-rarity-4">EX </span>
                )}
                {costume.title}
              </span>

              {!onRowClick && (
                <Link
                  href={`/characters/${costume.character.slug}/${costume.slug}`}
                  passHref
                >
                  <a className="absolute inset-0 z-10">
                    <span className="sr-only">
                      See more about {costume.title}
                    </span>
                  </a>
                </Link>
              )}
            </div>
          ),
          customFilterAndSearch: (term, costume) => {
            if (term.length === 0) return true;
            return `${costume.character.name.toLowerCase()} ${costume.title.toLowerCase()}`.includes(
              term.toLowerCase()
            );
          },
        },
        {
          field: "costume_stat[0].hp",
          title: "HP",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
          },
          hideFilterIcon: true,
          filterPlaceholder: "> HP",
          customFilterAndSearch: (term, costume) =>
            costume.costume_stat[0].hp >= Number(term),
        },
        {
          field: "costume_stat[0].atk",
          title: "ATK",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
            color: "rgba(252,165,165,var(--tw-text-opacity))",
          },
          hideFilterIcon: true,
          filterPlaceholder: "> ATK",
          customFilterAndSearch: (term, costume) =>
            costume.costume_stat[0].atk >= Number(term),
        },
        {
          field: "costume_stat[0].vit",
          title: "DEF",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
            color: "rgba(147,197,253,var(--tw-text-opacity))",
          },
          hideFilterIcon: true,
          filterPlaceholder: "> DEF",
          customFilterAndSearch: (term, costume) =>
            costume.costume_stat[0].vit >= Number(term),
        },
        {
          field: "costume_stat[0].agi",
          title: "AGI",
          type: "numeric",
          hideFilterIcon: true,
          cellStyle: {
            textAlign: "center",
            color: "rgba(110,231,183,var(--tw-text-opacity))",
          },
          filterPlaceholder: "> AGI",
          customFilterAndSearch: (term, costume) =>
            costume.costume_stat[0].agi >= Number(term),
        },
        {
          field: "costume_ability_link[0].costume_ability.name",
          title: "Ability 1",
          lookup: abilitiesLookup,
          customFilterAndSearch: (term, costume) => {
            if (term.length === 0) return true;
            const hasAbilityInEitherSlot =
              term.includes(
                costume.costume_ability_link[0].costume_ability.name
              ) ||
              term.includes(
                costume.costume_ability_link[1].costume_ability.name
              );
            return hasAbilityInEitherSlot;
          },
          cellStyle: {
            textAlign: "center",
          },
          render: (costume) => (
            <AbilityThumbnail
              ability={costume.costume_ability_link[0].costume_ability}
            />
          ),
        },
        {
          field: "costume_ability_link[1].costume_ability.name",
          title: "Ability 2",
          lookup: abilitiesLookup,
          customFilterAndSearch: (term, costume) => {
            if (term.length === 0) return true;
            const hasAbilityInEitherSlot =
              term.includes(
                costume.costume_ability_link[0].costume_ability.name
              ) ||
              term.includes(
                costume.costume_ability_link[1].costume_ability.name
              );
            return hasAbilityInEitherSlot;
          },
          cellStyle: {
            textAlign: "center",
          },
          render: (costume) => (
            <AbilityThumbnail
              ability={costume.costume_ability_link[1].costume_ability}
            />
          ),
        },
        {
          field: "costume_ability_link[2].costume_ability.name",
          title: "Awakening Ability",
          lookup: abilitiesLookup,
          customFilterAndSearch: (term, costume) => {
            if (term.length === 0) return true;
            return term.includes(
              costume.costume_ability_link[2].costume_ability.name
            );
          },
          cellStyle: {
            textAlign: "center",
          },
          render: (costume) => (
            <AbilityThumbnail
              ability={costume.costume_ability_link[2].costume_ability}
            />
          ),
        },
        {
          field: "costume_skill_link[0].costume_skill.gauge_rise_speed",
          title: "CS Gauge",
          lookup: gaugeLookup,
          customFilterAndSearch: (term, costume) => {
            if (term.length === 0) return true;
            return term.includes(
              costume.costume_skill_link[0].costume_skill.gauge_rise_speed
            );
          },
          cellStyle: {
            textAlign: "center",
          },
          render: (costume) => (
            <Tooltip title="Lower number means skill charge faster.">
              <div
                className={classNames({
                  "text-red-400":
                    costume.costume_skill_link[0].costume_skill
                      .gauge_rise_speed === "A",
                  "text-yellow-400":
                    costume.costume_skill_link[0].costume_skill
                      .gauge_rise_speed === "B",
                  "text-green-400":
                    costume.costume_skill_link[0].costume_skill
                      .gauge_rise_speed === "C",
                })}
              >
                <span className="block">
                  {costume.costume_skill_link[0].costume_skill.gauge_rise_speed}
                </span>
                <span className="block text-xs">
                  {costume.costume_skill_link[0].costume_skill.cooldown_time}
                </span>
              </div>
            </Tooltip>
          ),
        },
        {
          field: "is_ex_costume",
          title: "EX",
          cellStyle: {
            textAlign: "center",
          },
          type: "boolean",
          render: (costume) => (
            <>
              {costume.is_ex_costume ? (
                <SVG
                  src="/icons/weapons/dark.svg"
                  className="h-8 w-8 mx-auto"
                />
              ) : (
                <span>No</span>
              )}
            </>
          ),
        },
        {
          field: "weapon_type",
          title: "Type",
          cellStyle: {
            textAlign: "center",
          },
          lookup: weaponTypesLookup,
          customFilterAndSearch: (term, costume) => {
            if (term.length === 0) return true;
            return term.includes(costume.weapon_type);
          },
          render: (weapon) => (
            <div className="w-8 mx-auto">
              <Image
                layout="responsive"
                src={weaponsIcons[weapon.weapon_type]}
                alt={weapon.weapon_type}
              />
            </div>
          ),
        },
        {
          field: "rarity",
          title: "Rarity",
          lookup: rarityLookup,
          customFilterAndSearch: (term, costume) => {
            if (term.length === 0) return true;
            return term.includes(costume.rarity);
          },
          render: (costume) => (
            <div className="w-8 h-8 mx-auto">
              <Star rarity={RARITY[costume.rarity]} />
            </div>
          ),
        },
      ]}
      actions={[
        (costume) => ({
          _icon: ownedCostumes.includes(costume.costume_id)
            ? MdLibraryAddCheck
            : MdOutlineLibraryAdd,
          get icon() {
            return this._icon;
          },
          set icon(value) {
            this._icon = value;
          },
          tooltip: "Add/Remove to your inventory",
          onClick: () => toggleFromInventory(costume.costume_id),
        }),
      ]}
      options={{
        search: false,
        actionsColumnIndex: -1,
        grouping: true,
        searchFieldAlignment: "right",
        filtering: true,
        pageSize: 25,
        pageSizeOptions: [25, 50, 100, 200, 500],
        exportMenu: [
          {
            label: "Export PDF",
            exportFunc: (cols, datas) =>
              ExportPdf(cols, datas, "myPdfFileName"),
          },
          {
            label: "Export CSV",
            exportFunc: (cols, datas) =>
              ExportCsv(cols, datas, "myCsvFileName"),
          },
        ],
        exportAllData: true,
      }}
      onRowClick={onRowClick}
    />
  );
}

export function CostumesGrid({
  costumes,
  showUnreleasedContent = true,
  isLibrary = false,
}: {
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
  showUnreleasedContent?: boolean;
  isLibrary?: boolean;
  charactersLookup;
  abilitiesLookup;
  onRowClick?;
}) {
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const toggleFromInventory = useInventoryStore((state) => state.toggleCostume);

  return (
    <div className="grid grid-cols-2 place-items-center md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
      {costumes
        .filter((costume) => {
          if (showUnreleasedContent) return true;
          return new Date() > new Date(costume.release_time);
        })
        .map((cost) => (
          <div
            className={classNames(
              "relative",
              isLibrary && !ownedCostumes.includes(cost.costume_id)
                ? "opacity-50"
                : ""
            )}
            key={cost.costume_id}
          >
            <p className="text-sm text-center line-clamp-1 mb-1">
              {cost.is_ex_costume && <span className="text-rarity-4">EX </span>}
              {cost.title}
            </p>
            <CostumeThumbnail
              src={`${CDN_URL}${cost.image_path_base}portrait.png`}
              alt={cost.title}
              weaponType={cost.weapon_type}
              rarity={cost.rarity}
              isLarge
              isDark={cost.is_ex_costume}
              className="group"
              imgClasses="transform transition-transform ease-out-cubic group-hover:scale-110"
            >
              <Link
                href={`/characters/${cost.character.slug}/${cost.slug}`}
                passHref
              >
                <a className="absolute inset-0 z-10">
                  <span className="sr-only">See more about {cost.title}</span>
                </a>
              </Link>
            </CostumeThumbnail>
            <div className="bg-grey-dark border border-beige border-opacity-50 h-12 flex items-center pt-2 justify-center">
              <Checkbox
                label={
                  ownedCostumes.includes(cost.costume_id) ? "Owned" : "Owned?"
                }
                isChecked={ownedCostumes.includes(cost.costume_id)}
                setState={() => toggleFromInventory(cost.costume_id)}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
