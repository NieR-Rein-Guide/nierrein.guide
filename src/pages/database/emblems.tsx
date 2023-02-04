import Layout from "@components/Layout";
import Meta from "@components/Meta";
import prisma from "@libs/prisma";
import { character, costume, emblem } from "@prisma/client";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import Link from "next/link";
import Lines from "@components/decorations/Lines";
import getEmblemPath from "@utils/getEmblemPath";

interface EmblemsPageProps {
  emblems: (emblem & {
    costume: (costume & {
      character: character;
    })[];
  })[];
  characters: (character & {
    costume: costume[];
  })[];
}

const COLLABS_EMBLEMS_IDS = [
  99, // Divergent
  17, // Fabled,
  13, // Phantasmal
];

export default function EmblemsPage({
  emblems,
  characters,
}: EmblemsPageProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title="Emblems - Database"
        description="All emblems (Abstract, Bloody, Fractured...)."
        cover="https://nierrein.guide/database/emblems.jpg"
      />

      <section className="p-6">
        {emblems.map((emblem) => {
          const emblemCharactersIds = emblem.costume.map(
            (cost) => cost.character_id
          );
          const missingCostumesFromEmblem = characters.filter(
            (character) => !emblemCharactersIds.includes(character.character_id)
          );

          return (
            <div key={emblem.emblem_id} className="mb-16 bg-cover bg-center">
              <div
                className="relative py-4 px-8 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${getEmblemPath(
                    emblem.emblem_id.toString(),
                    "background"
                  )})`,
                }}
              >
                <Lines
                  className="mb-4"
                  containerClass="justify-center"
                  svgClass="w-96 xl:w-42"
                >
                  <h2 className="text-3xl text-shadow">{emblem.name}</h2>
                </Lines>
              </div>

              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: `${emblem.main_message}\n\n${emblem.small_messages}`,
                }}
              ></div>

              <div className="flex flex-wrap gap-8 mt-8">
                {emblem.costume.map((cost) => {
                  return (
                    <CostumeThumbnail
                      key={cost.costume_id}
                      src={`${CDN_URL}${cost.image_path_base}portrait.png`}
                      alt={cost.title}
                      weaponType={cost.weapon_type}
                      rarity={cost.rarity}
                      isLarge
                      isDark={cost.is_ex_costume}
                      className="group"
                      imgClasses="transform transition-transform ease-out-cubic group-hover:scale-110"
                    >
                      <Link
                        href={`/characters/${cost.character.slug}/${cost.slug}`}
                        passHref
                        className="absolute inset-0 z-10">

                        <span className="sr-only">
                          See more about {cost.title}
                        </span>

                      </Link>
                    </CostumeThumbnail>
                  );
                })}
              </div>

              {missingCostumesFromEmblem.length > 0 &&
                !COLLABS_EMBLEMS_IDS.includes(emblem.emblem_id) && (
                  <div className="bg-grey-dark bordered relative mt-8 p-12">
                    <h3 className="text-2xl">Missing costumes from emblem:</h3>
                    <div className="flex flex-wrap gap-8 mt-8">
                      {missingCostumesFromEmblem.map((char) => {
                        return (
                          <CostumeThumbnail
                            key={char.character_id}
                            src={`${CDN_URL}${char.costume[0].image_path_base}standard.png`}
                            alt={char.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const emblems = await prisma.dump.emblem.findMany({
    include: {
      costume: {
        include: {
          character: true,
        },
      },
    },
  });

  const characters = await prisma.dump.character.findMany({
    include: {
      costume: {
        where: {
          rarity: "RARE",
        },
      },
    },
  });

  const filteredCharacters = characters.filter(
    (character) => character.costume.length > 0
  );

  return {
    props: JSON.parse(
      JSON.stringify({
        emblems,
        characters: filteredCharacters,
      })
    ),
  };
}
