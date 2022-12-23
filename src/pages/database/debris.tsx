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
import RARITY from "@utils/rarity";
import { costumes_link } from "@prisma/client-nrg";
import { getAllCostumes } from "@models/costume";

interface DebrisPageProps {
  debris: debris[];
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
  20: 2,
  30: 3,
  40: 4,
};

export const rarityLookup = {
  20: "2*",
  30: "3*",
  40: "4*",
};

export default function DebrisPage({
  debris,
  links,
  costumes,
}: DebrisPageProps): JSX.Element {
  return (
    <Layout hasContainer={false} className="overflow-x-auto">
      <Meta
        title="Debris - Database"
        description="List of debris."
        cover="https://nierrein.guide/database/debris.jpg"
      />

      <section className="mx-auto p-6">
        <DatabaseNavbar />
        <MaterialTable
          title={`${debris.length} debris in the database.`}
          data={debris}
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
              title: "Costume",
              render: (thought) => {
                const linkedCostume = links.find(
                  (costume) => costume.debris_id === thought.debris_id
                );

                const costume = costumes.find(
                  (item) => item.costume_id === linkedCostume?.costume_id
                );

                return (
                  <div className="flex items-center gap-x-4 w-80">
                    <CostumeThumbnail
                      href={`/characters/${costume?.character.slug}/${costume?.slug}`}
                      src={`${CDN_URL}${costume?.image_path_base}battle.png`}
                      alt={`${costume?.title} thumbnail`}
                      rarity={RARITY[costume?.rarity]}
                      weaponType={costume?.weapon_type}
                      isDark={costume?.is_ex_costume}
                    />
                    <span className="inline-block pr-12 line-clamp-2">
                      {costume?.is_ex_costume && (
                        <span className="text-rarity-4">EX </span>
                      )}
                      {costume?.title ?? "WIP"}
                    </span>
                  </div>
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
  });

  const { costumes } = await getAllCostumes({
    orderBy: {
      release_time: "desc",
    },
  });

  const links = await prisma.nrg.costumes_link.findMany({
    where: {
      debris_id: {
        not: null,
      },
    },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        debris,
        links,
        costumes,
      })
    ),
  };
}
