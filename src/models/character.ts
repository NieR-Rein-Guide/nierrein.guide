import { getCostumes, getSingleCostume } from "@libs/mongo";
import jsonAbilities from "../data/ability.json";
import jsonSkills from "../data/skill.json";
import jsonCostumes from "../data/costume.json";
import jsonCharacters from "../data/character.json";
import { sheets } from "@libs/s3";
import { Costume } from '@models/types';
import pMemoize from 'p-memoize';

async function getAllCostumes(): Promise<Costume[]> {
    const [costumes, charactersSheet] = await Promise.all([
        getCostumes(),
        sheets.get("characters")
    ]);

    const allCostumes = costumes.map((costume) => {
    const metadata = charactersSheet.find(
        (character) => character.id === costume.CostumeId
    );

    return {
        ids: {
        costume: costume.CostumeId,
        character: costume.CharacterId,
        emblem: costume.CostumeEmblemAssetId,
        actor: costume.ActorAssetId,
        },
        character: {
        en: getCostumeCharacter(costume.CharacterId),
        },
        costume: {
        name: {
            en: getCostumeName(costume.ActorAssetId),
        },
        description: {
            en: getCostumeDescription(costume.ActorAssetId),
        },
        emblem: getCostumeEmblem(costume.CostumeEmblemAssetId),
        weaponType: costume.WeaponType,
        rarity: costume.RarityType,
        },
        abilities: getAbilities(costume),
        skills: getSkills(costume),
        metadata,
    };
    });

    return JSON.parse(JSON.stringify(allCostumes))
}

function getAbilities(costume) {
  const abilities = costume.Ability.map((ability) => {
    const ab = ability.AbilityDetail.map((detail) => ({
      ...detail,
      name: jsonAbilities["name"]?.[detail.NameAbilityTextId]?.["text_"] ?? '',
      description: {
        short:
          jsonSkills["description"]["short"]?.[detail.DescriptionAbilityTextId]?.[
            "text_"
          ] ?? '',
        long: jsonSkills["description"]["long"]?.[
          detail.DescriptionAbilityTextId
        ]?.["text_"] ?? '',
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
      name: jsonSkills["name"]?.[detail.NameSkillTextId]?.["text_"] ?? '',
      description: {
        short:
          jsonSkills["description"]["short"]?.[detail.DescriptionSkillTextId]?.[
            "text_"
          ] ?? '',
        long: jsonSkills["description"]["long"]?.[
          detail.DescriptionSkillTextId
        ]?.["text_"] ?? '',
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
  return jsonCostumes["name"]?.[ActorAssetId]?.["text_"] ?? '';
}

function getCostumeDescription(ActorAssetId) {
  return jsonCostumes["description"]?.[ActorAssetId]?.["text_"] ?? '';
}

function getCostumeCharacter(CharacterId) {
  return jsonCharacters["name"]?.[CharacterId]?.["text_"] ?? '';
}

function getCostumeEmblem(CostumeEmblemAssetId) {
  const paddedId = CostumeEmblemAssetId.toString().padStart(3, "0");

  return {
    name: jsonCostumes["emblem"]["name"]?.[CostumeEmblemAssetId]?.["text_"] ?? '',
    production: {
      name: jsonCostumes["emblem"]["production"]["name"]?.[paddedId]?.["text_"] ?? '',
      description: jsonCostumes["emblem"]["production"]["result"]?.[paddedId] ?? '',
    },
  };
}

const memGetAllCostumes = pMemoize(getAllCostumes, {
    maxAge: 1000 * 60,
})

export {
    memGetAllCostumes as getAllCostumes,
}
