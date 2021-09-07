import Meta from "@components/Meta";
import Layout from "@components/Layout";
import CostumeDetails from "@components/CharacterInfo";
import { CostumeInfo, typedCharacters } from "@models/character";
import { useEffect, useState } from "react";
import React from "react";
import CharacterCostumes from "@components/characters/CharacterCostumes";
import CharacterRows from "@components/characters/CharacterRows";
import CostumeSelect from "@components/characters/CostumeSelect";
import { useRouter } from "next/router";
import slugify from "slugify";
import { getCostumes } from "@libs/mongo";
import CostumeThumbnail from "@components/CostumeThumbnail";
import jsonAbilities from "../../data/ability.json";
import jsonSkills from "../../data/skill.json";
import jsonCostumes from "../../data/costume.json";
import jsonCharacters from "../../data/character.json";

function getAbilities(costume) {
  const abilities = costume.Ability.map((ability) => {
    const ab = ability.AbilityDetail.map((detail) => ({
      ...detail,
      name: jsonAbilities["name"]?.[detail.NameSkillTextId]?.["text_"],
      description: {
        short:
          jsonSkills["description"]["short"]?.[detail.DescriptionSkillTextId]?.[
            "text_"
          ],
        long: jsonSkills["description"]["long"]?.[
          detail.DescriptionSkillTextId
        ]?.["text_"],
      },
    }));

    return {
      ...ability,
      ...ab,
    };
  });

  return abilities;
}

function getSkills(costume) {
  const abilities = costume.Skill.map((skill) => {
    const ab = skill.SkillDetail.map((detail) => ({
      ...detail,
      name: jsonSkills["name"]?.[detail.NameSkillTextId]?.["text_"],
      description: {
        short:
          jsonSkills["description"]["short"]?.[detail.DescriptionSkillTextId]?.[
            "text_"
          ],
        long: jsonSkills["description"]["long"]?.[
          detail.DescriptionSkillTextId
        ]?.["text_"],
      },
    }));

    return {
      ...skill,
      ...ab,
    };
  });

  return abilities;
}

function getCostumeName(ActorAssetId) {
  return jsonCostumes["name"]?.[ActorAssetId]?.["text_"];
}

function getCostumeDescription(ActorAssetId) {
  return jsonCostumes["description"]?.[ActorAssetId]?.["text_"];
}

function getCostumeCharacter(CharacterId) {
  return jsonCharacters["name"]?.[CharacterId]?.["text_"];
}

function getCostumeEmblem(CostumeEmblemAssetId) {
  const paddedId = CostumeEmblemAssetId.toString().padStart(3, "0");

  return {
    name: jsonCostumes["emblem"]["name"]?.[CostumeEmblemAssetId]?.["text_"],
    production: {
      name: jsonCostumes["emblem"]["production"]["name"]?.[paddedId]?.["text_"],
      description: jsonCostumes["emblem"]["production"]["result"]?.[paddedId],
    },
  };
}

export default function Page({ costumes }): JSX.Element {
  const router = useRouter();

  if (costumes) {
    const allCostumes = JSON.parse(costumes);
    console.log(allCostumes);
  } else {
    console.log("costumes is undefined");
  }

  const defaultCostume = typedCharacters.values().next()
    .value[0] as CostumeInfo;

  const query = router.query.all;
  useEffect(() => {
    let newCostume: CostumeInfo;
    try {
      if (query) {
        if (query.length >= 2) {
          newCostume = Array.from(typedCharacters.values())
            .find(
              (costumes) =>
                slugify(costumes[0].character) == (query[0] as string)
            )
            .find(
              (costume) => slugify(costume.name.en) == (query[1] as string)
            );
        } else {
          newCostume = Array.from(typedCharacters.values()).find(
            (costumes) => slugify(costumes[0].character) == (query[0] as string)
          )[0];
        }
      } else {
        newCostume = typedCharacters.values().next().value[0] as CostumeInfo;
      }
    } catch (e) {
      newCostume = typedCharacters.values().next().value[0] as CostumeInfo;
    }
    setCostumeInternal(newCostume);
    history.replaceState(null, "", `/characters`);
  }, [query]);

  const [currentCostume, setCostumeInternal] = useState(defaultCostume);

  const setCostume = (costume: CostumeInfo) => {
    setCostumeInternal(costume);
    history.replaceState(
      null,
      "",
      `/characters/${slugify(costume.character)}/${slugify(costume.name.en)}`
    );
  };

  return (
    <Layout>
      <Meta
        title="Characters"
        description="All the costumes of NieR Re[in]carnation"
        cover="https://nierrein.guide/cover-characters.jpg"
      />

      {costumes && (
        <div className="grid grid-cols-6 gap-4">
          {JSON.parse(costumes).map((costume) => (
            <div key={costume.ActorAssetId}>
              <CostumeThumbnail
                src={`/character/thumbnails/${costume.ActorAssetId}_thumbnail.png`}
                alt={costume.ActorAssetId}
                rarity={costume.RarityType}
                weaponType={costume.WeaponType}
              />
              <p className="text-xs">{costume.character.en}</p>
              <p className="text-xs">{costume.name.en}</p>
              <p className="text-xs">{costume.description.en ? "ok" : "no"}</p>
            </div>
          ))}
        </div>
      )}

      <CharacterRows {...{ setCostume, currentCostume }} />
      <div className="hidden md:inline">
        <CharacterCostumes {...{ setCostume, currentCostume }} />
      </div>
      <div className="inline md:hidden">
        <CostumeSelect {...{ setCostume, currentCostume }} />
      </div>

      <CostumeDetails costume={currentCostume}></CostumeDetails>
    </Layout>
  );
}

export async function getStaticProps() {
  const costumes = await getCostumes();

  const allCostumes = costumes.map((costume) => {
    costume.abilities = getAbilities(costume);
    costume.skills = getSkills(costume);

    costume.character = {
      en: getCostumeCharacter(costume.CharacterId),
    };

    costume.name = {
      en: getCostumeName(costume.ActorAssetId),
    };

    costume.description = {
      en: getCostumeDescription(costume.ActorAssetId),
    };

    costume.emblem = getCostumeEmblem(costume.CostumeEmblemAssetId);

    return costume;
  });

  return {
    props: {
      costumes: JSON.stringify(allCostumes),
    },
  };
}

export async function getStaticPaths() {
  const paths = Array.from(typedCharacters.values())
    .flat()
    .map((costume) => ({
      params: { all: [slugify(costume.character), slugify(costume.name.en)] },
    }));

  return {
    paths,
    fallback: true,
  };
}
