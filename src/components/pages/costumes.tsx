/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import { useEffect, useState } from "react";
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
import { CDN_URL, SKILLS_TYPES } from "@config/constants";
import CostumeThumbnail from "@components/CostumeThumbnail";
import RARITY from "@utils/rarity";
import Image from "next/image";
import SVG from "react-inlinesvg";
import MaterialTable from "@material-table/core";
import weaponsIcons from "@utils/weaponsIcons";
import Star from "@components/decorations/Star";
import { useSettingsStore } from "../../store/settings";
import { useInventoryStore } from "../../store/inventory";
import { usePanelStore } from "../../store/panels";
import DatabaseNavbar from "@components/DatabaseNavbar";
import Link from "next/link";
import Checkbox from "@components/form/Checkbox";
import classNames from "classnames";
import { Button, Modal, Tooltip } from "@mui/material";
import AbilityThumbnail from "@components/AbilityThumbnail";
import Stat from "@components/Stat";
import WeaponThumbnail from "@components/WeaponThumbnail";
import getBaseRarity from "@utils/getBaseRarity";
import skillGaugeColors from "@utils/skillGaugeColors";
import { AiOutlinePushpin } from "react-icons/ai";
import SkillThumbnail from "@components/SkillThumbnail";
import { MdFilterAlt } from "react-icons/md";
import { useCostumesFilters } from "@store/costumes-filters";

type ICostume = costume & {
  costume_ability_link: (costume_ability_link & {
    costume_ability: costume_ability;
  })[];
  costume_skill_link: (costume_skill_link & {
    costume_skill: costume_skill;
  })[];
  costume_stat: costume_stat[];
  character: character;
  emblem: emblem;
};

interface CharactersPageProps {
  costumes: ICostume[];
  abilitiesLookup;
  charactersLookup;
  characters: character[];
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

function filterCostumesBySkill(costumes: ICostume[], filters) {
  let filteredCostumes: ICostume[] = costumes;

  for (const filter of filters) {
    filteredCostumes = filteredCostumes.filter((cost) => {
      return filter.options.some((option) =>
        cost.costume_skill_link[0].costume_skill.description
          .toLowerCase()
          .includes(option)
      );
    });
  }

  return filteredCostumes;
}

function filterCostumesByCharacter(costumes: ICostume[], filters: character[]) {
  if (filters.length === 0) return costumes;

  const charactersIds = filters.map((character) => character.character_id);

  return costumes.filter((costume) =>
    charactersIds.includes(costume.character_id)
  );
}

export default function CharactersPage({
  costumes,
  abilitiesLookup,
  charactersLookup,
  characters,
}: CharactersPageProps): JSX.Element {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const showInventory = useSettingsStore((state) => state.showInventory);
  const order = useSettingsStore((state) => state.order);
  const ownedCostumes = useInventoryStore((state) => state.costumes);

  const inventoryCostumes = costumes.filter((cost) => {
    return ownedCostumes.includes(cost.costume_id);
  });
  const skills = useCostumesFilters((state) => state.skills);
  const filteredCharacters = useCostumesFilters((state) => state.characters);

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
    <Layout
      hasContainer={databaseDisplayType === "table" ? false : true}
      className={classNames(
        databaseDisplayType === "table" ? "overflow-x-auto" : ""
      )}
    >
      <Meta
        title="Costumes"
        description={`${costumes.length} costumes in the database.`}
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      <section
        className={classNames(
          "mx-auto p-6",
          displayType !== "table" ? "w-full" : ""
        )}
      >
        <DatabaseNavbar>
          <div className="flex flex-col items-center md:flex-row gap-2">
            <CostumesCharactersFilters characters={characters} />
            <CostumesSkillsFilters />
          </div>
        </DatabaseNavbar>

        {showInventory && ownedCostumes.length === 0 && (
          <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg">
            <img
              className="inline-block"
              src="/decorations/fio-confused.png"
              alt="Fio confused"
            />
            <p className="mt-4">
              Sorry, you have not yet added costumes to your inventory.
            </p>
          </div>
        )}

        {displayType === "table" && (
          <CostumesTable
            costumes={
              showInventory
                ? filterCostumesBySkill(
                    filterCostumesByCharacter(
                      inventoryCostumes,
                      filteredCharacters
                    ),
                    skills
                  )
                : filterCostumesBySkill(
                    filterCostumesByCharacter(costumes, filteredCharacters),
                    skills
                  )
            }
            abilitiesLookup={abilitiesLookup}
            charactersLookup={charactersLookup}
            showUnreleasedContent={showUnreleasedContent}
          />
        )}

        {displayType !== "table" && (
          <CostumesGrid
            costumes={
              showInventory
                ? filterCostumesBySkill(
                    filterCostumesByCharacter(
                      inventoryCostumes,
                      filteredCharacters
                    ),
                    skills
                  )
                : filterCostumesBySkill(
                    filterCostumesByCharacter(costumes, filteredCharacters),
                    skills
                  )
            }
            abilitiesLookup={abilitiesLookup}
            charactersLookup={charactersLookup}
            showUnreleasedContent={showUnreleasedContent}
            isSmall={displayType === "compact"}
            isLibrary={order === "library"}
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
  const addCostumePanel = usePanelStore((state) => state.addCostume);

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
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => addCostumePanel(costume.costume_id)}
                className="flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 z-40 umami--click--pin-costume-button"
              >
                <span className="text-xs">PIN</span>
                <AiOutlinePushpin />
              </button>

              <div className="flex items-center gap-x-4 w-80 relative bg-white bg-opacity-5 rounded-lg hover:bg-opacity-20 focus-within:bg-opacity-20 transition">
                <CostumeThumbnail
                  src={`${CDN_URL}${costume.image_path_base}battle.png`}
                  alt={`${costume.title} thumbnail`}
                  rarity={RARITY[costume.rarity]}
                  weaponType={costume.weapon_type}
                  isDark={costume.is_ex_costume}
                />
                <span className="inline-block pr-12 line-clamp-2">
                  {costume.is_ex_costume && (
                    <span className="text-rarity-4">EX </span>
                  )}
                  {costume.title}
                </span>

                {!onRowClick && (
                  <Link
                    href={`/characters/${costume.character.slug}/${costume.slug}`}
                    passHref
                    scroll={true}
                  >
                    <a className="absolute inset-0 z-10">
                      <span className="sr-only">
                        See more about {costume.title}
                      </span>
                    </a>
                  </Link>
                )}
                {costume.weapon && (
                  <div className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10">
                    <WeaponThumbnail
                      href={`/weapons/${costume?.weapon.slug}`}
                      rarity={getBaseRarity(costume?.weapon)}
                      alt={costume?.weapon.name}
                      image_path={costume?.weapon.image_path}
                      sizeClasses="w-10 h-10"
                    />
                  </div>
                )}
              </div>
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
          render: (costume) => (
            <Stat type="hp" value={costume.costume_stat[0].hp} />
          ),
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
          render: (costume) => (
            <Stat type="atk" value={costume.costume_stat[0].atk} />
          ),
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
          render: (costume) => (
            <Stat type="vit" value={costume.costume_stat[0].vit} />
          ),
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
          render: (costume) => (
            <Stat type="agi" value={costume.costume_stat[0].agi} />
          ),
        },
        {
          field: "costume_skill_link[0].costume_skill.description",
          title: "Character Skill",
          filterPlaceholder: "Description...",
          cellStyle: {
            textAlign: "center",
          },
          render: (costume) => (
            <SkillThumbnail skill={costume.costume_skill_link[0].costume_skill}>
              <span className="text-xs line-clamp-2 z-10 text-shadow">
                {costume.costume_skill_link[0].costume_skill.name}
              </span>
            </SkillThumbnail>
          ),
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
            <Tooltip
              enterTouchDelay={0}
              title="Lower number means skill charge faster."
            >
              <div
                className={classNames(
                  skillGaugeColors[
                    costume.costume_skill_link[0].costume_skill.gauge_rise_speed
                  ]
                )}
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
      options={{
        search: false,
        actionsColumnIndex: -1,
        grouping: true,
        searchFieldAlignment: "right",
        filtering: true,
        pageSize: 25,
        pageSizeOptions: [25, 50, 100, 200, 500],
      }}
      onRowClick={onRowClick}
    />
  );
}

export function CostumesGrid({
  costumes,
  showUnreleasedContent = true,
  isLibrary = false,
  isSmall = false,
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
  isSmall?: boolean;
}) {
  const addCostumePanel = usePanelStore((state) => state.addCostume);
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const toggleFromInventory = useInventoryStore((state) => state.toggleCostume);

  return (
    <div
      className={classNames(
        "grid mt-8",
        isSmall
          ? "grid-cols-3 xs:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4"
          : "grid-cols-2 xs:grid-cols-3 place-items-center md:grid-cols-4 lg:grid-cols-6 gap-8"
      )}
    >
      {costumes
        .filter((costume) => {
          if (showUnreleasedContent) return true;
          return new Date() > new Date(costume.release_time);
        })
        .sort((a, b) => {
          if (isLibrary) {
            return a.character_id - b.character_id;
          }

          return;
        })
        .map((cost) => {
          if (!isSmall) {
            return (
              <div
                className={classNames(
                  "group relative",
                  isLibrary && !ownedCostumes.includes(cost.costume_id)
                    ? "opacity-50"
                    : ""
                )}
                key={cost.costume_id}
              >
                <div className="relative flex flex-col items-center justify-center gap-y-2 font-mono mb-2">
                  <p className="text-center text-sm mb-0 leading-none">
                    {cost.is_ex_costume && (
                      <span className="text-rarity-4">EX </span>
                    )}
                    {cost.character.name}
                  </p>
                  <span className="text-xs text-center text-beige line-clamp-1 leading-none transition-opacity ease-out-cubic group-hover:opacity-0 -mt-1 pb-2">
                    {cost.title}
                  </span>
                  <button
                    onClick={() => addCostumePanel(cost.costume_id)}
                    className="absolute bottom-1 flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 ease-out-cubic translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 umami--click--pin-costume-button"
                  >
                    <AiOutlinePushpin />
                    <span className="text-xs">PIN</span>
                  </button>
                </div>
                <CostumeThumbnail
                  src={`${CDN_URL}${cost.image_path_base}portrait.png`}
                  alt={cost.title}
                  weaponType={cost.weapon_type}
                  rarity={cost.rarity}
                  isLarge
                  isDark={cost.is_ex_costume}
                  className="group"
                  imgClasses="transform transition-transform ease-out-cubic group-hover:scale-110"
                  weapon={cost.weapon}
                >
                  <Link
                    href={`/characters/${cost.character.slug}/${cost.slug}`}
                    passHref
                  >
                    <a className="absolute inset-0 z-10">
                      <span className="sr-only">
                        See more about {cost.title}
                      </span>
                    </a>
                  </Link>
                </CostumeThumbnail>
                <div className="bg-grey-dark border border-beige border-opacity-50 h-12 flex items-center pt-2 justify-center">
                  <Checkbox
                    label={
                      ownedCostumes.includes(cost.costume_id)
                        ? "Owned"
                        : "Owned?"
                    }
                    isChecked={ownedCostumes.includes(cost.costume_id)}
                    setState={() => toggleFromInventory(cost.costume_id)}
                  />
                </div>
              </div>
            );
          }

          return (
            <div
              className={classNames(
                "group flex flex-col items-center gap-y-2 relative font-mono",
                isLibrary && !ownedCostumes.includes(cost.costume_id)
                  ? "opacity-50"
                  : ""
              )}
              key={cost.costume_id}
            >
              <CostumeThumbnail
                href={`/characters/${cost?.character.slug}/${cost?.slug}`}
                src={`${CDN_URL}${cost?.image_path_base}battle.png`}
                alt={`${cost?.title} thumbnail`}
                rarity={cost.rarity}
                weaponType={cost?.weapon_type}
                isDark={cost?.is_ex_costume}
              />
              <p className="text-center text-sm mb-0 leading-none">
                {cost.is_ex_costume && (
                  <span className="text-rarity-4">EX </span>
                )}
                {cost.character.name}
              </p>
              <span className="text-xs text-center text-beige line-clamp-1 leading-none transition-opacity ease-out-cubic group-hover:opacity-0 -mt-1">
                {cost.title}
              </span>
              <button
                onClick={() => addCostumePanel(cost.costume_id)}
                className="absolute bottom-0 flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 ease-out-cubic translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 umami--click--pin-costume-button"
              >
                <AiOutlinePushpin />
                <span className="text-xs">PIN</span>
              </button>
            </div>
          );
        })}
    </div>
  );
}

export function CostumesSkillsFilters() {
  const [isOpen, setIsOpen] = useState(false);

  const skills = useCostumesFilters((state) => state.skills);
  const toggleSkill = useCostumesFilters((state) => state.toggleSkill);

  return (
    <div>
      <Button
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
          <span>
            CS Filtered: {skills.map((skill) => skill.label).join(", ")}
          </span>
        )) || <span>Filter by Character Skill</span>}
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-grey-dark p-8 absolute bordered top-0 left-0 md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-xl space-y-8 overflow-y-auto pt-12 md:pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="flex items-center gap-x-2 text-2xl">
                <MdFilterAlt /> Filter costumes by Character Skill
              </h3>
            </div>
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {SKILLS_TYPES.map((skill) => (
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

export function CostumesCharactersFilters({
  characters,
}: {
  characters: character[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredCharacters = useCostumesFilters((state) => state.characters);
  const toggleCharacter = useCostumesFilters((state) => state.toggleCharacter);

  return (
    <div>
      <Button
        variant={filteredCharacters.length > 0 ? "contained" : "outlined"}
        onClick={() => setIsOpen(true)}
        component="label"
        startIcon={
          <img
            className="h-5 w-auto"
            height="20"
            src="https://assets.nierrein.guide/ui/actor/ch019001/ch019001_01_actor_icon.png"
            alt="Filter by Character"
          />
        }
      >
        {(filteredCharacters.length > 0 && (
          <span>
            Characters: {filteredCharacters.map((ch) => ch.name).join(", ")}
          </span>
        )) || <span>Filter by Characters</span>}
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-grey-dark p-8 absolute bordered top-0 left-0 md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-full md:max-w-3xl space-y-8 overflow-y-auto pt-12 md:pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="flex items-center gap-x-2 text-2xl">
                <MdFilterAlt /> Filter costumes by Character
              </h3>
            </div>
            <button className="btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {characters.map((character) => (
              <div
                key={character.character_id}
                className="flex gap-x-2 items-center"
              >
                <img
                  height="36"
                  width="32"
                  className="h-auto w-8"
                  src={`${CDN_URL}${character.image_path}`}
                  alt={character.name}
                />
                <Checkbox
                  label={character.name}
                  isChecked={filteredCharacters.some(
                    (ch) => ch.name === character.name
                  )}
                  setState={() => toggleCharacter(character)}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
