import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Radio from "@components/form/Radio";
import { LOADOUT_TYPES, useLoadoutStore } from "@store/loadout";
import WeaponThumbnail from "@components/WeaponThumbnail";
import CostumeThumbnail from "@components/CostumeThumbnail";
import CompanionThumbnail from "@components/CompanionThumbnail";
import DebrisThumbnail from "@components/DebrisThumbnail";
import { useEffect, useState } from "react";
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
import { BtnSecondary } from "@components/btn";
import toast from "react-hot-toast";
import axios from "axios";

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

        <LoadoutSave />
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
    <div className="relative bordered">
      <div className="flex items-center justify-between bg-grey-dark p-4">
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

function LoadoutSave() {
  const [loading, setLoading] = useState(false);
  const loadout = useLoadoutStore((state) => ({
    title: state.title,
    description: state.description,
    type: state.type,
    slots: state.slots,
  }));

  async function saveLoadout() {
    if (loading) return;

    try {
      setLoading(true);
      console.log(loadout);
      const custom = {
        title: "My Loadout",
        description: "Description of the loadout",
        type: "quests",
        slots: [
          {
            costume: {
              costume_id: 24000,
              character_id: 1019,
              emblem_id: null,
              weapon_type: "FIST",
              rarity: "S_RARE",
              release_time: "2021-07-28T22:00:00.000Z",
              is_ex_costume: false,
              slug: "dissenting-girl",
              title: "Dissenting Girl",
              description:
                "XX/XX. Morning clouds, afternoon showers.\\n\\nIt looked like rain today, so I stayed home and finished the book I\\nborrowed from the library! It was an adventure story that took place\\nat sea. I've never seen the sea, but the book says it's salty.\\nI know I'm just a kid, but there's still so much I don't know—maybe\\nI'll go borrow an ocean encyclopedia if it's sunny tomorrow!",
              image_path_base: "ui/costume/ch019004/ch019004_",
              tableData: {
                index: 0,
                id: 0,
                uuid: "1974f0e1-f1d5-4413-8e27-080bdbcd7bea",
              },
            },
            weapons: [
              {
                weapon_id: 330011,
                evolution_group_id: 33001,
                evolution_order: 1,
                weapon_type: "SWORD",
                rarity: "SS_RARE",
                attribute: "WIND",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "blade-of-judgment",
                name: "Blade of Judgment",
                image_path: "ui/weapon/wp001108/wp001108_",
                tableData: {
                  index: 0,
                  id: 0,
                  uuid: "ed7d123d-1606-4e5f-9850-9be11e7740d7",
                },
              },
              {
                weapon_id: 250011,
                evolution_group_id: 25001,
                evolution_order: 1,
                weapon_type: "SWORD",
                rarity: "S_RARE",
                attribute: "DARK",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "desolate-loss",
                name: "Desolate Loss",
                image_path: "ui/weapon/wp001509/wp001509_",
                tableData: {
                  index: 7,
                  id: 7,
                  uuid: "baad241d-0a52-4f0f-9cbc-a00d0bb1eb77",
                },
              },
              {
                weapon_id: 320101,
                evolution_group_id: 32010,
                evolution_order: 1,
                weapon_type: "FIST",
                rarity: "SS_RARE",
                attribute: "WATER",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "angels-folly",
                name: "Angel's Folly",
                image_path: "ui/weapon/wp004007/wp004007_",
                tableData: {
                  index: 1,
                  id: 1,
                  uuid: "1830b1b1-efc7-49e3-9115-b4afa01e347f",
                },
              },
            ],
            companion: {
              companion_id: 13,
              attribute: "WATER",
              type: "2",
              release_time: "2021-07-28T22:00:00.000Z",
              name: "Tome: Belief & Heart",
              story:
                "A book detailing the world's faiths. It records all the\\nvarious things people have believed throughout history,\\nand the prayers and wishes contained within are the\\nvery picture of the human heart.\\n\\nAt the same time, the actions of its subjects are\\nwildly inconsistent, making it a source of\\nendless entertainment.",
              image_path_base: "ui/companion/cm003003/cm003003_",
              tableData: {
                index: 0,
                id: 0,
                uuid: "031568e7-e50d-4519-8a9b-e4d2c0e00fe2",
              },
            },
            debris: {
              debris_id: 20310212,
              rarity: 40,
              release_time: "2022-06-29T02:00:00.000Z",
              name: "Debris: Liquid Boon Chunk",
              image_path_base: "ui/companion/101102/101102.png",
              tableData: {
                index: 0,
                id: 0,
                uuid: "0e523661-28e3-408a-b329-6b7193ead0fb",
              },
            },
            memoirs: [
              {
                memoir_id: 700,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-10-14T02:00:00.000Z",
                name: "My Future",
                story:
                  'Article V: Tax Revenue and Obligation of Payment\\n\\nNobles earn tax revenue from Commoners who live in their territories.\\nCommoners must pay 40% of all wages as tax.\\n\\nGoat People, classified separately from both, must pay 40% of\\nwages to ruling Nobles and 20% to public projects.\\n\\n<align="right">"The Revised Lawbook of the Noble Assembly"',
                image_path_base: "ui/memory/memory035/memory035_",
                memoir_series_id: 12,
                memoir_series: {
                  large_set_description:
                    "Atk/def up by 30% for 30 sec. when HP is below 50%. Once only.",
                  name: "The Worker's Foundation",
                },
                tableData: {
                  index: 0,
                  id: 0,
                  uuid: "ef41f8ef-86d9-4058-8a5f-a23819d9e1c4",
                },
              },
              {
                memoir_id: 720,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-10-14T02:00:00.000Z",
                name: "My Heart",
                story:
                  'Article VIII: Provisions of Suffrage\\n\\nAll Nobles may stand for the Assembly after coming of age.\\nCommoners require the approval of ten Noble Assemblypersons in\\norder to stand for Assembly candidacy.\\n\\nGoat People are forbidden from entering the Assembly district.\\n\\n<align="right">"The Revised Lawbook of the Noble Assembly"',
                image_path_base: "ui/memory/memory036/memory036_",
                memoir_series_id: 12,
                memoir_series: {
                  large_set_description:
                    "Atk/def up by 30% for 30 sec. when HP is below 50%. Once only.",
                  name: "The Worker's Foundation",
                },
                tableData: {
                  index: 3,
                  id: 3,
                  uuid: "78e1dcdb-4c3f-46bc-80d7-02f995c4a6a1",
                },
              },
              {
                memoir_id: 680,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-10-14T02:00:00.000Z",
                name: "My Place",
                story:
                  'Article III: Choice and Obligation of Labor\\n\\nNobles are excused from labor due to their land assets, but may\\nselectively pursue labor. Commoners, classified separately from\\nNobles, must engage in labor from sunrise to sunset.\\n\\nParticipation in official work is not recognized for Goat People,\\nwho are classified separately from both. \\n\\n<align="right">"The Revised Lawbook of the Noble Assembly"',
                image_path_base: "ui/memory/memory034/memory034_",
                memoir_series_id: 12,
                memoir_series: {
                  large_set_description:
                    "Atk/def up by 30% for 30 sec. when HP is below 50%. Once only.",
                  name: "The Worker's Foundation",
                },
                tableData: {
                  index: 1,
                  id: 1,
                  uuid: "9f991f67-6399-4bb1-b092-b4f8618ee6f2",
                },
              },
            ],
          },
          {
            costume: {
              costume_id: 35000,
              character_id: 1001,
              emblem_id: 99,
              weapon_type: "SWORD",
              rarity: "SS_RARE",
              release_time: "2021-07-28T22:00:00.000Z",
              is_ex_costume: false,
              slug: "divergent-battler",
              title: "Divergent Battler",
              description:
                "I was assigned to kill machine lifeforms, so I do.\\n\\nIt is my fate to be perpetually trapped in a never-ending spiral of\\nlife and death.\\n\\n...But what do I fight for now? I should be free,\\nbut I feel like I've forgotten something—some vital goal.",
              image_path_base: "ui/costume/ch001002/ch001002_",
              tableData: {
                index: 4,
                id: 4,
                uuid: "437b68a1-c941-4efd-b113-c5616ae54f16",
              },
            },
            weapons: [
              {
                weapon_id: 230011,
                evolution_group_id: 23001,
                evolution_order: 1,
                weapon_type: "SWORD",
                rarity: "S_RARE",
                attribute: "WIND",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "beastbain",
                name: "Beastbain",
                image_path: "ui/weapon/wp001003/wp001003_",
                tableData: {
                  index: 22,
                  id: 22,
                  uuid: "6ab3900f-d41b-41dd-9384-4a1fe9029b64",
                },
              },
              {
                weapon_id: 220091,
                evolution_group_id: 22009,
                evolution_order: 1,
                weapon_type: "BIG_SWORD",
                rarity: "S_RARE",
                attribute: "WATER",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "courtly-loyalty",
                name: "Courtly Loyalty",
                image_path: "ui/weapon/wp003114/wp003114_",
                tableData: {
                  index: 24,
                  id: 24,
                  uuid: "d89bdbb3-e34d-48f8-9daa-b8171d9d442c",
                },
              },
              {
                weapon_id: 130031,
                evolution_group_id: 13003,
                evolution_order: 1,
                weapon_type: "FIST",
                rarity: "RARE",
                attribute: "WIND",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "emerald-gauntlet",
                name: "Emerald Gauntlet",
                image_path: "ui/weapon/wp004052/wp004052_",
                tableData: {
                  index: 21,
                  id: 21,
                  uuid: "5ca455c5-def9-4e17-90a5-10ed6fe84e02",
                },
              },
            ],
            companion: {
              companion_id: 18,
              attribute: "WATER",
              type: "4",
              release_time: "2021-07-28T22:00:00.000Z",
              name: "Spirit: Reïs",
              story:
                "A spirit that governs the sea. Long a symbol of\\nmystery, its abyssal depths hide a world where\\nnot even light can reach, and where only select\\ncreatures eke out existence.\\n\\nThe sea is a paradise for countless creatures and\\nan indispensable resource for humanity, and yet\\nhumanity is also responsible for sullying it.",
              image_path_base: "ui/companion/cm004003/cm004003_",
              tableData: {
                index: 6,
                id: 6,
                uuid: "69cc074c-807e-469c-af56-34971a6e9ae3",
              },
            },
            debris: {
              debris_id: 30220412,
              rarity: 40,
              release_time: "2022-06-29T02:00:00.000Z",
              name: "Debris: Lucid Haste Chunk",
              image_path_base: "ui/companion/107204/107204.png",
              tableData: {
                index: 23,
                id: 23,
                uuid: "d3602f21-ac83-4b6e-8577-a9817c55b2c9",
              },
            },
            memoirs: [
              {
                memoir_id: 700,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-10-14T02:00:00.000Z",
                name: "My Future",
                story:
                  'Article V: Tax Revenue and Obligation of Payment\\n\\nNobles earn tax revenue from Commoners who live in their territories.\\nCommoners must pay 40% of all wages as tax.\\n\\nGoat People, classified separately from both, must pay 40% of\\nwages to ruling Nobles and 20% to public projects.\\n\\n<align="right">"The Revised Lawbook of the Noble Assembly"',
                image_path_base: "ui/memory/memory035/memory035_",
                memoir_series_id: 12,
                memoir_series: {
                  large_set_description:
                    "Atk/def up by 30% for 30 sec. when HP is below 50%. Once only.",
                  name: "The Worker's Foundation",
                },
                tableData: {
                  index: 0,
                  id: 0,
                  uuid: "7d62ed9c-f830-414e-8911-7a6a17c674b2",
                },
              },
              {
                memoir_id: 680,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-10-14T02:00:00.000Z",
                name: "My Place",
                story:
                  'Article III: Choice and Obligation of Labor\\n\\nNobles are excused from labor due to their land assets, but may\\nselectively pursue labor. Commoners, classified separately from\\nNobles, must engage in labor from sunrise to sunset.\\n\\nParticipation in official work is not recognized for Goat People,\\nwho are classified separately from both. \\n\\n<align="right">"The Revised Lawbook of the Noble Assembly"',
                image_path_base: "ui/memory/memory034/memory034_",
                memoir_series_id: 12,
                memoir_series: {
                  large_set_description:
                    "Atk/def up by 30% for 30 sec. when HP is below 50%. Once only.",
                  name: "The Worker's Foundation",
                },
                tableData: {
                  index: 1,
                  id: 1,
                  uuid: "cb86d0dd-9a29-47d1-8ba1-d4406410aa69",
                },
              },
              {
                memoir_id: 660,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-08-19T02:00:00.000Z",
                name: "A Fleeting Dream",
                story:
                  "Dear Mom,\\n \\nThanks for the letter. Sorry I couldn't write back last month—I'm\\nsure Dad has told you already, but my symptoms aren't good.\\nStill, the researchers are all working hard, so don't worry about\\nme, okay?\\n \\n<align=\"right\">\"A Letter to a Mother (2012)\"</align>",
                image_path_base: "ui/memory/memory033/memory033_",
                memoir_series_id: 11,
                memoir_series: {
                  large_set_description:
                    "Increases chance normal atk will be 3-chain or more by 10%.",
                  name: "Ephemeral Memories",
                },
                tableData: {
                  index: 4,
                  id: 4,
                  uuid: "9b0d787e-a5c3-41d1-be61-9a010e62ce89",
                },
              },
            ],
          },
          {
            costume: {
              costume_id: 33000,
              character_id: 1009,
              emblem_id: 5,
              weapon_type: "SWORD",
              rarity: "SS_RARE",
              release_time: "2021-07-28T22:00:00.000Z",
              is_ex_costume: false,
              slug: "abstract-hunter",
              title: "Abstract Hunter",
              description:
                "The one most loathsome. The object of my revenge.\\nI turn anger into strength, hate into might.\\nI am painted in brown and dirtied blood.\\nMy hollow heart is slowly fulfilled.\\nThe darkened armor that protects me grows ever blacker.\\n\\nI am now...a splendid killer.",
              image_path_base: "ui/costume/ch009002/ch009002_",
              tableData: {
                index: 16,
                id: 16,
                uuid: "8d168cce-18d2-4b9e-be63-b032647eeec6",
              },
            },
            weapons: [
              {
                weapon_id: 340101,
                evolution_group_id: 34010,
                evolution_order: 1,
                weapon_type: "BIG_SWORD",
                rarity: "SS_RARE",
                attribute: "LIGHT",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "virtuous-treaty",
                name: "Virtuous Treaty",
                image_path: "ui/weapon/wp003011/wp003011_",
                tableData: {
                  index: 79,
                  id: 79,
                  uuid: "7ee4cafa-d9ab-4c7a-8e02-277e24757d1a",
                },
              },
              {
                weapon_id: 330031,
                evolution_group_id: 33003,
                evolution_order: 1,
                weapon_type: "BIG_SWORD",
                rarity: "SS_RARE",
                attribute: "WIND",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "wretched-greatsword",
                name: "Wretched Greatsword",
                image_path: "ui/weapon/wp003102/wp003102_",
                tableData: {
                  index: 87,
                  id: 87,
                  uuid: "78b75074-848a-43f8-948f-552b551aa059",
                },
              },
              {
                weapon_id: 350001,
                evolution_group_id: 35000,
                evolution_order: 1,
                weapon_type: "SWORD",
                rarity: "SS_RARE",
                attribute: "DARK",
                is_ex_weapon: false,
                release_time: "2021-07-28T22:00:00.000Z",
                slug: "tormented-eviscerator",
                name: "Tormented Eviscerator",
                image_path: "ui/weapon/wp001112/wp001112_",
                tableData: {
                  index: 89,
                  id: 89,
                  uuid: "37e73633-49c8-4f5c-a818-d129ab5854e5",
                },
              },
            ],
            companion: {
              companion_id: 28,
              attribute: "LIGHT",
              type: "6",
              release_time: "2021-07-28T22:00:00.000Z",
              name: "Mech: Mock-Up Pod",
              story:
                "An odd sample unit created in a distant world by a\\nfamous product designer during a eureka moment.\\n\\nAs it was patched together with makeshift parts,\\nit has a somewhat clunky look—but only the\\ngreatest of churls would dare complain about\\nsuch a thing with a mock-up.",
              image_path_base: "ui/companion/cm006003/cm006003_",
              tableData: {
                index: 2,
                id: 2,
                uuid: "0756e0b5-dead-492a-b3b6-4d1ea4192232",
              },
            },
            debris: {
              debris_id: 30220312,
              rarity: 40,
              release_time: "2022-06-29T02:00:00.000Z",
              name: "Debris: Tempest Haste Chunk",
              image_path_base: "ui/companion/107203/107203.png",
              tableData: {
                index: 24,
                id: 24,
                uuid: "507c8aab-2a21-45e5-b564-67d4fd92e000",
              },
            },
            memoirs: [
              {
                memoir_id: 620,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-08-19T02:00:00.000Z",
                name: "A Fleeting Voice",
                story:
                  "Dear Mom,\\n \\nWell, I'm settling into my new life. Dad says he's sorry he doesn't\\nknow when I can go home, but I'm sure he can cure me. I really\\nwant to get better and come see everyone again soon.\\n \\n<align=\"right\">\"A Letter to a Mother (2003)\"</align>",
                image_path_base: "ui/memory/memory031/memory031_",
                memoir_series_id: 11,
                memoir_series: {
                  large_set_description:
                    "Increases chance normal atk will be 3-chain or more by 10%.",
                  name: "Ephemeral Memories",
                },
                tableData: {
                  index: 8,
                  id: 8,
                  uuid: "b7d652ce-6d62-4776-977f-0a9b95b46764",
                },
              },
              {
                memoir_id: 220,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-07-28T22:00:00.000Z",
                name: "Prey",
                story:
                  'I know him. I saw the whole thing! A streetside killer moved to\\nattack the guy right as some poor woman was passing by.\\nBut before I could even call for help, the woman had gone and\\ncut the killer down!\\n\\nShe saved that man, sure as I\'m standing here.\\n\\n<align="right">"Regarding a Death (A Young Woman\'s Testimony)"',
                image_path_base: "ui/memory/memory011/memory011_",
                memoir_series_id: 4,
                memoir_series: {
                  large_set_description: "Critical hit damage up by 40%.",
                  name: "The Wanted Man",
                },
                tableData: {
                  index: 24,
                  id: 24,
                  uuid: "77b9c7d5-5dc5-4d13-81ea-d016ecee6618",
                },
              },
              {
                memoir_id: 220,
                lottery_id: 5,
                rarity: "SS_RARE",
                release_time: "2021-07-28T22:00:00.000Z",
                name: "Prey",
                story:
                  'I know him. I saw the whole thing! A streetside killer moved to\\nattack the guy right as some poor woman was passing by.\\nBut before I could even call for help, the woman had gone and\\ncut the killer down!\\n\\nShe saved that man, sure as I\'m standing here.\\n\\n<align="right">"Regarding a Death (A Young Woman\'s Testimony)"',
                image_path_base: "ui/memory/memory011/memory011_",
                memoir_series_id: 4,
                memoir_series: {
                  large_set_description: "Critical hit damage up by 40%.",
                  name: "The Wanted Man",
                },
                tableData: {
                  index: 24,
                  id: 24,
                  uuid: "746417c1-4179-4ee2-bea9-a40575d446fb",
                },
              },
            ],
          },
        ],
      };
      const response = await axios.post("/api/loadouts", {
        loadout: custom,
      });
      console.log(response);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-8">
      {(loading && <BtnSecondary>Loading...</BtnSecondary>) || (
        <BtnSecondary onClick={saveLoadout}>Save</BtnSecondary>
      )}
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
          onClick={() => setCostumeModal(index, true)}
          src={`${CDN_URL}${slot.costume?.image_path_base}battle.png`}
          alt={`${slot.costume?.title} thumbnail`}
          rarity={RARITY[slot.costume?.rarity]}
        />
      </div>
      {/* WEAPONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2 mt-2">
        <h3 className="text-xl">Weapons</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2">
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
      {/* COMPANION & DEBRIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2 mt-2">
        <h3 className="text-xl">Companion</h3>
        <h3 className="text-xl col-start-3">Debris</h3>
      </div>
      <div className="px-2 grid grid-cols-1 md:grid-cols-3 place-items-center">
        <CompanionThumbnail
          onClick={() => setCompanionModal(index, true)}
          companion={slot.companion}
          small
        />
        <div className="col-start-3">
          <DebrisThumbnail
            onClick={() => setDebrisModal(index, true)}
            {...slot.debris}
          />
        </div>
      </div>
      {/* MEMOIRS */}
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2 mt-2">
        <h3 className="text-xl">Memoirs</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center px-2">
        {slot.memoirs.map((memoir, memoirIndex) => (
          <MemoirThumbnail
            onClick={() => setMemoirsModal(index, memoirIndex, true)}
            key={`${index}-${memoirIndex}`}
            {...memoir}
          />
        ))}
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
