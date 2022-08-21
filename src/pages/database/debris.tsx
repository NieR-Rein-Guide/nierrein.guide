import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { debris } from "@prisma/client";
import DebrisThumbnail from "@components/DebrisThumbnail";
import Star from "@components/decorations/Star";

interface DebrisPageProps {
  debris: debris[];
}

const DEBRIS_RARITY = {
  20: 2,
  30: 3,
  40: 4,
};

const rarityLookup = {
  20: "2*",
  30: "3*",
  40: "4*",
};

export default function DebrisPage({ debris }: DebrisPageProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Debris - Database"
        description="List of debris."
        cover="https://nierrein.guide/database/debris.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Database</span>
          </a>
        </Link>
      </nav>

      <section className="mx-auto p-6">
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
              lookup: rarityLookup,
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
  const debris = await prisma.debris.findMany({
    orderBy: {
      release_time: "desc",
    },
  });

  /* const skillsLookupData = await prisma.companion_skill.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
    },
    distinct: ["name"],
  });

  const skillsLookup = skillsLookupData.reduce((acc, current) => {
    acc[current.name] = current.name;
    return acc;
  }, {}); */

  return {
    props: JSON.parse(
      JSON.stringify({
        debris,
      })
    ),
  };
}
