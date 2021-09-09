import { getCostumes } from "@libs/mongo";
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
          library: costume.CatalogTermId,
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
          stats: {
            base: {
              hp: calc(1, costume.StatusCalculation.HpFunction.Parameters),
              atk: calc(1, costume.StatusCalculation.AttackFunction.Parameters),
              def: calc(1, costume.StatusCalculation.VitalityFunction.Parameters),
            },
            maxNoAscension: {
              hp: calc(70, costume.StatusCalculation.HpFunction.Parameters),
              atk: calc(70, costume.StatusCalculation.AttackFunction.Parameters),
              def: calc(70, costume.StatusCalculation.VitalityFunction.Parameters),
            },
            maxWithAscension: {
              hp: calc(90, costume.StatusCalculation.HpFunction.Parameters),
              atk: calc(90, costume.StatusCalculation.AttackFunction.Parameters),
              def: calc(90, costume.StatusCalculation.VitalityFunction.Parameters),
            },
          }
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
          jsonAbilities["description"]["short"]?.[detail.DescriptionAbilityTextId]?.[
            "text_"
          ] ?? '',
        long: jsonAbilities["description"]["long"]?.[
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

function calc(x, parameters) {
    function ext16(num) {
        return BigInt.asUintN(128, BigInt(num));
    }
    function procTerm(exp, index) {
        const tmp = (ext16(parameters[index]) * ext16(x ** exp) * ext16("0x20C49BA5E353F7CF")) % BigInt(2 ** 128);
        return (tmp >> 71n) + (tmp >> 127n);
    }
    return Number(BigInt.asIntN(32, procTerm(3, 0) + procTerm(2, 1) + procTerm(1, 2) + ext16(parameters[3])));
}

const memGetAllCostumes = pMemoize(getAllCostumes, {
    maxAge: 1000 * 60,
})

export {
    memGetAllCostumes as getAllCostumes,
}
