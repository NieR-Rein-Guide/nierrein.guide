import Layout from "@components/Layout";
import Meta from "@components/Meta";
import WeaponThumbnail from "@components/WeaponThumbnail";
import CostumeThumbnail from "@components/CostumeThumbnail";
import CompanionThumbnail from "@components/CompanionThumbnail";
import DebrisThumbnail from "@components/DebrisThumbnail";
import prisma, { nrgprisma } from "@libs/prisma";
import { companion, costume, debris, memoir, weapon } from "@prisma/client";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import MemoirThumbnail from "@components/MemoirThumbnail";
import Radio from "@components/form/Radio";
import { NextPageContext } from "next";
import { loadouts, loadout_slots } from "../../../prisma/generated/client2";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { LOADOUT_TYPES } from "@store/loadout";
import Element from "@components/Element";

interface Slot {
  costume: costume;
  weapons: [weapon, weapon, weapon];
  companion: companion;
  debris: debris;
  memoirs: [memoir, memoir, memoir];
}

interface LoadoutProps {
  loadout: loadouts & {
    loadout_slots: loadout_slots[];
  };
  slots: Slot[];
}

export default function LoadoutBuilder({
  loadout,
  slots,
}: LoadoutProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title={loadout.title}
        description={loadout.description}
        cover="https://nierrein.guide/tools/loadout-builder.jpg"
      />

      <section className="p-8">
        <LoadoutInfo loadout={loadout} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {slots.map((slot, index) => (
            <CostumeSlot key={index} {...slot} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

interface LoadoutInfoProps {
  loadout: loadouts & {
    loadout_slots: loadout_slots[];
  };
}

function LoadoutInfo({ loadout }: LoadoutInfoProps) {
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    setCreatedAt(
      formatDistanceToNow(new Date(loadout.created_at), {
        addSuffix: true,
      })
    );
  }, [loadout]);

  return (
    <div className="relative bordered">
      <div className="flex items-center justify-between bg-grey-dark p-4">
        <div>
          <h2 className="text-3xl">{loadout.title}</h2>
          <p className="text-beige">Created {createdAt}</p>
        </div>
        <div className="flex gap-x-4 relative">
          {(loadout.attribute === "all" && (
            <div className="relative flex">
              <div>
                <Element size={32} type="DARK" />
              </div>
              <div className="-ml-3">
                <Element size={32} type="LIGHT" />
              </div>
              <div className="-ml-3">
                <Element size={32} type="FIRE" />
              </div>
              <div className="-ml-3">
                <Element size={32} type="WATER" />
              </div>
              <div className="-ml-3">
                <Element size={32} type="WIND" />
              </div>
            </div>
          )) || <Element size={32} type={loadout.attribute} />}

          <Radio
            name={LOADOUT_TYPES[loadout.type].label}
            value={loadout.type}
            isChecked={true}
          />
        </div>
      </div>

      <div className="bg-grey-dark p-4">
        <p className="bg-beige-darker border border-beige px-2 py-4 w-full">
          {loadout.description}
        </p>
      </div>
    </div>
  );
}

function CostumeSlot({
  costume,
  weapons,
  companion,
  debris,
  memoirs,
}: Slot): JSX.Element {
  return (
    <div className="bg-grey-foreground pb-4">
      <div className="bg-beige-active text-grey-foreground text-lg pl-2 py-1">
        Details
      </div>
      {/* CHARACTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2 mt-2">
        <h3 className="text-xl">Character</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2">
        <CostumeThumbnail
          src={`${CDN_URL}${costume?.image_path_base}battle.png`}
          alt={`${costume?.title} thumbnail`}
          rarity={RARITY[costume?.rarity]}
        />
      </div>
      {/* WEAPONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2 mt-2">
        <h3 className="text-xl">Weapons</h3>
      </div>
      <div className="grid grid-cols-3 place-items-center px-2">
        {weapons.map((weapon: weapon, weaponIndex) => (
          <WeaponThumbnail
            key={weaponIndex}
            element={weapon?.attribute}
            rarity={weapon?.rarity}
            type={weapon?.weapon_type}
            isDark={weapon?.is_ex_weapon}
            alt={weapon?.name}
            image_path={weapon?.image_path}
          />
        ))}
      </div>
      {/* COMPANION & DEBRIS */}
      <div className="grid grid-cols-3 place-items-center px-2 mt-2">
        <h3 className="text-xl">Companion</h3>
        <h3 className="text-xl col-start-3">Debris</h3>
      </div>
      <div className="px-2 grid grid-cols-3 place-items-center">
        <CompanionThumbnail companion={companion} small />
        <div className="col-start-3">
          <DebrisThumbnail {...debris} />
        </div>
      </div>
      {/* MEMOIRS */}
      <div className="grid grid-cols-3 place-items-center px-2 mt-2">
        <h3 className="text-xl">Memoirs</h3>
      </div>
      <div className="grid grid-cols-3 place-items-center px-2">
        {memoirs.map((memoir, memoirIndex) => (
          <MemoirThumbnail key={memoirIndex} {...memoir} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const loadout = await nrgprisma.loadouts.findFirst({
    where: {
      slug: context.query.slug as string,
    },
    include: {
      loadout_slots: {
        orderBy: {
          slot_position: "asc",
        },
      },
    },
  });

  /**
   * Populate slots
   */
  const slotFetches = loadout.loadout_slots.map((slot) => getSlotData(slot));
  const slots = await Promise.all(slotFetches);

  return {
    props: JSON.parse(
      JSON.stringify({
        loadout,
        slots,
      })
    ),
  };
}

async function getSlotData(slot: loadout_slots) {
  const [costume, companion, debris] = await Promise.all([
    /**
     * Get costume
     */
    slot.costume_id
      ? prisma.costume.findFirst({
          where: {
            costume_id: slot.costume_id,
          },
        })
      : null,

    /**
     * Get companion
     */
    slot.companion_id
      ? prisma.companion.findFirst({
          where: {
            companion_id: slot.companion_id,
          },
        })
      : null,

    /**
     * Get debris
     */
    slot.debris_id
      ? prisma.debris.findFirst({
          where: {
            debris_id: slot.debris_id,
          },
        })
      : null,
  ]);

  /**
   * Get weapons
   */
  const weaponsIds = [
    slot.weapon_1_id,
    slot.weapon_2_id,
    slot.weapon_3_id,
  ].filter(Boolean);

  const weapons = await Promise.all(
    weaponsIds.map((id) =>
      prisma.weapon.findFirst({
        where: {
          weapon_id: id,
        },
      })
    )
  );

  /**
   * Get memoirs
   */
  const memoirsIds = [
    slot.memoir_1_id,
    slot.memoir_2_id,
    slot.memoir_3_id,
  ].filter(Boolean);

  const memoirs = await Promise.all(
    memoirsIds.map((id) =>
      prisma.memoir.findFirst({
        where: {
          memoir_id: id,
        },
      })
    )
  );

  const fillWeapons = new Array(3 - weapons.length).fill(null);
  const formattedWeapons = [...weapons, ...fillWeapons];

  const fillMemoirs = new Array(3 - memoirs.length).fill(null);
  const formattedMemoirs = [...memoirs, ...fillMemoirs];

  return {
    costume,
    weapons: formattedWeapons,
    companion,
    debris,
    memoirs: formattedMemoirs,
  };
}
