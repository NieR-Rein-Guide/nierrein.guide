import Layout from "@components/Layout";
import Meta from "@components/Meta";
import SVG from "react-inlinesvg";
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
import { useInventoryStore } from "@store/inventory";
import Checkbox from "@components/form/Checkbox";
import { useEffect, useState } from "react";
import WeaponSelect from "@components/weapons/WeaponSelect";
import CostumeSelect from "@components/characters/CostumeSelect";
import Radio from "@components/form/Radio";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import classNames from "classnames";
import WeaponThumbnail from "@components/WeaponThumbnail";
import produce from "immer";
import Image from "next/image";
import weaponsIcons from "@utils/weaponsIcons";
import Stat from "@components/Stat";
import statsIcons from "@utils/statsIcons";
import Ability from "@components/Ability";
import slug from "slugg";
import Skill from "@components/Skill";

type Costume = costume & {
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

type Weapon = weapon & {
  weapon_ability_link: (weapon_ability_link & {
    weapon_ability: weapon_ability;
  })[];
  weapon_skill_link: (weapon_skill_link & {
    weapon_skill: weapon_skill;
  })[];
  weapon_stat: weapon_stat[];
};

interface LoadoutBuilderProps {
  costumes: Costume[];
  weapons: Weapon[];
}

export default function ComparePage({
  costumes,
  weapons,
}: LoadoutBuilderProps): JSX.Element {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("costumes");

  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  /**
   * Inventory
   */
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const ownedWeapons = useInventoryStore((state) => state.weapons);

  const selectCostumes = [...costumes]
    .sort((a, b) => -b.character.name.localeCompare(a.character.name))
    .filter((costume) => {
      if (showUnreleasedContent) return true;
      return new Date() > new Date(costume.release_time);
    })
    .filter((costume) => {
      if (!showOnlyInventory) return true;
      return ownedCostumes.includes(costume.costume_id);
    });

  const selectWeapons = [...weapons]
    .sort((a, b) => -b.weapon_type.localeCompare(a.weapon_type))
    .filter((weapon) => {
      if (showUnreleasedContent) return true;
      return new Date() > new Date(weapon.release_time);
    })
    .filter((weapon) => {
      if (!showOnlyInventory) return true;
      return ownedWeapons.includes(weapon.weapon_id);
    });

  /**
   * Reset state if mode changes
   */
  useEffect(() => {
    setItems([]);
  }, [mode]);

  return (
    <Layout>
      <Meta
        title="Compare"
        description="Compare costumes/weapons."
        cover="https://nierrein.guide/tools/compare.jpg"
      />

      <nav className="mb-16">
        <Link href="/tools" passHref>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Tools</span>
          </a>
        </Link>
      </nav>

      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-display text-2xl mb-2">Compare:</h4>
          <div className="flex gap-x-8 mb-8">
            <Radio
              name="Costumes"
              value="costumes"
              isChecked={mode === "costumes"}
              setState={() => setMode("costumes")}
              labelClassname="inline-block text-center md:w-24"
            />
            <Radio
              name="Weapons"
              value="weapons"
              isChecked={mode === "weapons"}
              setState={() => setMode("weapons")}
              labelClassname="inline-block text-center md:w-24"
            />
          </div>
        </div>

        <Checkbox
          label="Only inventory"
          isChecked={showOnlyInventory}
          setState={(e) => setShowOnlyInventory(e.target.checked)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Select to add items */}
        <div className="border border-dashed border-beige border-opacity-50 p-4">
          {(mode === "costumes" && (
            <CostumeSelect
              classes="w-full"
              costumes={selectCostumes}
              onSelect={(e, value) => {
                setItems(
                  produce(items, (draft) => {
                    draft[0] = value;
                  })
                );
              }}
              label="Add a costume..."
            />
          )) || (
            <WeaponSelect
              classes="w-full"
              weapons={selectWeapons}
              onSelect={(e, value) => {
                setItems(
                  produce(items, (draft) => {
                    draft[0] = value;
                  })
                );
              }}
              label="Add a weapon..."
            />
          )}
        </div>
        <div className="border border-dashed border-beige border-opacity-50 p-4 col-start-3">
          {(mode === "costumes" && (
            <CostumeSelect
              classes="w-full"
              costumes={selectCostumes}
              onSelect={(e, value) => {
                setItems(
                  produce(items, (draft) => {
                    draft[1] = value;
                  })
                );
              }}
              label="Add a costume..."
            />
          )) || (
            <WeaponSelect
              classes="w-full"
              weapons={selectWeapons}
              onSelect={(e, value) => {
                setItems(
                  produce(items, (draft) => {
                    draft[1] = value;
                  })
                );
              }}
              label="Add a weapon..."
            />
          )}
        </div>
      </div>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* Display items */}
        {mode === "costumes" && <CostumeColumn {...items[0]} />}
        {mode === "weapons" && <WeaponColumn {...items[0]} />}

        <DiffColumn mode={mode} items={items} />

        {mode === "costumes" && <CostumeColumn {...items[1]} last />}
        {mode === "weapons" && <WeaponColumn {...items[1]} last />}
      </section>
    </Layout>
  );
}

type CostumeColumnProps = Costume & {
  last: boolean;
};

function CostumeColumn({
  title,
  image_path_base,
  rarity,
  weapon_type,
  costume_ability_link,
  costume_skill_link,
  costume_stat,
  character,
  last,
}: CostumeColumnProps) {
  return (
    <div className="flex flex-col gap-y-2 bg-grey-dark p-4 border border-beige border-opacity-50">
      {/* Thumbnail */}
      <div className={classNames("flex flex-col gap-y-4 p-2 h-28")}>
        <div
          className={classNames(
            "flex items-center gap-x-4",
            last ? "flex-row-reverse" : ""
          )}
        >
          <CostumeThumbnail
            src={
              image_path_base
                ? `${CDN_URL}${image_path_base}battle.png`
                : undefined
            }
            alt={`${title} thumbnail`}
            rarity={RARITY[rarity]}
          />
          <div className="flex flex-col gap-x-2 flex-1">
            <div
              className={classNames(
                "flex items-center gap-x-2",
                last ? "justify-end" : ""
              )}
            >
              <div className={classNames("w-8", last ? "justify-end" : "")}>
                <Image
                  layout="responsive"
                  src={weaponsIcons[weapon_type]}
                  alt={weapon_type}
                />
              </div>
              <span className="uppercase px-2 text-black bg-beige">
                {character?.name}
              </span>
            </div>
            <span
              className={classNames(
                "uppercase text-beige",
                last ? "text-end" : ""
              )}
            >
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-y-4 text-center">
        <div
          className={classNames(
            "flex justify-between items-center",
            last ? "flex-row-reverse" : ""
          )}
        >
          <Image src={statsIcons["largeHp"]} />
          <Stat value={costume_stat?.[0].hp} type="hp" />
        </div>
        <div
          className={classNames(
            "flex justify-between items-center",
            last ? "flex-row-reverse" : ""
          )}
        >
          <Image src={statsIcons["largeAtk"]} />
          <Stat
            className="text-red-300"
            value={costume_stat?.[0].atk}
            type="atk"
          />
        </div>
        <div
          className={classNames(
            "flex justify-between items-center",
            last ? "flex-row-reverse" : ""
          )}
        >
          <Image src={statsIcons["largeDef"]} />
          <Stat
            className="text-blue-300"
            value={costume_stat?.[0].vit}
            type="vit"
          />
        </div>
        <div
          className={classNames(
            "flex justify-between items-center",
            last ? "flex-row-reverse" : ""
          )}
        >
          <Image src={statsIcons["largeAgi"]} />
          <Stat
            className="text-green-300"
            value={costume_stat?.[0].agi}
            type="agi"
          />
        </div>
        <div
          className={classNames(
            "flex justify-between items-center",
            last ? "flex-row-reverse" : ""
          )}
        >
          <Image src={statsIcons["largeCr"]} />
          <Stat value={costume_stat?.[0].crit_rate} type="crit_rate" />
        </div>
        <div
          className={classNames(
            "flex justify-between items-center",
            last ? "flex-row-reverse" : ""
          )}
        >
          <Image src={statsIcons["largeCd"]} />
          <Stat value={costume_stat?.[0].crit_atk} type="crit_atk" />
        </div>
        <div
          className={classNames(
            "flex justify-between items-center",
            last ? "flex-row-reverse" : ""
          )}
        >
          <Image src={statsIcons["largeEvaRate"]} />
          <Stat value={costume_stat?.[0].eva_rate} type="eva_rate" />
        </div>
      </div>

      {/* Abilities */}
      <Ability
        href={`/ability/costume/${slug(
          costume_ability_link?.[0].costume_ability.name
        )}-${costume_ability_link?.[0].costume_ability.ability_id}`}
        className={classNames("flex-1 transition-opacity")}
        name={costume_ability_link?.[0].costume_ability.name}
        description={costume_ability_link?.[0].costume_ability.description}
        imagePathBase={
          costume_ability_link?.[0].costume_ability.image_path_base
        }
        level={costume_ability_link?.[0].ability_level}
      />
      <Ability
        href={`/ability/costume/${slug(
          costume_ability_link?.[1].costume_ability.name
        )}-${costume_ability_link?.[1].costume_ability.ability_id}`}
        className={classNames("flex-1 transition-opacity")}
        name={costume_ability_link?.[1].costume_ability.name}
        description={costume_ability_link?.[1].costume_ability.description}
        imagePathBase={
          costume_ability_link?.[1].costume_ability.image_path_base
        }
        level={costume_ability_link?.[1].ability_level}
      />
      <Ability
        className={classNames("flex-2 transition-opacity")}
        name={costume_ability_link?.[2].costume_ability.name}
        description={costume_ability_link?.[2].costume_ability.description}
        imagePathBase={
          costume_ability_link?.[2].costume_ability.image_path_base
        }
        level={4}
      />

      {/* Skills */}
      <Skill
        className="flex-1 text-xs"
        containerClass="md:flex-col"
        name={costume_skill_link?.[0].costume_skill.name}
        description={costume_skill_link?.[0].costume_skill.description}
        SkillCooltimeValue={costume_skill_link?.[0].costume_skill.cooldown_time}
        level={15}
        isMaxAscended
        imagePathBase={costume_skill_link?.[0].costume_skill.image_path}
      />
    </div>
  );
}

type WeaponColumnProps = Weapon & {
  last: boolean;
};

function WeaponColumn({
  weapon_type,
  attribute,
  rarity,
  image_path,
  is_ex_weapon,
  last,
}: WeaponColumnProps) {
  return (
    <div
      className={classNames(
        "flex flex-col gap-y-4 border border-beige p-2",
        last ? "items-end" : ""
      )}
    >
      <WeaponThumbnail
        type={weapon_type ?? weapon_type}
        element={attribute ?? attribute}
        rarity={rarity ?? rarity}
        image_path={image_path ?? image_path}
        isDark={is_ex_weapon ?? is_ex_weapon}
      />
    </div>
  );
}

function DiffColumn({
  mode,
  items,
}: {
  mode: string;
  items: Costume[] | Weapon[];
}) {
  const stats: costume_stat[] = items.map((item) => {
    const stat =
      mode === "costumes" ? item?.costume_stat?.[0] : item?.weapon_stat?.[0];
    return stat;
  });

  return (
    <div className="col-start-2 col-end-3">
      <div className="h-28 p-2"></div>

      {/* Stats */}
      {stats.length === 2 && (
        <div className="flex flex-col gap-y-4 text-center mt-6">
          <div className="flex justify-center items-center gap-x-2">
            <Image src={statsIcons["largeHp"]} />
            <div
              className={classNames(
                "w-32",
                stats?.[0]?.hp - stats?.[1]?.hp < 0 ? "text-red-300" : "",
                stats?.[0]?.hp - stats?.[1]?.hp > 0 ? "text-green-300" : ""
              )}
            >
              <Stat type="hp" value={stats?.[0]?.hp - stats?.[1]?.hp} />
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <Image src={statsIcons["largeAtk"]} />
            <div
              className={classNames(
                "w-32",
                stats?.[0]?.atk - stats?.[1]?.atk < 0 ? "text-red-300" : "",
                stats?.[0]?.atk - stats?.[1]?.atk > 0 ? "text-green-300" : ""
              )}
            >
              {stats?.[0]?.atk - stats?.[1]?.atk}
            </div>
          </div>
          <div
            className={classNames("flex justify-center items-center gap-x-2")}
          >
            <Image src={statsIcons["largeDef"]} />
            <div
              className={classNames(
                "w-32",
                stats?.[0]?.vit - stats?.[1]?.vit < 0 ? "text-red-300" : "",
                stats?.[0]?.vit - stats?.[1]?.vit > 0 ? "text-green-300" : ""
              )}
            >
              {stats?.[0]?.vit - stats?.[1]?.vit}
            </div>
          </div>

          {mode === "costumes" && (
            <>
              <div
                className={classNames(
                  "flex justify-center items-center gap-x-2"
                )}
              >
                <Image src={statsIcons["largeAgi"]} />
                <span
                  className={classNames(
                    "w-32",
                    stats?.[0]?.agi - stats?.[1]?.agi < 0 ? "text-red-300" : "",
                    stats?.[0]?.agi - stats?.[1]?.agi > 0
                      ? "text-green-300"
                      : ""
                  )}
                >
                  {stats?.[0]?.agi - stats?.[1]?.agi}
                </span>
              </div>
              <div
                className={classNames(
                  "flex justify-center items-center gap-x-2"
                )}
              >
                <Image src={statsIcons["largeCr"]} />
                <div
                  className={classNames(
                    "w-32",
                    stats?.[0]?.crit_rate - stats?.[1]?.crit_rate < 0
                      ? "text-red-300"
                      : "",
                    stats?.[0]?.crit_rate - stats?.[1]?.crit_rate > 0
                      ? "text-green-300"
                      : ""
                  )}
                >
                  <Stat
                    type="crit_rate"
                    value={stats?.[0]?.crit_rate - stats?.[1]?.crit_rate}
                  />
                </div>
              </div>
              <div
                className={classNames(
                  "flex justify-center items-center gap-x-2"
                )}
              >
                <Image src={statsIcons["largeCd"]} />
                <div
                  className={classNames(
                    "w-32",
                    stats?.[0]?.crit_atk - stats?.[1]?.crit_atk < 0
                      ? "text-red-300"
                      : "",
                    stats?.[0]?.crit_atk - stats?.[1]?.crit_atk > 0
                      ? "text-green-300"
                      : ""
                  )}
                >
                  <Stat
                    type="crit_atk"
                    value={stats?.[0]?.crit_atk - stats?.[1]?.crit_atk}
                  />
                </div>
              </div>
              <div
                className={classNames(
                  "flex justify-center items-center gap-x-2"
                )}
              >
                <Image src={statsIcons["largeEvaRate"]} />
                <div
                  className={classNames(
                    "w-32",
                    stats?.[0]?.eva_rate - stats?.[1]?.eva_rate < 0
                      ? "text-red-300"
                      : "",
                    stats?.[0]?.eva_rate - stats?.[1]?.eva_rate > 0
                      ? "text-green-300"
                      : ""
                  )}
                >
                  <Stat
                    type="eva_rate"
                    value={stats?.[0]?.eva_rate - stats?.[1]?.eva_rate}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

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
