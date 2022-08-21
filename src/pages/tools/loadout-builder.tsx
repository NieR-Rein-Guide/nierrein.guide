import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Radio from "@components/form/Radio";
import { LOADOUT_TYPES, useLoadoutStore } from "@store/loadout";
import WeaponThumbnail from "@components/WeaponThumbnail";
import CostumeThumbnail from "@components/CostumeThumbnail";
import CompanionThumbnail from "@components/CompanionThumbnail";
import DebrisThumbnail from "@components/DebrisThumbnail";
import { useEffect } from "react";
import prisma from "@libs/prisma";
import Modal from "@mui/material/Modal";
import { companion, costume, debris, memoir, weapon } from "@prisma/client";
import MaterialTable from "@material-table/core";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import SVG from "react-inlinesvg";
import { rarityLookup, weaponTypesLookup } from "@components/pages/costumes";
import Star from "@components/decorations/Star";
import weaponsIcons from "@utils/weaponsIcons";
import Image from "next/image";
import Element from "@components/Element";
import { attributesLookup } from "@components/pages/weapons";
import {
  DEBRIS_RARITY,
  rarityLookup as debrisRarityLookup,
} from "pages/database/debris";
import MemoirThumbnail from "@components/MemoirThumbnail";

interface LoadoutBuilderProps {
  costumes: costume[];
  weapons: weapon[];
  companions: companion[];
  debris: debris[];
  memoirs: (memoir & {
    memoir_series: {
      name: string;
      large_set_description: string;
    };
  })[];
  memoirsSetLookup;
}

export default function LoadoutBuilder({
  costumes,
  weapons,
  companions,
  debris,
  memoirs,
  memoirsSetLookup,
}: LoadoutBuilderProps): JSX.Element {
  /**
   * Loadout slots
   */
  const slots = useLoadoutStore((state) => state.slots);

  /**
   * Select a costume
   */
  const setCostume = useLoadoutStore((state) => state.setCostume);
  const costumeModal = useLoadoutStore((state) => state.costumeModal);
  const setCostumeModal = useLoadoutStore((state) => state.setCostumeModal);

  /**
   * Select up to 3 weapons
   */
  const weaponsModal = useLoadoutStore((state) => state.weaponsModal);
  const setWeaponsModal = useLoadoutStore((state) => state.setWeaponsModal);
  const setWeapon = useLoadoutStore((state) => state.setWeapon);

  /**
   * Companion
   */
  const companionModal = useLoadoutStore((state) => state.companionModal);
  const setCompanionModal = useLoadoutStore((state) => state.setCompanionModal);
  const setCompanion = useLoadoutStore((state) => state.setCompanion);

  /**
   * Debris
   */
  const debrisModal = useLoadoutStore((state) => state.debrisModal);
  const setDebrisModal = useLoadoutStore((state) => state.setDebrisModal);
  const setDebris = useLoadoutStore((state) => state.setDebris);

  /**
   * Memoirs
   */
  const memoirsModal = useLoadoutStore((state) => state.memoirsModal);
  const setMemoirsModal = useLoadoutStore((state) => state.setMemoirsModal);
  const setMemoir = useLoadoutStore((state) => state.setMemoir);

  return (
    <Layout>
      <Meta
        title="Loadout Builder"
        description="Build your own loadout."
        cover="https://nierrein.guide/tools/loadout-builder.jpg"
      />

      <section className="p-8">
        <LoadoutSettings />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {slots.map((slot, index) => (
            <CostumeSlot key={index} index={index} />
          ))}
        </div>
      </section>

      {/* Modals for selection */}
      {/* MODAL COSTUMES */}
      <Modal
        open={costumeModal}
        onClose={() => setCostumeModal(0, false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <MaterialTable
          title={`${costumes.length} costumes in the database.`}
          data={costumes}
          columns={[
            {
              field: "title",
              title: "Title",
              type: "string",
              render: (costume) => (
                <div className="flex items-center gap-x-4 w-80">
                  <CostumeThumbnail
                    src={`${CDN_URL}${costume.image_path_base}battle.png`}
                    alt={`${costume.title} thumbnail`}
                    rarity={RARITY[costume.rarity]}
                  />
                  <span>{costume.title}</span>
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
            grouping: true,
            searchFieldAlignment: "right",
            filtering: true,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200, 500],
          }}
          onRowClick={(event, costume) => setCostume(costume)}
        />
      </Modal>

      {/* MODAL WEAPONS */}
      <Modal
        open={weaponsModal}
        onClose={() => setWeaponsModal(0, false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <MaterialTable
          title={`${weapons.length} weapons in the database.`}
          data={weapons}
          columns={[
            {
              field: "name",
              title: "Name",
              type: "string",
              render: (weapon) => (
                <div className="flex items-center gap-x-4 w-80">
                  <WeaponThumbnail
                    element={weapon.attribute}
                    rarity={weapon.rarity}
                    type={weapon.weapon_type}
                    isDark={weapon.is_ex_weapon}
                    alt={weapon.name}
                    image_path={weapon.image_path}
                  />
                  <span>{weapon.name}</span>
                </div>
              ),
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
              customFilterAndSearch: (term, weapon) => {
                if (term.length === 0) return true;
                return term.includes(weapon.rarity);
              },
              render: (weapon) => (
                <div className="w-8 h-8 mx-auto">
                  <Star rarity={RARITY[weapon.rarity]} />
                </div>
              ),
            },
          ]}
          options={{
            grouping: true,
            searchFieldAlignment: "right",
            filtering: true,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200, 500],
          }}
          onRowClick={(event, weapon) => setWeapon(weapon)}
        />
      </Modal>

      {/* MODAL COMPANIONS */}
      <Modal
        open={companionModal}
        onClose={() => setCompanionModal(0, false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <MaterialTable
          title={`${companions.length} companions in the database.`}
          data={companions}
          columns={[
            {
              field: "type",
              title: "Type",
            },
            {
              field: "name",
              title: "Name",
              render: (companion) => (
                <div className="flex items-center gap-x-4 w-80">
                  <CompanionThumbnail companion={companion} small />
                  <span>{companion.name}</span>
                </div>
              ),
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
          ]}
          options={{
            grouping: true,
            searchFieldAlignment: "right",
            filtering: true,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200, 500],
          }}
          onRowClick={(event, companion) => setCompanion(companion)}
        />
      </Modal>

      {/* MODAL DEBRIS */}
      <Modal
        open={debrisModal}
        onClose={() => setDebrisModal(0, false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <MaterialTable
          title={`${debris.length} debris in the database.`}
          data={debris}
          columns={[
            {
              field: "name",
              title: "Name",
              render: (debris) => (
                <div className="flex items-center gap-x-4 w-80">
                  <DebrisThumbnail {...debris} />
                  <span>{debris.name.split("Debris:")[1]}</span>
                </div>
              ),
            },
            {
              field: "ability",
              title: "Ability",
              lookup: { 0: "WIP" },
              render: () => <span>WIP</span>,
            },
            {
              field: "rarity",
              title: "Rarity",
              lookup: debrisRarityLookup,
              customFilterAndSearch: (term, debris) => {
                if (term.length === 0) return true;
                return term.includes(debris.rarity.toString());
              },
              render: (debris) => (
                <div className="w-8 h-8 mx-auto">
                  <Star rarity={DEBRIS_RARITY[debris.rarity]} />
                </div>
              ),
            },
            {
              field: "release_time",
              title: "Released date",
              type: "datetime",
              customFilterAndSearch: (term, debris) => {
                return term < new Date(debris.release_time);
              },
            },
          ]}
          options={{
            grouping: true,
            searchFieldAlignment: "right",
            filtering: true,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200, 500],
          }}
          onRowClick={(event, debris) => setDebris(debris)}
        />
      </Modal>

      {/* MEMOIRS DEBRIS */}
      <Modal
        open={memoirsModal}
        onClose={() => setMemoirsModal(0, 0, false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <MaterialTable
          title={`${memoirs.length} memoirs in the database.`}
          data={memoirs}
          columns={[
            {
              field: "memoir_series.name",
              title: "Set",
              lookup: memoirsSetLookup,
              customFilterAndSearch: (term, memoir) => {
                if (term.length === 0) return true;
                return term.includes(memoir.memoir_series.name);
              },
            },
            {
              field: "name",
              render: (memoir) => (
                <div className="flex items-center gap-x-4 w-80">
                  <MemoirThumbnail {...memoir} />
                  <span>{memoir.name}</span>
                </div>
              ),
            },
            {
              field: "memoir_series.large_set_description",
              title: "Description",
            },
          ]}
          options={{
            grouping: true,
            searchFieldAlignment: "right",
            filtering: true,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100, 200, 500],
          }}
          onRowClick={(event, memoir) => setMemoir(memoir)}
        />
      </Modal>
    </Layout>
  );
}

function LoadoutSettings() {
  const setSlotSize = useLoadoutStore((state) => state.setSlotSize);

  const title = useLoadoutStore((state) => state.title);
  const setTitle = useLoadoutStore((state) => state.setTitle);

  const type = useLoadoutStore((state) => state.type);
  const setType = useLoadoutStore((state) => state.setType);

  const description = useLoadoutStore((state) => state.description);
  const setDescription = useLoadoutStore((state) => state.setDescription);

  useEffect(() => {
    setSlotSize(LOADOUT_TYPES[type].slotSize);
  }, [type, setSlotSize]);

  return (
    <div>
      <div className="flex items-center justify-between bg-grey-dark relative bordered p-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex  gap-x-4 relative">
          {Object.entries(LOADOUT_TYPES).map(([key, currentType]) => (
            <div key={key} className="relative">
              <Radio
                name={currentType.label}
                value={key}
                isChecked={type === key}
                setState={setType}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-grey-dark p-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

interface CostumeSlotProps {
  index: number;
}

function CostumeSlot({ index }: CostumeSlotProps): JSX.Element {
  /**
   * Current slot in the loadout.
   */
  const slot = useLoadoutStore((state) => state.slots[index]);

  /**
   * Methods to open the selection modal for this item.
   */
  const setCostumeModal = useLoadoutStore((state) => state.setCostumeModal);
  const setWeaponsModal = useLoadoutStore((state) => state.setWeaponsModal);
  const setCompanionModal = useLoadoutStore((state) => state.setCompanionModal);
  const setDebrisModal = useLoadoutStore((state) => state.setDebrisModal);
  const setMemoirsModal = useLoadoutStore((state) => state.setMemoirsModal);

  return (
    <div className="bg-grey-foreground">
      <div className="bg-beige-active text-grey-foreground text-lg pl-2 py-1">
        Details
      </div>
      {/* CHARACTER */}
      <div>
        <h3 className="text-xl">Character</h3>
        <CostumeThumbnail
          onClick={() => setCostumeModal(index, true)}
          src={`${CDN_URL}${slot.costume?.image_path_base}battle.png`}
          alt={`${slot.costume?.title} thumbnail`}
          rarity={RARITY[slot.costume?.rarity]}
        />
      </div>
      {/* WEAPONS */}
      <div>
        <h3 className="text-xl">Weapons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {slot.weapons.map((weapon: weapon, weaponIndex) => (
            <WeaponThumbnail
              key={`${index}-${weaponIndex}`}
              onClick={() => setWeaponsModal(index, weaponIndex, true)}
              element={weapon?.attribute}
              rarity={weapon?.rarity}
              type={weapon?.weapon_type}
              isDark={weapon?.is_ex_weapon}
              alt={weapon?.name}
              image_path={weapon?.image_path}
            />
          ))}
        </div>
      </div>
      {/* COMPANION & DEBRIS */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <h3 className="text-xl">Companion</h3>
          <CompanionThumbnail
            onClick={() => setCompanionModal(index, true)}
            companion={slot.companion}
            small
          />
        </div>
        <div className="col-start-3">
          <h3 className="text-xl">Debris</h3>
          <DebrisThumbnail
            onClick={() => setDebrisModal(index, true)}
            {...slot.debris}
          />
        </div>
      </div>
      {/* MEMOIRS */}
      <div>
        <h3 className="text-xl">Memoirs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {slot.memoirs.map((memoir, memoirIndex) => (
            <MemoirThumbnail
              onClick={() => setMemoirsModal(index, memoirIndex, true)}
              key={`${index}-${memoirIndex}`}
              {...memoir}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const [costumes, weapons, companions, debris, memoirs, memoirsLookupData] =
    await Promise.all([
      prisma.costume.findMany({
        orderBy: {
          release_time: "asc",
        },
      }),
      prisma.weapon.findMany({
        orderBy: {
          release_time: "asc",
        },
        where: {
          evolution_order: 1,
        },
      }),
      prisma.companion.findMany({
        orderBy: {
          release_time: "asc",
        },
      }),
      prisma.debris.findMany({
        orderBy: {
          release_time: "asc",
        },
      }),
      prisma.memoir.findMany({
        where: {
          lottery_id: 5,
          rarity: "SS_RARE",
        },
        include: {
          memoir_series: {
            select: {
              large_set_description: true,
              name: true,
            },
          },
        },
      }),
      prisma.memoir_series.findMany({
        orderBy: {
          memoir_series_id: "asc",
        },
        select: {
          name: true,
        },
      }),
    ]);

  const memoirsSetLookup = memoirsLookupData.reduce((acc, current) => {
    acc[current.name] = current.name;
    return acc;
  }, {});

  return {
    props: JSON.parse(
      JSON.stringify({
        costumes,
        weapons,
        companions,
        debris,
        memoirs,
        memoirsSetLookup,
      })
    ),
  };
}
