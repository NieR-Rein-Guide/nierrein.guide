import { getCostumes, getWeapons } from "@libs/mongo";
import jsonAbilities from "../data/ability.json";
import jsonSkills from "../data/skill.json";
import jsonCostumes from "../data/costume.json";
import jsonCharacters from "../data/character.json";
import { sheets } from "@libs/s3";
import { Costume, CostumeRarity } from '@models/types';
import pMemoize from 'p-memoize';
import getCostumeLevelsByRarity from "@utils/getCostumeLevelsByRarity";
import { getWeapon } from '@models/weapon'
import mongo from '@libs/db'
import calc from '@utils/calcStats'

async function getAllCostumes({
  allStats = false
}: {
  allStats?: boolean;
}): Promise<Costume[]> {
  // Get the connection before calling 2 queries at the same time that will create 2 connections.
  await mongo.get();
  const [costumes, charactersSheet, weapons, weaponsSheet] = await Promise.all([
      getCostumes(),
      sheets.get("characters"),
      getWeapons(),
      sheets.get('weapons')
  ]);

  const allCostumes = costumes.map((costume) => {
    const metadata = charactersSheet.find(
        (character) => character.id === costume.CostumeId
    );

    const finalCostume = {
      ids: {
        library: costume.CatalogTermId,
        costume: costume.CostumeId,
        character: costume.CharacterId,
        emblem: costume.CostumeEmblemAssetId,
        actor: costume.ActorAssetId,
        material: costume.CostumeLimitBreakMaterialId,
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
        weapon: null,
        weaponType: costume.WeaponType,
        rarity: costume.RarityType,
        stats: allStats ? getAllStats(costume) : getStats(costume),
      },
      abilities: getAbilities(costume),
      skills: getSkills(costume),
      metadata,
    }

    const weaponCostume = weaponsSheet.find((weapon) => weapon.id === finalCostume.metadata.weaponId);

    // This weapon belongs to a costume
    if (weaponCostume) {
      const weapon = weapons.find((weapon) => weapon.BaseWeaponId === Number(weaponCostume.id));

      finalCostume.costume.weapon = {
        ...getWeapon(weapon),
        metadata: weaponCostume
      }
    }

    return finalCostume;
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

function getStats(costume) {
  const { base, maxNoAsc, maxWithAsc } = getCostumeLevelsByRarity(costume.RarityType as CostumeRarity);

  const otherStats = {
    agility: 1000,
    cr: 10,
    cd: 150,
  }

  const firstAbilityStatsNoAsc = costume.Ability[0].AbilityDetail[0].AbilityStatus

  const firstAbilityStatsWithAsc = costume.Ability[0].AbilityDetail[3].AbilityStatus
  const secondAbilityStatsWithAsc = costume.Ability[1].AbilityDetail[3].AbilityStatus

  const baseStats = {
    hp: calc(base, costume.StatusCalculation.HpFunction.Parameters),
    atk: calc(base, costume.StatusCalculation.AttackFunction.Parameters),
    def: calc(base, costume.StatusCalculation.VitalityFunction.Parameters),
    ...otherStats
  }

  const baseMaxNoAscensionStats = {
    hp: calc(maxNoAsc, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(maxNoAsc, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(maxNoAsc, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const baseMaxWithAscensionStats = {
    hp: calc(maxWithAsc, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(maxWithAsc, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(maxWithAsc, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const stats = {
    base: {
      base: baseStats,
      displayed: {
        hp: Math.floor(baseStats.hp * (1 + (firstAbilityStatsNoAsc.Hp / 1000))),
        atk: Math.floor(baseStats.atk * (1 + (firstAbilityStatsNoAsc.Attack / 1000))),
        def: Math.floor(baseStats.def * (1 + (firstAbilityStatsNoAsc.Vitality / 1000))),
        agility: Math.floor(baseStats.agility * (1 + (firstAbilityStatsNoAsc.Agility / 1000))),
        cr: Math.floor(baseMaxNoAscensionStats.cr + (firstAbilityStatsNoAsc.CriticalRatioPermil / 10)),
        cd: Math.floor(baseMaxNoAscensionStats.cd + (firstAbilityStatsNoAsc.CriticalAttackRatioPermil / 10)),
      }
    },
    maxNoAscension: {
      base: baseMaxNoAscensionStats,
      displayed: {
        hp: Math.floor(baseMaxNoAscensionStats.hp * (1 + (firstAbilityStatsNoAsc.Hp / 1000))),
        atk: Math.floor(baseMaxNoAscensionStats.atk * (1 + (firstAbilityStatsNoAsc.Attack / 1000))),
        def: Math.floor(baseMaxNoAscensionStats.def * (1 + (firstAbilityStatsNoAsc.Vitality / 1000))),
        agility: Math.floor(baseMaxNoAscensionStats.agility * (1 + (firstAbilityStatsNoAsc.Agility / 1000))),
        cr: Math.floor(baseMaxNoAscensionStats.cr + (firstAbilityStatsNoAsc.CriticalRatioPermil / 10)),
        cd: Math.floor(baseMaxNoAscensionStats.cd + (firstAbilityStatsNoAsc.CriticalAttackRatioPermil / 10)),
      }
    },
    maxWithAscension: {
      base: baseMaxWithAscensionStats,
      displayed: {
        // Calculating first and second ability (2nd ability is unlocked after ascension) It is just in case 2 abilities influences the same stat
        hp: Math.floor(baseMaxWithAscensionStats.hp * (1 + (firstAbilityStatsWithAsc.Hp / 1000)) * (1 + (secondAbilityStatsWithAsc.Hp / 1000))),
        atk: Math.floor(baseMaxWithAscensionStats.atk * (1 + (firstAbilityStatsWithAsc.Attack / 1000)) * (1 + (secondAbilityStatsWithAsc.Attack / 1000))),
        def: Math.floor(baseMaxWithAscensionStats.def * (1 + (firstAbilityStatsWithAsc.Vitality / 1000)) * (1 + (secondAbilityStatsWithAsc.Vitality / 1000))),
        agility: Math.floor(baseMaxWithAscensionStats.agility * (1 + (firstAbilityStatsWithAsc.Agility / 1000)) * (1 + (secondAbilityStatsWithAsc.Agility / 1000))),
        cr: Math.floor(
            baseMaxWithAscensionStats.cr + (firstAbilityStatsWithAsc.CriticalRatioPermil / 10) + (secondAbilityStatsWithAsc.CriticalRatioPermil / 10)
          ),
        cd: Math.floor(
            baseMaxWithAscensionStats.cd + (firstAbilityStatsWithAsc.CriticalAttackRatioPermil / 10) + (secondAbilityStatsWithAsc.CriticalAttackRatioPermil / 10)
          ),
      }
    },
  }

  return stats;
}

function getAllStats(costume) {
  const otherStats = {
    agility: 1000,
    cr: 10,
    cd: 150,
  }

  const baseStats = {
    hp: calc(1, costume.StatusCalculation.HpFunction.Parameters),
    atk: calc(1, costume.StatusCalculation.AttackFunction.Parameters),
    def: calc(1, costume.StatusCalculation.VitalityFunction.Parameters),
    ...otherStats
  }

  const baseMaxNoAscensionStats = {
    hp: calc(70, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(70, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(70, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const baseMaxNoAscensionStats50 = {
    hp: calc(50, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(50, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(50, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const baseMaxNoAscensionStats60 = {
    hp: calc(60, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(60, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(60, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const baseMaxWithAscensionStats75 = {
    hp: calc(75, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(75, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(75, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const baseMaxWithAscensionStats80 = {
    hp: calc(80, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(80, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(80, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const baseMaxWithAscensionStats85 = {
    hp: calc(85, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(85, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(85, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const baseMaxWithAscensionStats = {
    hp: calc(90, costume.StatusCalculation.HpFunction.Parameters),
      atk: calc(90, costume.StatusCalculation.AttackFunction.Parameters),
      def: calc(90, costume.StatusCalculation.VitalityFunction.Parameters),
      ...otherStats
  }

  const stats = {
    1: {
      base: baseStats,
    },
    50: {
      base: baseMaxNoAscensionStats50,
    },
    60: {
      base: baseMaxNoAscensionStats60,
    },
    70: {
      base: baseMaxNoAscensionStats,
    },
    75: {
      base: baseMaxWithAscensionStats75,
    },
    80: {
      base: baseMaxWithAscensionStats80,

    },
    85: {
      base: baseMaxWithAscensionStats85,
    },
    90: {
      base: baseMaxWithAscensionStats,
    },
  }

  return stats;
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
    maxAge: 3600000,
})

export {
    memGetAllCostumes as getAllCostumes,
}
