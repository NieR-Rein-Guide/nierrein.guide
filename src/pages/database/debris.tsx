import Layout from "@components/Layout";
import Meta from "@components/Meta";
import prisma from "@libs/prisma";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import DebrisThumbnail from "@components/DebrisThumbnail";
import Star from "@components/decorations/Star";
import {
  character,
  costume,
  costume_ability,
  costume_ability_link,
  costume_skill,
  costume_skill_link,
  costume_stat,
  debris,
} from "@prisma/client";
import DatabaseNavbar from "@components/DatabaseNavbar";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import { costumes_link } from "@prisma/client-nrg";
import { AiOutlinePushpin } from "react-icons/ai";
import { usePanelStore } from "@store/panels";
import classNames from "classnames";
import { useSettingsStore } from "@store/settings";
import { useEffect, useState } from "react";
import { CharacterDiamond } from "@components/characters/CharacterRows";
import { Checkbox } from "@mui/material";

interface DebrisPageProps {
  debris: (debris & {
    costume: (costume & {
      character: character;
    })[];
    character: character[];
  })[];
  links: costumes_link[];
  costumes: (costume & {
    costume_ability_link: (costume_ability_link & {
      costume_ability: costume_ability;
    })[];
    character: character;
    costume_skill_link: (costume_skill_link & {
      costume_skill: costume_skill;
    })[];
    costume_stat: costume_stat[];
  })[];
}

export const DEBRIS_RARITY = {
  RARE: 2,
  S_RARE: 3,
  SS_RARE: 4,
};

export const rarityLookup = {
  20: "2*",
  30: "3*",
  40: "4*",
};

export default function DebrisPage({ debris }: DebrisPageProps): JSX.Element {
  const region = useSettingsStore((state) => state.region);
  const addCostumePanel = usePanelStore((state) => state.addCostume);
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );
  const [filteredDebris, setFilteredDebris] = useState(
    debris.filter((thought) => {
      if (showUnreleasedContent) return true;
      return new Date() > new Date(thought.release_time);
    })
  );

  useEffect(() => {
    setFilteredDebris(
      debris.filter((thought) => {
        if (showUnreleasedContent) return true;
        return new Date() > new Date(thought.release_time);
      })
    );
  }, [showUnreleasedContent, region]);

  return (
    <Layout className="overflow-x-auto">
      <Meta
        title="Debris - Database"
        description="List of debris."
        cover="https://nierrein.guide/database/debris.jpg"
      />

      <section className="mx-auto p-6">
        <DatabaseNavbar />
        <MaterialTable
          title={`${filteredDebris.length} debris in the database.`}
          data={filteredDebris}
          columns={[
            {
              field: "name",
              title: "Name",
              render: (thought) => (
                <div className="flex items-center gap-x-4 w-80">
                  <DebrisThumbnail {...thought} />
                  <span>{thought.name.split("Debris:")[1]}</span>
                </div>
              ),
            },
            {
              field: "description_long",
              title: "Description",
            },
            {
              field: "costume",
              title: "Costume or Character",
              render: (thought) => {
                return (
                  <div className="flex items-center gap-x-4 w-80">
                    {thought.costume.map((costume) => (
                      <div
                        className={classNames(
                          "group flex flex-col items-center gap-y-2 relative font-mono w-32"
                        )}
                        key={costume.costume_id}
                      >
                        <CostumeThumbnail
                          href={`/characters/${costume.character.slug}/${costume.slug}`}
                          src={`${CDN_URL}${costume.image_path_base}battle.png`}
                          alt={`${costume.title} thumbnail`}
                          rarity={costume.rarity}
                          weaponType={costume.weapon_type}
                          isDark={costume.is_ex_costume}
                        />
                        <p className="text-center text-sm mb-0 leading-none">
                          {costume.is_ex_costume && (
                            <span className="text-rarity-4">EX </span>
                          )}
                          {costume.character.name}
                        </p>
                        <span className="text-xs text-center text-beige line-clamp-1 leading-none transition-opacity ease-out-cubic group-hover:opacity-0 -mt-1">
                          {costume.title}
                        </span>
                        <button
                          onClick={() => addCostumePanel(costume.costume_id)}
                          className="absolute bottom-0 flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 ease-out-cubic translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 umami--click--pin-costume-button"
                        >
                          <AiOutlinePushpin />
                          <span className="text-xs">PIN</span>
                        </button>
                      </div>
                    ))}

                    {thought.character.map((character) => (
                      <CharacterDiamond
                        key={character.character_id}
                        character={character}
                        active={false}
                      />
                    ))}
                  </div>
                );
              },
              customFilterAndSearch: (term, thought) => {
                if (term.length === 0) return true;
                return thought.costume.some((costume) =>
                  `${costume.character.name.toLowerCase()} ${costume.title.toLowerCase()}`.includes(
                    term.toLowerCase()
                  )
                );
              },
            },
            {
              field: "rarity",
              title: "Rarity",
              lookup: rarityLookup,
              customFilterAndSearch: (term, thought) => {
                if (term.length === 0) return true;
                return term.includes(thought.rarity.toString());
              },
              render: (thought) => (
                <div className="w-8 h-8 mx-auto">
                  <Star rarity={DEBRIS_RARITY[thought.rarity]} />
                </div>
              ),
            },
            {
              field: "has_characters",
              title: "Is Exalt?",
              cellStyle: {
                textAlign: "center",
              },
              type: "boolean",
              render: (thought) => (
                <Checkbox checked={thought.character.length > 0} />
              ),
              customFilterAndSearch: (term, thought) => {
                if (term === "checked") {
                  return thought.character.length > 0;
                }

                return true;
              },
            },
          ]}
          options={{
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
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const debris = await prisma.dump.debris.findMany({
    orderBy: {
      release_time: "desc",
    },
    include: {
      costume: {
        include: {
          character: true,
        },
      },
      character: true,
    },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        debris,
      })
    ),
  };
}
