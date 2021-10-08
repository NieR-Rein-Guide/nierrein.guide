import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import Image from "next/image";
import SVG from "react-inlinesvg";
import { getAllCompanions } from "@models/companion";
import Slider from "rc-slider";
import { useState } from "react";
import Skill from "@components/Skill";
import Ability from "@components/Ability";
import CompanionThumbnail from "@components/CompanionThumbnail";
import Lines from "@components/decorations/Lines";

export default function DatabaseCostumes({ allCompanions }): JSX.Element {
  const companions = JSON.parse(allCompanions);
  const companionsByTypes = {};

  companions.forEach((companion) => {
    if (companionsByTypes[companion.Type]) {
      return companionsByTypes[companion.Type].push(companion);
    }

    companionsByTypes[companion.Type] = [companion];
  });

  console.log(companionsByTypes);

  const [skillLevel, setSkillLevel] = useState(14);

  return (
    <Layout>
      <Meta
        title="Companions - Database"
        description="Companions index"
        cover="https://nierrein.guide/database/companions.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Return to Database</span>
          </a>
        </Link>
      </nav>

      <section>
        <h2 className="overlap">Companions</h2>

        <div className="mb-12">
          <p className="text-beige">Skill & Abilities Lv. {skillLevel + 1}</p>
          <Slider
            value={skillLevel}
            className="mt-2 xl:mt-0 max-w-lg"
            min={0}
            max={14}
            onChange={(value) => setSkillLevel(value)}
          />
        </div>

        {Object.keys(companionsByTypes).map((type) => (
          <div className="mb-12" key={type}>
            <Lines containerClass="justify-center" className="mb-12">
              <h2 className="text-5xl text-beige">{type}</h2>
            </Lines>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-8 lg:gap-20">
              {companionsByTypes[type].map((companion) => (
                <div key={companion.ActorAssetId}>
                  <div className="flex justify-center">
                    <CompanionThumbnail companion={companion} />
                  </div>
                  <span className="block text-center mb-4">
                    {companion.name.split(":")[1]}
                  </span>
                  <Skill
                    name={companion.skills[skillLevel].name}
                    description={companion.skills[skillLevel].description}
                    AssetCategoryId={
                      companion.skills[skillLevel].SkillAssetCategoryId
                    }
                    AssetVariationId={
                      companion.skills[skillLevel].SkillAssetVariationId
                    }
                    level={skillLevel + 1}
                  />
                  <Ability
                    name={companion.abilities[skillLevel].name}
                    description={companion.abilities[skillLevel].description}
                    AssetCategoryId={
                      companion.abilities[skillLevel].AssetCategoryId
                    }
                    AssetVariationId={
                      companion.abilities[skillLevel].AssetVariationId
                    }
                    level={skillLevel + 1}
                    maxLevel={15}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCompanions = await getAllCompanions();

  return {
    props: {
      allCompanions: JSON.stringify(allCompanions),
    },
  };
}
