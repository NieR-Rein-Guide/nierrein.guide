import Layout from "@components/Layout";
import Meta from "@components/Meta";
import WeaponThumbnail from "@components/WeaponThumbnail";
import CostumeThumbnail from "@components/CostumeThumbnail";
import DebrisThumbnail from "@components/DebrisThumbnail";
import prisma from "@libs/prisma";
import {
  DEBRIS_RARITY,
  rarityLookup as debrisRarityLookup,
} from "pages/database/debris";
import toast from "react-hot-toast";
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
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import { costumes_link } from "@prisma/client-nrg";
import { getAllCostumes } from "@models/costume";
import { getAllWeapons } from "@models/weapon";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import WeaponSelect from "@components/weapons/WeaponSelect";
import { useState } from "react";
import axios from "axios";
import produce from "immer";

interface LoadoutBuilderProps {
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
  debris: debris[];
  links: costumes_link[];
}

export default function LoadoutBuilder({
  costumes,
  weapons,
  debris,
  links,
}: LoadoutBuilderProps): JSX.Element {
  const [newLinks, setNewLinks] = useState(links);
  const [loading, setLoading] = useState(false);

  async function save() {
    if (loading) return;

    try {
      setLoading(true);

      await axios({
        url: "/api/costumes-link",
        method: "POST",
        data: {
          costumes: newLinks,
        },
      });

      toast.success("Saved!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function updateWeapon(
    costume: costume & {
      costume_ability_link: (costume_ability_link & {
        costume_ability: costume_ability;
      })[];
      costume_skill_link: (costume_skill_link & {
        costume_skill: costume_skill;
      })[];
      costume_stat: costume_stat[];
      character: character;
      emblem: emblem;
    },
    weapon: weapon & {
      weapon_ability_link: (weapon_ability_link & {
        weapon_ability: weapon_ability;
      })[];
      weapon_skill_link: (weapon_skill_link & {
        weapon_skill: weapon_skill;
      })[];
      weapon_stat: weapon_stat[];
    }
  ) {
    setNewLinks(
      produce(newLinks, (draft) => {
        const linkedCostume = draft.find(
          (link) => link.costume_id === costume.costume_id
        );

        if (!linkedCostume) {
          draft.push({
            costume_id: costume.costume_id,
            weapon_id: weapon.weapon_id,
            debris_id: null,
          });

          return;
        }

        linkedCostume.weapon_id = weapon.weapon_id;
      })
    );

    console.log(newLinks);
  }

  return (
    <Layout>
      <Meta
        title="Link items to costumes"
        description="Link weapons/debris to costumes."
      />

      <section className="flex flex-col gap-y-4 p-4 md:p-8">
        {costumes.map((costume) => {
          const link = newLinks.find(
            (link) => link.costume_id === costume.costume_id
          );
          const weaponLinked = weapons.find(
            (weapon) => weapon.weapon_id === link?.weapon_id
          );

          return (
            <div className="flex flex-col gap-y-2" key={costume.costume_id}>
              <h2>
                {costume.character.name} - {costume.title}
              </h2>
              <div className="flex gap-x-4">
                <CostumeThumbnail
                  src={`${CDN_URL}${costume.image_path_base}battle.png`}
                  alt={`${costume.title} thumbnail`}
                  rarity={RARITY[costume.rarity]}
                  weaponType={costume.weapon_type}
                />
                <WeaponThumbnail
                  image_path={weaponLinked?.image_path}
                  alt={`${weaponLinked?.name} thumbnail`}
                  rarity={RARITY[weaponLinked?.rarity]}
                  type={weaponLinked?.weapon_type}
                  isDark={weaponLinked?.is_ex_weapon}
                  element={weaponLinked?.attribute}
                />
                <WeaponSelect
                  defaultValue={weaponLinked}
                  classes="flex-1"
                  weapons={weapons}
                  onSelect={(e, value) => {
                    if (!value) return;
                    updateWeapon(costume, value);
                  }}
                  label="Add a weapon..."
                />
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex justify-center mt-4">
        <button onClick={save} className="btn">
          Save
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const [costumesData, weaponsData, debris, links] = await Promise.all([
    getAllCostumes({
      orderBy: {
        release_time: "desc",
      },
    }),
    getAllWeapons(),
    prisma.dump.debris.findMany({
      orderBy: {
        release_time: "asc",
      },
    }),
    prisma.nrg.costumes_link.findMany({}),
  ]);

  const selectWeapons = [...weaponsData.weapons].sort(
    (a, b) => -b.weapon_type.localeCompare(a.weapon_type)
  );

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes: costumesData.costumes,
        weapons: selectWeapons,
        debris,
        links,
      })
    ),
  };
}
