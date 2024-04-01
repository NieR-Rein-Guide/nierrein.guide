/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import React, { useEffect, useMemo, useState } from "react";
import MaterialTable from "@material-table/core";
import Element from "@components/Element";
import WeaponThumbnail from "@components/WeaponThumbnail";
import Image from "next/legacy/image";
import weaponsIcons from "@utils/weaponsIcons";
import SVG from "react-inlinesvg";
import Star from "@components/decorations/Star";
import RARITY from "@utils/rarity";
import {
  character,
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import { useSettingsStore } from "@store/settings";
import Link from "next/link";
import { useInventoryStore } from "@store/inventory";
import Checkbox from "@components/form/Checkbox";
import {
  CDN_URL,
  VALUED_TYPES,
  VALUED_TYPES_LABEL,
  VALUED_WEAPONS,
  WEAPONS_SKILLS_TYPES,
} from "@config/constants";
import classNames from "classnames";
import AbilityThumbnail from "@components/AbilityThumbnail";
import getBaseRarity from "@utils/getBaseRarity";
import CostumeThumbnail from "@components/CostumeThumbnail";
import SkillThumbnail from "@components/SkillThumbnail";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { MdFilterAlt } from "react-icons/md";
import { useWeaponsFilters } from "@store/weapons-filters";
import Stat from "@components/Stat";
import { CostumesCharactersFilters } from "@components/pages/costumes";
import DatabaseLayout from "@components/Layout/Database";

export type IWeapon = weapon & {
  weapon_ability_link: (weapon_ability_link & {
    weapon_ability: weapon_ability;
  })[];
  weapon_skill_link: (weapon_skill_link & {
    weapon_skill: weapon_skill;
  })[];
  weapon_stat: weapon_stat[];
};

interface CharactersPageProps {
  weapons: IWeapon[];
  abilitiesLookup: { [key: string]: string };
  characters: character[];
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
  RARE: "2*",
  S_RARE: "3*",
  SS_RARE: "4*",
};

function filterWeaponsBySkill(weapons: IWeapon[], filters) {
  let filteredWeapons: IWeapon[] = weapons;

  for (const filter of filters) {
    filteredWeapons = filteredWeapons.filter((weapon) => {
      return filter.options.some((option) => {
        const firstName =
          weapon.weapon_skill_link[0].weapon_skill.name.toLowerCase();
        const secondName =
          weapon.weapon_skill_link[1].weapon_skill.name.toLowerCase();

        if (
          firstName.includes(option.toLowerCase()) ||
          secondName.includes(option.toLowerCase())
        ) {
          return true;
        }

        return false;
      });
    });
  }

  return filteredWeapons;
}

export function filterWeapons(
  weapons: IWeapon[],
  {
    ownedWeapons = [],
    showInventory,
    showUnreleasedContent,
    region = "GLOBAL",
    skills = [],
    isRefinable,
    isEX,
    isRD,
    isSubjugation,
    filteredCharacters,
  }
) {
  let filteredWeapons: IWeapon[] = weapons;

  if (!showUnreleasedContent) {
    const now = new Date();
    filteredWeapons = filteredWeapons.filter((weapon) => {
      return now >= new Date(weapon.release_time);
    });
  }

  if (filteredCharacters?.length > 0) {
    filteredWeapons = filteredWeapons.filter((weapon) => {
      return filteredCharacters.some(
        (char) => weapon?.costume?.character_id === char.character_id
      );
    });
  }

  if (isRefinable) {
    filteredWeapons = filteredWeapons.filter(
      (weapon) => weapon.weapon_ability_link[3]
    );
  }

  if (isEX) {
    filteredWeapons = filteredWeapons.filter((weapon) => weapon.is_ex_weapon);
  }

  if (isRD) {
    filteredWeapons = filteredWeapons.filter((weapon) => weapon.is_rd_weapon);
  }

  if (isSubjugation) {
    filteredWeapons = filteredWeapons.filter(
      (weapon) => weapon.is_subjugation_weapon
    );
  }

  if (showInventory) {
    filteredWeapons = filteredWeapons.filter((weapon) => {
      return ownedWeapons.includes(weapon.weapon_id);
    });
  }

  if (skills.length > 0) {
    filteredWeapons = filterWeaponsBySkill(filteredWeapons, skills);
  }

  return filteredWeapons;
}

export default function WeaponsPage({
  weapons,
  abilitiesLookup,
  characters,
}: CharactersPageProps): JSX.Element {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const region = useSettingsStore((state) => state.region);
  const showInventory = useSettingsStore((state) => state.showInventory);
  const ownedWeapons = useInventoryStore((state) => state.weapons);
  const order = useSettingsStore((state) => state.order);
  const skills = useWeaponsFilters((state) => state.skills);
  const isRefinable = useWeaponsFilters((state) => state.isRefinable);
  const setIsRefinable = useWeaponsFilters((state) => state.setIsRefinable);
  const isEX = useWeaponsFilters((state) => state.isEX);
  const isRD = useWeaponsFilters((state) => state.isRD);
  const isSubjugation = useWeaponsFilters((state) => state.isSubjugation);
  const setIsEX = useWeaponsFilters((state) => state.setIsEX);
  const setIsRD = useWeaponsFilters((state) => state.setIsRD);
  const setIsSubjugation = useWeaponsFilters((state) => state.setIsSubjugation);

  const filteredWeapons = useMemo(
    () =>
      filterWeapons(weapons, {
        skills,
        showInventory,
        showUnreleasedContent,
        region,
        ownedWeapons,
        isRefinable,
        isEX,
        isRD,
        isSubjugation,
      }),
    [
      weapons,
      skills,
      showInventory,
      showUnreleasedContent,
      region,
      ownedWeapons,
      isRefinable,
      isEX,
      isRD,
      isSubjugation,
    ]
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

  const [valuedWeaponType, setValuedWeaponType] = useState("none");

  useEffect(() => {
    setDisplayType(databaseDisplayType);
  }, [databaseDisplayType]);

  return (
    <DatabaseLayout
      hasContainer={databaseDisplayType === "table" ? false : true}
      className={classNames(
        databaseDisplayType === "table" ? "overflow-x-auto" : ""
      )}
      aside={
        <>
          <CostumesCharactersFilters
            characters={characters || []}
            label="Filter weapons by character"
          />
          <WeaponsSkillsFilters />
          {displayType === "table" && (
            <FormControl className="bg-grey-dark">
              <InputLabel id="attribute-select-label">Highlight</InputLabel>
              <Select
                labelId="view-select"
                value={valuedWeaponType}
                label="Type"
                onChange={(e) => setValuedWeaponType(e.target.value)}
              >
                {Object.entries(VALUED_WEAPONS).map(([key], index) => (
                  <MenuItem key={`${key}-${index}`} value={key}>
                    {VALUED_TYPES_LABEL[key].label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Checkbox
            isChecked={isRefinable}
            setState={(e) => setIsRefinable(e.target.checked)}
            label="Refinable"
          />
          <Checkbox
            isChecked={isEX}
            setState={(e) => setIsEX(e.target.checked)}
            label="EX"
          />
          <Checkbox
            isChecked={isRD}
            setState={(e) => setIsRD(e.target.checked)}
            label="RoD"
          />
          <Checkbox
            isChecked={isSubjugation}
            setState={(e) => setIsSubjugation(e.target.checked)}
            label="Subjugation"
          />
        </>
      }
    >
      <Meta
        title="Weapons"
        description="All the weapons of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-weapons.jpg"
      />

      <div
        className={classNames(
          "mx-auto",
          displayType !== "table" ? "w-full" : ""
        )}
      >
        {showInventory && ownedWeapons.length === 0 && (
          <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
            <img
              className="inline-block"
              src="/decorations/fio-confused.png"
              alt="Fio confused"
            />
            <p className="mt-4">
              Sorry, you have not yet added weapons to your inventory.
            </p>
            <p>
              If you want to add weapons to your inventory please select the
              "grid" view and check the weapons.
            </p>
          </div>
        )}

        {displayType === "table" && (
          <WeaponsTable
            key="table"
            weapons={filteredWeapons}
            abilitiesLookup={abilitiesLookup}
            valuedWeaponType={valuedWeaponType}
          />
        )}

        {displayType !== "table" && (
          <WeaponsGrid
            key="grid"
            weapons={filteredWeapons}
            isSmall={displayType === "compact"}
            isLibrary={order === "library"}
          />
        )}
      </div>
    </DatabaseLayout>
  );
}

export function WeaponsTable({
  title,
  weapons,
  abilitiesLookup,
  onRowClick = undefined,
  showUnreleasedContent,
  valuedWeaponType = "none",
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
  valuedWeaponType?: string;
}) {
  const refiningAbilitiesLookup = {};
  weapons
    .filter((weapon) => (weapon.weapon_ability_link[3] ? true : false))
    .forEach((weapon) => {
      refiningAbilitiesLookup[
        weapon.weapon_ability_link[3].weapon_ability.name
      ] = weapon.weapon_ability_link[3].weapon_ability.name;
    });

  const isExalted = useSettingsStore((state) => state.isExalted);

  return (
    <MaterialTable
      title={title ?? `${weapons.length} weapons in the database.`}
      data={weapons
        .filter((weapon) => {
          if (typeof window === "undefined") return true;
          if (showUnreleasedContent) return true;
          return new Date() > new Date(weapon.release_time);
        })
        .map((weap) => ({
          ...weap,
          base_rarity: getBaseRarity({
            rarity: weap.rarity,
            is_ex_weapon: weap.is_ex_weapon,
            evolution_order: weap.evolution_order,
          }),
        }))}
      columns={[
        {
          field: "name",
          title: "Name",
          type: "string",
          filterPlaceholder: "Search name...",
          render: (weapon) => (
            <div className="flex items-center gap-x-4 w-80 relative bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 focus-within:bg-opacity-20 transition">
              <WeaponThumbnail
                element={weapon.attribute}
                rarity={weapon.base_rarity}
                type={weapon.weapon_type}
                isDark={weapon.is_ex_weapon}
                alt={weapon.name}
                image_path={weapon.image_path}
              />
              <span className="flex-1 inline-block pr-12 line-clamp-2">
                {weapon.is_ex_weapon && (
                  <span className="text-rarity-4">EX </span>
                )}
                {weapon.name}
              </span>

              {!onRowClick && (
                <Link
                  href={`/weapons/${weapon.slug}`}
                  passHref
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">See more about {weapon.name}</span>
                </Link>
              )}

              {weapon.costume && (
                <div className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10">
                  <CostumeThumbnail
                    href={`/characters/${weapon.costume.character.slug}/${weapon.costume.slug}`}
                    src={`${CDN_URL}${weapon.costume.image_path_base}battle.png`}
                    alt={`${weapon.costume.title} thumbnail`}
                    rarity={RARITY[weapon.costume.rarity]}
                    sizeClasses="min-h-10 min-w-10 h-10 w-10"
                  />
                </div>
              )}
            </div>
          ),
          customFilterAndSearch: (term, weapon) =>
            weapon.name.toLowerCase().includes(term?.toLowerCase()),
        },
        {
          field: "weapon_stat[0].hp",
          title: "HP",
          type: "numeric",
          cellStyle: {
            textAlign: "center",
          },
          hideFilterIcon: true,
          filterPlaceholder: "> HP",
          customFilterAndSearch: (term, weapon) => {
            let stats = weapon.weapon_stat
              .filter((row) => !row.is_refined)
              .pop();

            if (isExalted) {
              const hasRefined = weapon.weapon_stat.find(
                (row) => row.is_refined
              );

              if (hasRefined) {
                stats = hasRefined;
              }
            }

            return stats.hp >= Number(term);
          },
          render: (weapon) => {
            let stats = weapon.weapon_stat
              .filter((row) => !row.is_refined)
              .pop();

            if (isExalted) {
              const hasRefined = weapon.weapon_stat.find(
                (row) => row.is_refined
              );

              if (hasRefined) {
                stats = hasRefined;
              }
            }

            return <Stat type="hp" value={stats.hp} />;
          },
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
          filterPlaceholder: "> ATK",
          customFilterAndSearch: (term, weapon) => {
            let stats = weapon.weapon_stat
              .filter((row) => !row.is_refined)
              .pop();

            if (isExalted) {
              const hasRefined = weapon.weapon_stat.find(
                (row) => row.is_refined
              );

              if (hasRefined) {
                stats = hasRefined;
              }
            }

            return stats.atk >= Number(term);
          },
          render: (weapon) => {
            let stats = weapon.weapon_stat
              .filter((row) => !row.is_refined)
              .pop();

            if (isExalted) {
              const hasRefined = weapon.weapon_stat.find(
                (row) => row.is_refined
              );

              if (hasRefined) {
                stats = hasRefined;
              }
            }

            return <Stat type="atk" value={stats.atk} />;
          },
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
          filterPlaceholder: "> DEF",
          customFilterAndSearch: (term, weapon) => {
            let stats = weapon.weapon_stat
              .filter((row) => !row.is_refined)
              .pop();

            if (isExalted) {
              const hasRefined = weapon.weapon_stat.find(
                (row) => row.is_refined
              );

              if (hasRefined) {
                stats = hasRefined;
              }
            }

            return stats.vit >= Number(term);
          },
          render: (weapon) => {
            let stats = weapon.weapon_stat
              .filter((row) => !row.is_refined)
              .pop();

            if (isExalted) {
              const hasRefined = weapon.weapon_stat.find(
                (row) => row.is_refined
              );

              if (hasRefined) {
                stats = hasRefined;
              }
            }

            return <Stat type="vit" value={stats.vit} />;
          },
        },
        {
          field: "weapon_skill_link[0].weapon_skill.description",
          title: "Skill 1",
          filterPlaceholder: "Description...",
          cellStyle: {
            textAlign: "center",
          },
          render: (weapon) => {
            const isValued = VALUED_WEAPONS[valuedWeaponType]
              .filter(
                (valuedAbility) => valuedAbility.type === VALUED_TYPES.SKILL
              )
              .find((valuedAbility) =>
                weapon.weapon_skill_link[0].weapon_skill.name
                  .toLowerCase()
                  .includes(valuedAbility.value.toLowerCase())
              );

            return (
              <SkillThumbnail skill={weapon.weapon_skill_link[0].weapon_skill}>
                <span
                  className={classNames(
                    "text-xs line-clamp-2 z-10 text-shadow",
                    isValued ? "text-green-300" : ""
                  )}
                >
                  {weapon.weapon_skill_link[0].weapon_skill.name}
                </span>
              </SkillThumbnail>
            );
          },
        },
        {
          field: "weapon_skill_link[1].weapon_skill.description",
          title: "Skill 2",
          filterPlaceholder: "Description...",
          cellStyle: {
            textAlign: "center",
          },
          render: (weapon) => {
            const isValued = VALUED_WEAPONS[valuedWeaponType]
              .filter(
                (valuedAbility) => valuedAbility.type === VALUED_TYPES.SKILL
              )
              .find((valuedAbility) =>
                weapon.weapon_skill_link[1].weapon_skill.name
                  .toLowerCase()
                  .includes(valuedAbility.value.toLowerCase())
              );

            return (
              <SkillThumbnail skill={weapon.weapon_skill_link[1].weapon_skill}>
                <span
                  className={classNames(
                    "text-xs line-clamp-2 z-10 text-shadow",
                    isValued ? "text-green-300" : ""
                  )}
                >
                  {weapon.weapon_skill_link[1].weapon_skill.name}
                </span>
              </SkillThumbnail>
            );
          },
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
          render: (weapon) => {
            const isValued = VALUED_WEAPONS[valuedWeaponType]
              .filter(
                (valuedAbility) => valuedAbility.type === VALUED_TYPES.ABILITY
              )
              .find((valuedAbility) =>
                weapon.weapon_ability_link[0].weapon_ability.name.includes(
                  valuedAbility.value
                )
              );

            return (
              <div
                className={classNames(
                  "relative flex flex-col justify-center items-center",
                  isValued ? "text-green-300" : ""
                )}
              >
                <AbilityThumbnail
                  ability={weapon.weapon_ability_link[0].weapon_ability}
                />
              </div>
            );
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
          render: (weapon) => {
            const isValued = VALUED_WEAPONS[valuedWeaponType]
              .filter(
                (valuedAbility) => valuedAbility.type === VALUED_TYPES.ABILITY
              )
              .find((valuedAbility) =>
                weapon.weapon_ability_link[1].weapon_ability.name.includes(
                  valuedAbility.value
                )
              );

            return (
              <div
                className={classNames(
                  "relative flex flex-col justify-center items-center",
                  isValued ? "text-green-300" : ""
                )}
              >
                <AbilityThumbnail
                  ability={weapon.weapon_ability_link[1].weapon_ability}
                />
              </div>
            );
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
          render: (weapon) => (
            <>
              {(weapon.weapon_ability_link?.[2]?.weapon_ability && (
                <AbilityThumbnail
                  ability={weapon.weapon_ability_link[2].weapon_ability}
                />
              )) || <span className="text-beige-dark">N/A</span>}
            </>
          ),
        },
        {
          field: "weapon_ability_link[3].weapon_ability.name",
          title: "Refining Ability",
          cellStyle: {
            textAlign: "center",
          },
          lookup: refiningAbilitiesLookup,
          customFilterAndSearch: (term, weapon) => {
            if (term.length === 0) return true;
            return term.includes(
              weapon.weapon_ability_link?.[3]?.weapon_ability.name
            );
          },
          render: (weapon) => {
            const isValued = VALUED_WEAPONS[valuedWeaponType]
              .filter(
                (valuedAbility) => valuedAbility.type === VALUED_TYPES.ABILITY
              )
              .find((valuedAbility) =>
                weapon.weapon_ability_link?.[3]?.weapon_ability.name.includes(
                  valuedAbility.value
                )
              );

            if (weapon.name.includes("horn")) {
              console.log(
                weapon.weapon_ability_link?.[3]?.weapon_ability?.name
              );
            }

            return (
              <div
                className={classNames(
                  "relative flex flex-col justify-center items-center",
                  isValued ? "text-green-300" : ""
                )}
              >
                {(weapon.weapon_ability_link[3] && (
                  <AbilityThumbnail
                    ability={weapon.weapon_ability_link[3].weapon_ability}
                  />
                )) || <span className="text-beige-dark">N/A</span>}
              </div>
            );
          },
        },
        {
          field: "weapon_skill_link[0].weapon_skill.cooldown_time",
          title: "Cooldown Skill 1",
          type: "numeric",
          hideFilterIcon: true,
          render: (weapon) => {
            const cooldown =
              weapon.weapon_skill_link[0].weapon_skill.cooldown_time / 30;

            const isValued =
              VALUED_WEAPONS[valuedWeaponType].filter(
                (valuedAbility) =>
                  valuedAbility.type === VALUED_TYPES.SKILL_COOLDOWN
              )[0]?.value >= cooldown;

            return (
              <span className={classNames(isValued ? "text-green-300" : "")}>
                {cooldown} sec
              </span>
            );
          },
          customFilterAndSearch: (term, weapon) =>
            weapon.weapon_skill_link[0].weapon_skill.cooldown_time / 30 <=
            Number(term),
        },
        {
          field: "weapon_skill_link[1].weapon_skill.cooldown_time",
          title: "Cooldown Skill 2",
          type: "numeric",
          hideFilterIcon: true,
          render: (weapon) => {
            const cooldown =
              weapon.weapon_skill_link[1].weapon_skill.cooldown_time / 30;

            const isValued =
              VALUED_WEAPONS[valuedWeaponType].filter(
                (valuedAbility) =>
                  valuedAbility.type === VALUED_TYPES.SKILL_COOLDOWN
              )[0]?.value >= cooldown;

            return (
              <span className={classNames(isValued ? "text-green-300" : "")}>
                {cooldown} sec
              </span>
            );
          },
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
              <img
                layout="responsive"
                src={weaponsIcons[weapon.weapon_type]}
                alt={weapon.weapon_type}
              />
            </div>
          ),
        },
        {
          field: "base_rarity",
          title: "Base Rarity",
          lookup: rarityLookup,
          customFilterAndSearch: (term, weapon) => {
            if (term.length === 0) return true;
            return term.includes(weapon.base_rarity);
          },
          render: (weapon) => (
            <div className="w-8 h-8 mx-auto">
              <Star rarity={RARITY[weapon.base_rarity]} />
            </div>
          ),
        },
      ]}
      options={{
        actionsColumnIndex: -1,
        searchFieldAlignment: "right",
        pageSize: 25,
        search: false,
        filtering: true,
        pageSizeOptions: [25, 50, 100, 200, 500],
      }}
      onRowClick={onRowClick}
    />
  );
}

export function WeaponsGrid({
  weapons,
  showUnreleasedContent,
  isLibrary,
  isSmall = false,
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
  isLibrary?: boolean;
  isSmall?: boolean;
}) {
  const ownedWeapons = useInventoryStore((state) => state.weapons);
  const toggleFromInventory = useInventoryStore((state) => state.toggleWeapon);

  return (
    <div
      className={classNames(
        "relative grid mt-8",
        isSmall
          ? "grid-cols-3 xs:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4"
          : "grid-cols-2 xs:grid-cols-3 place-items-center md:grid-cols-4 lg:grid-cols-6 gap-8"
      )}
    >
      {weapons
        .filter((weapon) => {
          if (typeof window === "undefined") return true;
          if (showUnreleasedContent) return true;
          return new Date() > new Date(weapon.release_time);
        })
        .sort((a, b) => {
          if (isLibrary) {
            return a.weapon_id - b.weapon_id;
          }

          return;
        })
        .map((weap) => ({
          ...weap,
          base_rarity: getBaseRarity({
            rarity: weap.rarity,
            is_ex_weapon: weap.is_ex_weapon,
            evolution_order: weap.evolution_order,
          }),
        }))
        .map((weap) => {
          if (!isSmall) {
            return (
              <div
                className={classNames(
                  "relative flex flex-col items-center",
                  isLibrary && !ownedWeapons.includes(weap.weapon_id)
                    ? "opacity-50"
                    : ""
                )}
                key={weap.weapon_id}
              >
                <div className="relative flex flex-col items-center justify-center gap-y-2 font-mono mb-2">
                  <p className="text-center text-sm mb-0 leading-none">
                    {weap.is_ex_weapon && (
                      <span className="text-rarity-4">EX </span>
                    )}
                    {weap.name}
                  </p>
                </div>
                <div>
                  <div className="group relative">
                    <WeaponThumbnail
                      image_path={weap.image_path}
                      alt={weap.name}
                      type={weap.weapon_type}
                      element={weap.attribute}
                      rarity={weap.base_rarity}
                      isLarge
                      isDark={weap.is_ex_weapon}
                      imgClasses="transform transition-transform ease-out-cubic group-hover:scale-110"
                      costume={weap.costume}
                    />
                    <Link
                      href={`/weapons/${weap.slug}`}
                      passHref
                      className="absolute inset-0 z-10"
                    >
                      <span className="sr-only">
                        See more about {weap.name}
                      </span>
                    </Link>
                  </div>
                  <div className="bg-grey-dark border border-beige border-opacity-50 h-12 flex items-center pt-2 justify-center">
                    <Checkbox
                      label={
                        ownedWeapons.includes(weap.weapon_id)
                          ? "Owned"
                          : "Owned?"
                      }
                      isChecked={ownedWeapons.includes(weap.weapon_id)}
                      setState={() => toggleFromInventory(weap.weapon_id)}
                    />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              className={classNames(
                "relative flex flex-col justify-between items-center",
                isLibrary && !ownedWeapons.includes(weap.weapon_id)
                  ? "opacity-50"
                  : ""
              )}
              key={weap.weapon_id}
            >
              <div className="relative flex flex-col items-center justify-center gap-y-2 font-mono mb-2">
                <p className="text-center text-xs mb-0 leading-none line-clamp-2">
                  {weap.is_ex_weapon && (
                    <span className="text-rarity-4">EX </span>
                  )}
                  {weap.name}
                </p>
              </div>
              <WeaponThumbnail
                href={`/weapons/${weap.slug}`}
                rarity={getBaseRarity(weap)}
                type={weap.weapon_type}
                element={weap.attribute}
                isDark={weap.is_ex_weapon}
                alt={weap.name}
                image_path={weap.image_path}
              />
            </div>
          );
        })}
    </div>
  );
}

export function WeaponsSkillsFilters() {
  const [isOpen, setIsOpen] = useState(false);

  const skills = useWeaponsFilters((state) => state.skills);
  const toggleSkill = useWeaponsFilters((state) => state.toggleSkill);

  return (
    <div className="md:col-span-2">
      <Button
        className="w-full"
        variant={skills.length > 0 ? "contained" : "outlined"}
        onClick={() => setIsOpen(true)}
        component="label"
        startIcon={
          <SVG
            src="/decorations/frame-ability.svg"
            className="h-4 w-auto transform rotate-45"
          />
        }
      >
        {(skills.length > 0 && (
          <span>Filtered: {skills.map((skill) => skill.label).join(", ")}</span>
        )) || <span>Filter by Skill</span>}
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-grey-dark p-8 absolute bordered top-0 left-0 md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-xl lg:max-w-4xl space-y-8 overflow-y-auto pt-12 md:pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="flex items-center gap-x-2 text-2xl">
                <MdFilterAlt /> Filter weapons by Skill
              </h3>
            </div>
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {WEAPONS_SKILLS_TYPES.map((skill) => (
              <Checkbox
                key={skill.label}
                label={skill.label}
                isChecked={skills.some((sk) => sk.label === skill.label)}
                setState={() => toggleSkill(skill)}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
