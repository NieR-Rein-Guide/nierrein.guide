/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import Element from "@components/Element";
import WeaponThumbnail from "@components/WeaponThumbnail";
import Image from "next/image";
import weaponsIcons from "@utils/weaponsIcons";
import { useRouter } from "next/router";
import SVG from "react-inlinesvg";
import Star from "@components/decorations/Star";
import RARITY from "@utils/rarity";
import {
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import DatabaseNavbar from "@components/DatabaseNavbar";
import { useSettingsStore } from "@store/settings";
import Link from "next/link";
import { useInventoryStore } from "@store/inventory";
import Checkbox from "@components/form/Checkbox";
import { MdLibraryAddCheck, MdOutlineLibraryAdd } from "react-icons/md";
import { VALUED_TYPES, VALUED_WEAPONS } from "@config/constants";

interface CharactersPageProps {
  weapons: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
  abilitiesLookup: { [key: string]: string };
}

export const attributesLookup = {
  LIGHT: "Light",
  DARK: "Dark",
  FIRE: "Fire",
  WIND: "Wind",
  WATER: "Water",
};

export const weaponTypesLookup = {
  SWORD: "1H Sword",
  BIG_SWORD: "2H Sword",
  FIST: "Fist",
  GUN: "Gun",
  SPEAR: "Spear",
  STAFF: "Staff",
};

export const rarityLookup = {
  S_RARE: "3*",
  SS_RARE: "4*",
  LEGEND: "5*",
};

export default function WeaponsPage({
  weapons,
  abilitiesLookup,
}: CharactersPageProps): JSX.Element {
  const router = useRouter();
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
        title="Weapons"
        description="All the weapons of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-weapons.jpg"
      />

      <section className="mx-auto p-6">
        <DatabaseNavbar />

        {displayType === "table" && (
          <WeaponsTable
            key="table"
            weapons={weapons}
            showUnreleasedContent={showUnreleasedContent}
            abilitiesLookup={abilitiesLookup}
          />
        )}

        {displayType === "grid" && (
          <WeaponsGrid
            key="grid"
            weapons={weapons}
            showUnreleasedContent={showUnreleasedContent}
          />
        )}
      </section>
    </Layout>
  );
}

export function WeaponsTable({
  title,
  weapons,
  abilitiesLookup,
  onRowClick = undefined,
  showUnreleasedContent,
}: {
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
  onRowClick?;
  title?: string;
  showUnreleasedContent: boolean;
}) {
  const [ownedWeapons, setOwnedWeapons] = useState<number[]>([]);
  const localWeapons = useInventoryStore((state) => state.weapons);
  const toggleFromInventory = useInventoryStore((state) => state.toggleWeapon);

  useEffect(() => {
    setOwnedWeapons(localWeapons as number[]);
  }, [localWeapons]);

  return (
    <MaterialTable
      title={title ?? `${weapons.length} weapons in the database.`}
      data={weapons.filter((weapon) => {
        if (showUnreleasedContent) return true;
        return new Date() > new Date(weapon.release_time);
      })}
      columns={[
        {
          field: "name",
          title: "Name",
          type: "string",
          render: (weapon) => (
            <div className="flex items-center gap-x-4 w-80 relative bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 focus-within:bg-opacity-20 transition">
              <WeaponThumbnail
                element={weapon.attribute}
                rarity={weapon.rarity}
                type={weapon.weapon_type}
                isDark={weapon.is_ex_weapon}
                alt={weapon.name}
                image_path={weapon.image_path}
              />
              <span>{weapon.name}</span>

              {!onRowClick && (
                <Link href={`/weapons/${weapon.slug}`} passHref>
                  <a className="absolute inset-0 z-10">
                    <span className="sr-only">
                      See more about {weapon.name}
                    </span>
                  </a>
                </Link>
              )}
            </div>
          ),
        },
        {
          field: "weapon_stat[0].hp",
          title: "HP",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
          },
          hideFilterIcon: true,
          customFilterAndSearch: (term, weapon) =>
            weapon.weapon_stat[0].hp >= Number(term),
        },
        {
          field: "weapon_stat[0].atk",
          title: "ATK",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
            color: "rgba(252,165,165,var(--tw-text-opacity))",
          },
          hideFilterIcon: true,
          customFilterAndSearch: (term, weapon) =>
            weapon.weapon_stat[0].atk >= Number(term),
        },
        {
          field: "weapon_stat[0].vit",
          title: "DEF",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
            color: "rgba(147,197,253,var(--tw-text-opacity))",
          },
          hideFilterIcon: true,
          customFilterAndSearch: (term, weapon) =>
            weapon.weapon_stat[0].vit >= Number(term),
        },
        {
          field: "weapon_ability_link[0].weapon_ability.name",
          title: "Ability 1",
          cellStyle: {
            textAlign: "center",
          },
          lookup: abilitiesLookup,
          customFilterAndSearch: (term, weapon) => {
            if (term.length === 0) return true;
            const hasAbilityInEitherSlot =
              term.includes(
                weapon.weapon_ability_link?.[0]?.weapon_ability.name
              ) ||
              term.includes(
                weapon.weapon_ability_link?.[1]?.weapon_ability.name
              );
            return hasAbilityInEitherSlot;
          },
        },
        {
          field: "weapon_ability_link[1].weapon_ability.name",
          title: "Ability 2",
          cellStyle: {
            textAlign: "center",
          },
          lookup: abilitiesLookup,
          customFilterAndSearch: (term, weapon) => {
            if (term.length === 0) return true;
            const hasAbilityInEitherSlot =
              term.includes(
                weapon.weapon_ability_link?.[0]?.weapon_ability.name
              ) ||
              term.includes(
                weapon.weapon_ability_link?.[1]?.weapon_ability.name
              );
            return hasAbilityInEitherSlot;
          },
        },
        {
          field: "weapon_ability_link[2].weapon_ability.name",
          title: "Ability 3",
          cellStyle: {
            textAlign: "center",
          },
          lookup: abilitiesLookup,
          customFilterAndSearch: (term, weapon) => {
            if (term.length === 0) return true;
            return term.includes(
              weapon.weapon_ability_link?.[2]?.weapon_ability.name
            );
          },
        },
        {
          field: "weapon_skill_link[0].weapon_skill.cooldown_time",
          title: "Cooldown Skill 1",
          type: "numeric",
          hideFilterIcon: true,
          render: (weapon) => (
            <span>
              {weapon.weapon_skill_link[0].weapon_skill.cooldown_time / 30} sec
            </span>
          ),
          customFilterAndSearch: (term, weapon) =>
            weapon.weapon_skill_link[0].weapon_skill.cooldown_time / 30 <=
            Number(term),
        },
        {
          field: "weapon_skill_link[1].weapon_skill.cooldown_time",
          title: "Cooldown Skill 2",
          type: "numeric",
          hideFilterIcon: true,
          render: (weapon) => (
            <span>
              {weapon.weapon_skill_link[1].weapon_skill.cooldown_time / 30} sec
            </span>
          ),
          customFilterAndSearch: (term, weapon) =>
            weapon.weapon_skill_link[1].weapon_skill.cooldown_time / 30 <=
            Number(term),
        },
        {
          field: "attribute",
          title: "Attribute",
          cellStyle: {
            textAlign: "center",
          },
          lookup: attributesLookup,
          customFilterAndSearch: (term, weapon) => {
            if (term.length === 0) return true;
            return term.includes(weapon.attribute);
          },
          render: (weapon) => <Element type={weapon.attribute} size={32} />,
        },
        {
          field: "weapon_type",
          title: "Type",
          cellStyle: {
            textAlign: "center",
          },
          lookup: weaponTypesLookup,
          customFilterAndSearch: (term, weapon) => {
            if (term.length === 0) return true;
            return term.includes(weapon.weapon_type);
          },
          render: (weapon) => (
            <div className="w-8">
              <Image
                layout="responsive"
                src={weaponsIcons[weapon.weapon_type]}
                alt={weapon.weapon_type}
              />
            </div>
          ),
        },
        {
          field: "is_ex_weapon",
          title: "EX",
          cellStyle: {
            textAlign: "center",
          },
          type: "boolean",
          render: (weapon) => (
            <>
              {weapon.is_ex_weapon ? (
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
        (weapon) => ({
          _icon: ownedWeapons.includes(weapon.weapon_id)
            ? MdLibraryAddCheck
            : MdOutlineLibraryAdd,
          get icon() {
            return this._icon;
          },
          set icon(value) {
            this._icon = value;
          },
          tooltip: "Add/Remove to your inventory",
          onClick: () => toggleFromInventory(weapon.weapon_id),
        }),
      ]}
      options={{
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

export function WeaponsGrid({
  weapons,
  showUnreleasedContent,
}: {
  weapons: (weapon & {
    weapon_ability_link: (weapon_ability_link & {
      weapon_ability: weapon_ability;
    })[];
    weapon_skill_link: (weapon_skill_link & {
      weapon_skill: weapon_skill;
    })[];
    weapon_stat: weapon_stat[];
  })[];
  showUnreleasedContent: boolean;
}) {
  const ownedWeapons = useInventoryStore((state) => state.weapons);
  const toggleFromInventory = useInventoryStore((state) => state.toggleWeapon);

  return (
    <div className="relative grid grid-cols-2 place-items-center md:grid-cols-4 lg:grid-cols-6 gap-8 mt-8">
      {weapons
        .filter((weapon) => {
          if (showUnreleasedContent) return true;
          return new Date() > new Date(weapon.release_time);
        })
        .map((weap) => (
          <div
            className="relative flex flex-col items-center"
            key={weap.weapon_id}
          >
            <p className="text-sm text-center line-clamp-1 mb-1">
              {weap.is_ex_weapon && <span className="text-rarity-4">EX </span>}
              {weap.name}
            </p>
            <div>
              <div className="group relative">
                <WeaponThumbnail
                  image_path={weap.image_path}
                  alt={weap.name}
                  type={weap.weapon_type}
                  element={weap.attribute}
                  rarity={weap.rarity}
                  isLarge
                  isDark={weap.is_ex_weapon}
                  imgClasses="transform transition-transform ease-out-cubic group-hover:scale-110"
                />
                <Link href={`/weapons/${weap.slug}`} passHref>
                  <a className="absolute inset-0 z-10">
                    <span className="sr-only">See more about {weap.name}</span>
                  </a>
                </Link>
              </div>
              <div className="bg-grey-dark border border-beige border-opacity-50 h-12 flex items-center pt-2 justify-center">
                <Checkbox
                  label={
                    ownedWeapons.includes(weap.weapon_id) ? "Owned" : "Owned?"
                  }
                  isChecked={ownedWeapons.includes(weap.weapon_id)}
                  setState={() => toggleFromInventory(weap.weapon_id)}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
