import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Skill from "@components/Skill";
import Ability from "@components/Ability";
import CompanionThumbnail from "@components/CompanionThumbnail";
import prisma from "@libs/prisma";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import Element from "@components/Element";
import {
  companion,
  companion_ability,
  companion_ability_link,
  companion_skill,
  companion_skill_link,
  companion_stat,
} from "@prisma/client";
import DatabaseNavbar from "@components/DatabaseNavbar";
import { useSettingsStore } from "@store/settings";
import { hideSEASpoiler } from "@utils/hideSEASpoiler";

interface CompanionsPageProps {
  companions: (companion & {
    companion_ability_link: (companion_ability_link & {
      companion_ability: companion_ability;
    })[];
    companion_skill_link: (companion_skill_link & {
      companion_skill: companion_skill;
    })[];
    companion_stat: companion_stat[];
  })[];
  abilitiesLookup;
  skillsLookup;
}

const attributesLookup = {
  LIGHT: "Light",
  DARK: "Dark",
  FIRE: "Fire",
  WIND: "Wind",
  WATER: "Water",
};

export default function CompanionsPage({
  companions,
  abilitiesLookup,
  skillsLookup,
}: CompanionsPageProps): JSX.Element {
  const region = useSettingsStore((state) => state.region);
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  return (
    <Layout className="overflow-x-auto">
      <Meta
        title="Companions - Database"
        description="List of companions."
        cover="https://nierrein.guide/database/companions.jpg"
      />

      <section className="mx-auto p-6">
        <DatabaseNavbar />
        <MaterialTable
          title={`${companions.length} companions in the database.`}
          data={companions.filter((companion) => {
            if (showUnreleasedContent) return true;
            if (region === "SEA") {
              return hideSEASpoiler(companion.release_time);
            }
            return new Date() > new Date(companion.release_time);
          })}
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
              field: "companion_skill_link[0].companion_skill.name",
              title: "Skill",
              lookup: skillsLookup,
              customFilterAndSearch: (term, companion) => {
                if (term.length === 0) return true;
                return term.includes(
                  companion.companion_skill_link?.[0]?.companion_skill.name
                );
              },
            },
            {
              field: "companion_skill_link[0].companion_skill.cooldown_time",
              title: "Skill Cooldown",
              type: "numeric",
              hideFilterIcon: true,
              customFilterAndSearch: (term, companion) =>
                companion.companion_skill_link[0].companion_skill
                  .cooldown_time <= Number(term),
            },
            {
              field: "companion_ability_link[0].companion_ability.name",
              title: "Ability",
              lookup: abilitiesLookup,
              customFilterAndSearch: (term, companion) => {
                if (term.length === 0) return true;
                return term.includes(
                  companion.companion_ability_link?.[0]?.companion_ability.name
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
          ]}
          detailPanel={({ rowData: companion }) => {
            return (
              <section className="p-4">
                <div className="bg-grey-dark p-4">
                  <div className="flex justify-center">
                    <CompanionThumbnail companion={companion} />
                  </div>
                  <span className="text-xl block text-center mb-4">
                    {companion.name.split(":")[1]}
                  </span>
                  <Skill
                    name={
                      companion.companion_skill_link[0].companion_skill.name
                    }
                    description={
                      companion.companion_skill_link[0].companion_skill
                        .description
                    }
                    imagePathBase={
                      companion.companion_skill_link[0].companion_skill
                        .image_path
                    }
                    level={15}
                  />
                  <Ability
                    name={
                      companion.companion_ability_link[0].companion_ability.name
                    }
                    description={
                      companion.companion_ability_link[0].companion_ability
                        .description
                    }
                    imagePathBase={
                      companion.companion_ability_link[0].companion_ability
                        .image_path_base
                    }
                    level={15}
                    maxLevel={15}
                  />
                </div>
              </section>
            );
          }}
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
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const companions = await prisma.dump.companion.findMany({
    orderBy: {
      release_time: "desc",
    },
    include: {
      companion_ability_link: {
        where: {
          companion_level: 50,
        },
        include: {
          companion_ability: true,
        },
      },
      companion_skill_link: {
        where: {
          companion_level: 50,
        },
        include: {
          companion_skill: true,
        },
      },
      companion_stat: true,
    },
  });

  const skillsLookupData = await prisma.dump.companion_skill.findMany({
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
  }, {});

  const abilitiesLookupData = await prisma.dump.companion_ability.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
    },
    distinct: ["name"],
  });

  const abilitiesLookup = abilitiesLookupData.reduce((acc, current) => {
    acc[current.name] = current.name;
    return acc;
  }, {});

  return {
    props: JSON.parse(
      JSON.stringify({
        companions,
        abilitiesLookup,
        skillsLookup,
      })
    ),
  };
}
