/* eslint-disable react-hooks/rules-of-hooks */
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import React from "react";
import {
  weapon,
  weapon_ability,
  weapon_ability_link,
  weapon_skill,
  weapon_skill_link,
  weapon_stat,
} from "@prisma/client";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import Element from "@components/Element";
import WeaponThumbnail from "@components/WeaponThumbnail";
import Image from "next/image";
import weaponsIcons from "@utils/weaponsIcons";
import { useRouter } from "next/router";
import SVG from "react-inlinesvg";

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

const attributesLookup = {
  LIGHT: "Light",
  DARK: "Dark",
  FIRE: "Fire",
  WIND: "Wind",
  WATER: "Water",
};

const weaponTypesLookup = {
  SWORD: "1H Sword",
  BIG_SWORD: "2H Sword",
  FIST: "Fist",
  GUN: "Gun",
  SPEAR: "Spear",
  STAFF: "Staff",
};

export default function WeaponsPage({
  weapons,
  abilitiesLookup,
}: CharactersPageProps): JSX.Element {
  const router = useRouter();

  return (
    <Layout hasContainer={false}>
      <Meta
        title="Weapons"
        description="All the weapons of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-weapons.jpg"
      />

      <section className="mx-auto p-6">
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
              field: "weapon_stat[0].hp",
              title: "HP",
              type: "numeric",
              cellStyle: {
                textAlign: "center",
              },
              customFilterAndSearch: (term, weapon) =>
                weapon.weapon_stat[0].hp >= Number(term),
            },
            {
              field: "weapon_stat[0].atk",
              title: "ATK",
              type: "numeric",
              cellStyle: {
                textAlign: "center",
              },
              customFilterAndSearch: (term, weapon) =>
                weapon.weapon_stat[0].atk >= Number(term),
            },
            {
              field: "weapon_stat[0].vit",
              title: "DEF",
              type: "numeric",
              cellStyle: {
                textAlign: "center",
              },
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
                return term.includes(
                  weapon.weapon_ability_link?.[0]?.weapon_ability.name
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
                return term.includes(
                  weapon.weapon_ability_link?.[1]?.weapon_ability.name
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
                    <SVG src="/icons/weapons/dark.svg" className="h-8 w-8" />
                  ) : (
                    <span>No</span>
                  )}
                </>
              ),
            },
            {
              field: "weapon_stat[0].level",
              title: "Level",
              type: "numeric",
              cellStyle: {
                textAlign: "center",
              },
            },
          ]}
          options={{
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
          onRowClick={(event, weapon) => router.push(`/weapons/${weapon.slug}`)}
        />
      </section>
    </Layout>
  );
}
