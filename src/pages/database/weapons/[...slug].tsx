import Layout from "@components/Layout";
import Meta from "@components/Meta";
import { Weapon } from "@models/types";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";
import urlSlug from "url-slug";
import { useState } from "react";
import weaponsIcons from "@utils/weaponsIcons";
import RARITY from "@utils/rarity";
import { getAllWeapons, getSingleWeapon } from "@models/weapon";
import Star from "@components/decorations/Star";
import Lines from "@components/decorations/Lines";
import Element from "@components/Element";
import Radio from "@components/form/Radio";
import Skill from "@components/Skill";
import Ability from "@components/Ability";
import Slider from "rc-slider";

interface DatabaseWeaponProps {
  weapon: Weapon;
}

export default function SingleWeapon({
  weapon,
}: DatabaseWeaponProps): JSX.Element {
  const [evolutionStage, setEvolutionStage] = useState(
    weapon.evolutions.length - 1
  );
  // 0 is Lv. 1 and 14 is Lv. 15
  const [skillAbilitiesLevel, setSkillAbilitiesLevel] = useState(14);

  return (
    <Layout>
      <Meta
        title={`${weapon.name.en} Weapon`}
        description={`${
          weapon.name.en
        } is a ${weapon.attribute.toLowerCase()} weapon.`}
        cover={`https://nierrein.guide/ui/weapon/wp${weapon.ids.asset}_full.png`}
      />

      <nav className="mb-16">
        <Link href="/database/weapons" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Weapons</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">{weapon.name.en}</h2>

        {(weapon.isDark && (
          <div className="flex flex-wrap justify-around gap-4 bg-grey-dark p-4 mb-6">
            <Radio
              name="Stage 1"
              value={0}
              isChecked={evolutionStage === 0}
              setState={setEvolutionStage}
            />

            <Radio
              name="Stage 5"
              value={4}
              isChecked={evolutionStage === 4}
              setState={setEvolutionStage}
            />

            <Radio
              name="Stage 8"
              value={7}
              isChecked={evolutionStage === 7}
              setState={setEvolutionStage}
            />

            <Radio
              name="Final Stage"
              value={10}
              isChecked={evolutionStage === 10}
              setState={setEvolutionStage}
            />
          </div>
        )) || (
          <div className="flex flex-wrap justify-around gap-4 bg-grey-dark p-4 mb-6">
            <Radio
              name="First Stage"
              value={0}
              isChecked={evolutionStage === 0}
              setState={setEvolutionStage}
            />

            <Radio
              name="Final Stage"
              value={1}
              isChecked={evolutionStage === 1}
              setState={setEvolutionStage}
            />
          </div>
        )}

        <div className="relative mb-16">
          <div className="flex flex-col xl:flex-row justify-between">
            <div className="flex-1">
              <div
                className="relative overflow-hidden max-w-xl mx-auto order-1 xl:order-2 w-full"
                style={{ height: "700px" }}
              >
                <div className="bordered-lg bg-grey-dark h-full w-full">
                  <div className="relative z-10 h-full w-full">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={`/ui/weapon/wp${weapon.evolutions[evolutionStage].AssetId}_full.png`}
                      alt={`${weapon.name.en} thumbnail`}
                    />
                  </div>

                  <div className="absolute inset-0 z-0">
                    <div className="absolute -left-24 top-24 transform -scale-1">
                      <SVG
                        src="/decorations/square-right.svg"
                        className="h-48 filter brightness-30 floating"
                      />
                    </div>

                    <SVG
                      src="/decorations/square-right.svg"
                      className="h-48 absolute -right-20 -top-16 filter brightness-30 floating"
                    />
                    <SVG
                      src="/decorations/c_rect_inside.svg"
                      className="absolute -left-64 floating"
                    />
                    <SVG
                      src="/decorations/c_rect_outside.svg"
                      className="absolute -left-64 floating"
                    />
                  </div>
                </div>
                <span className="flex absolute bottom-6 right-6">
                  {Array.from({
                    length:
                      RARITY[weapon.evolutions[evolutionStage].RarityType],
                  }).map((_, index) => (
                    <div className="w-8 h-8" key={index}>
                      <Star
                        rarity={
                          RARITY[weapon.evolutions[evolutionStage].RarityType]
                        }
                      />
                    </div>
                  ))}
                </span>

                <div className="absolute left-6 bottom-6 text-xl z-50">
                  {weapon.name.en}
                </div>

                <div className="absolute flex flex-col gap-y-4 top-4 left-4 p-1">
                  <div className="w-16 h-16">
                    <Element type={weapon.attribute} />
                  </div>
                  <div className="w-16 h-16">
                    <Image src={weaponsIcons[weapon.type]} alt={weapon.type} />
                  </div>

                  {weapon.isDark && (
                    <SVG src="/icons/weapons/dark.svg" className="h-16 w-16" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-y-2 p-2">
              <div className="px-6">
                <span className="text-beige">
                  Skill & Abilities <b>Lv. {skillAbilitiesLevel + 1}</b>
                </span>
                <Slider
                  value={skillAbilitiesLevel}
                  className="mt-2"
                  min={0}
                  max={14}
                  onChange={(value) => setSkillAbilitiesLevel(value)}
                />
              </div>
              {/* Weapon abilities */}
              <Lines
                className="mb-2"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Skills</h2>
              </Lines>

              <Skill
                name={
                  weapon.skills[evolutionStage][0][skillAbilitiesLevel].name
                }
                description={
                  weapon.skills[evolutionStage][0][skillAbilitiesLevel]
                    .description.long
                }
                SkillCooltimeValue={
                  weapon.skills[evolutionStage][0][skillAbilitiesLevel]
                    .SkillCooltimeValue
                }
                AssetCategoryId={
                  weapon.skills[evolutionStage][0][skillAbilitiesLevel]
                    .SkillAssetCategoryId
                }
                AssetVariationId={
                  weapon.skills[evolutionStage][0][skillAbilitiesLevel]
                    .SkillAssetVariationId
                }
                level={skillAbilitiesLevel + 1}
                isWeapon={true}
              />

              <Skill
                name={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel].name
                }
                description={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .description.long
                }
                SkillCooltimeValue={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .SkillCooltimeValue
                }
                AssetCategoryId={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .SkillAssetCategoryId
                }
                AssetVariationId={
                  weapon.skills[evolutionStage][1][skillAbilitiesLevel]
                    .SkillAssetVariationId
                }
                level={skillAbilitiesLevel + 1}
                isWeapon={true}
              />

              <Lines
                className="mb-2 mt-8"
                containerClass="justify-center"
                svgClass="w-96 xl:w-42"
              >
                <h2 className="text-2xl">Abilities</h2>
              </Lines>

              <Ability
                name={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel].name
                }
                description={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel]
                    .description.long
                }
                AssetCategoryId={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel]
                    .AssetCategoryId
                }
                AssetVariationId={
                  weapon.abilities[evolutionStage][0][skillAbilitiesLevel]
                    .AssetVariationId
                }
                level={skillAbilitiesLevel + 1}
                maxLevel={15}
              />

              {weapon.abilities[evolutionStage][1] && (
                <Ability
                  name={
                    weapon.abilities[evolutionStage][1][skillAbilitiesLevel]
                      .name
                  }
                  description={
                    weapon.abilities[evolutionStage][1][skillAbilitiesLevel]
                      .description.long
                  }
                  AssetCategoryId={
                    weapon.abilities[evolutionStage][1][skillAbilitiesLevel]
                      .AssetCategoryId
                  }
                  AssetVariationId={
                    weapon.abilities[evolutionStage][1][skillAbilitiesLevel]
                      .AssetVariationId
                  }
                  level={skillAbilitiesLevel + 1}
                  maxLevel={15}
                />
              )}
            </div>
          </div>

          {weapon?.stories.length > 0 && (
            <div className="flex flex-col gap-y-4 mt-6">
              <h4 className="text-3xl bg-grey-lighter p-3">Stories</h4>

              {weapon.stories.map((story, index) => (
                <p
                  className="bg-grey-dark p-4 border border-beige-inactive border-opacity-50"
                  key={`${weapon.ids.base}-${index}`}
                  dangerouslySetInnerHTML={{
                    __html: `${story.replaceAll("\\n", "<br>")}`,
                  }}
                ></p>
              ))}
            </div>
          )}

          {weapon?.metadata?.sources?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-display text-2xl mb-4">Weapon Sources</h3>

              <div className="flex flex-wrap gap-4">
                {weapon.metadata.sources.map((source, index) => (
                  <div
                    key={`${weapon.ids.asset}source${index}`}
                    className="flex justify-center gap-x-4 items-center border border-beige-inactive border-opacity-50 bg-grey-dark p-4"
                  >
                    <h3 className="text-2xl text-beige-inactive">
                      {source.sourceType && <p>{source.sourceType}</p>}
                      {source.storeName && <p>{source.storeName}</p>}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const [, id] = context.params.slug;
  const weapon = await getSingleWeapon(Number(id));

  return {
    props: {
      weapon: JSON.parse(JSON.stringify(weapon)),
    },
  };
}
export async function getStaticPaths() {
  const allWeapons = await getAllWeapons();

  const paths = allWeapons.map((weapon) => ({
    params: {
      slug: [
        `${weapon.name.en ? urlSlug(weapon.name.en) : "unnamed"}`,
        `${weapon.ids.base}`,
      ],
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
