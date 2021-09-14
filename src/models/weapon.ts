import { getWeapons } from "@libs/mongo";
import jsonAbilities from "../data/ability.json";
import jsonSkills from "../data/skill.json";
import jsonWeapons from "../data/weapon.json";
import { sheets } from "@libs/s3";
import { CostumeRarity, Weapon, WeaponAbilityStage } from '@models/types';
import pMemoize from 'p-memoize';
import calc from '@utils/calcStats'
import getWeaponLevelsByRarity from "@utils/getWeaponLevelsByRarity";

async function getAllWeapons(): Promise<Weapon[]> {
	const [weapons, weaponsSheet] = await Promise.all([
		getWeapons(),
		sheets.get("weapons")
	]);

	const allWeapons = weapons.map((weapon) => {
	const metadata = weaponsSheet.find(
		(sheetWeapon) => sheetWeapon.id === weapon.BaseWeaponId
		);

		return {
			...getWeapon(weapon),
			metadata,
		};
	});

	return JSON.parse(JSON.stringify(allWeapons))
}

async function getSingleWeapon(BaseWeaponId: number): Promise<Weapon | null> {
	const [weapons, weaponsSheet] = await Promise.all([
		getWeapons(),
		sheets.get("weapons")
	]);

	const weapon = weapons.find((weapon) => weapon.BaseWeaponId === BaseWeaponId);

	if (!weapon) {
		return null
	}

	const metadata = weaponsSheet.find(
		(sheetWeapon) => sheetWeapon.id === weapon.BaseWeaponId
		);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return {
		...getWeapon(weapon),
		metadata
	}
}

function getWeapon(weapon) {
	const data: Weapon = {
		ids: {
			base: weapon.BaseWeaponId,
			asset: weapon.BaseAssetId,
			catalogSort: weapon.CatalogSortOrder,
			catalogId: weapon.CatalogTermId,
		},
		name: {
			en: getWeaponName(weapon.BaseAssetId),
		},
		skills: getSkills(weapon.EvolutionStages),
		abilities: getAbilities(weapon.EvolutionStages),
		stories: getWeaponStories(weapon.EvolutionStages[weapon.EvolutionStages.length - 1].AssetId),
		evolutions: weapon.EvolutionStages,
		rarity: weapon.BaseRarityType,
		type: weapon.WeaponType,
		attribute: weapon.AttributeType,
		isDark: weapon.EvolutionStages.length > 2,
		isStory: weapon.IsRestrictDiscard == false && weapon.RarityType == "RARE",
		isRestrictDiscard: weapon.IsRestrictDiscard,
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	data.stats = []

	// First evolution stage
	data.evolutions.forEach((evolution, index) => {
		data.stats.push(getStats({
			rarity: weapon.BaseRarityType,
			StatusCalculation: weapon.EvolutionStages[index].StatusCalculation,
			abilities: data.abilities[1],
		}))
	})

	return data
}


function getWeaponName(AssetId) {
	return jsonWeapons["name"]?.[`wp${AssetId}`]?.["1"]?.["text_"] ?? '';
}

function getWeaponStories(AssetId): string[] {
	const stories = jsonWeapons["story"]?.[`wp${AssetId}`];

	if (stories) {
		return Object.values(stories).map((a) => a['text_'])
	}

	return []
}

function getSkills(EvolutionStages) {
	const allSkills = EvolutionStages.map(evolution => {
		return evolution.Skill.map(skill => skill.SkillDetail)
	})

	const skills = allSkills.map(skills => {
		return skills.map(stage => {
			return stage.map(skill => ({
				...skill,
				name: jsonSkills["name"]?.[skill.NameSkillTextId]?.["text_"] ?? '',
				description: {
					short:
						jsonSkills["description"]["short"]?.[skill.DescriptionSkillTextId]?.[
							"text_"
						] ?? '',
					long: jsonSkills["description"]["long"]?.[
						skill.DescriptionSkillTextId
					]?.["text_"] ?? '',
				},
			}))
		})
	})

  return skills;
}

function getAbilities(EvolutionStages) {
	const allAbilities = EvolutionStages.map(evolution => {
		return evolution.Ability.map(skill => skill.AbilityDetail)
	})

	const abilities = allAbilities.map(abs => {
		return abs.map(stage => {
			return stage.map(ab => ({
				...ab,
				name: jsonAbilities["name"]?.[`${ab.NameAbilityTextId}`]?.["text_"] ?? '',
				description: {
					short: '',
					long: jsonAbilities["description"]["long"]?.[
						ab.DescriptionAbilityTextId
					]?.["text_"] ?? '',
				},
			}))
		})
	})

  return abilities;
}

function getStats({
	rarity,
	StatusCalculation,
	abilities,
}: {
	rarity: CostumeRarity,
	status: {
		Agility: number;
		Attack: number;
		CriticalAttackRatioPermil: number;
		CriticalRatioPermil: number;
		EvasionRatioPermil: number;
		Hp: number;
		Vitality: number;
	},
	StatusCalculation: {
		HpFunction: {
			Parameters: [number, number, number, number]
		},
		AttackFunction: {
			Parameters: [number, number, number, number]
		},
		VitalityFunction: {
			Parameters: [number, number, number, number]
		},
	},
	abilities: WeaponAbilityStage[];
}) {
  const { base, maxNoAsc, maxWithAsc } = getWeaponLevelsByRarity(rarity);

	const firstAbility = abilities[0][0]
	const secondAbilityMaxLvl = abilities[1][14]

  const baseStats = {
    hp: calc(base, StatusCalculation.HpFunction.Parameters),
    atk: calc(base, StatusCalculation.AttackFunction.Parameters),
    def: calc(base, StatusCalculation.VitalityFunction.Parameters),
  }

  const baseMaxNoAscensionStats = {
    hp: calc(maxNoAsc, StatusCalculation.HpFunction.Parameters),
      atk: calc(maxNoAsc, StatusCalculation.AttackFunction.Parameters),
      def: calc(maxNoAsc, StatusCalculation.VitalityFunction.Parameters),
  }

  const baseMaxWithAscensionStats = {
    hp: calc(maxWithAsc, StatusCalculation.HpFunction.Parameters),
      atk: calc(maxWithAsc, StatusCalculation.AttackFunction.Parameters),
      def: calc(maxWithAsc, StatusCalculation.VitalityFunction.Parameters),
  }

  const stats = {
    base: {
      base: baseStats,
      displayed: {
        hp: Math.floor(baseStats.hp * (1 + (firstAbility.AbilityStatus.Hp / 1000))),
        atk: Math.floor(baseStats.atk * (1 + (firstAbility.AbilityStatus.Attack / 1000))),
        def: Math.floor(baseStats.def * (1 + (firstAbility.AbilityStatus.Vitality / 1000))),
      }
    },
    maxNoAscension: {
      base: baseMaxNoAscensionStats,
      displayed: {
        hp: Math.floor(baseMaxNoAscensionStats.hp * (1 + (firstAbility.AbilityStatus.Hp / 1000))),
        atk: Math.floor(baseMaxNoAscensionStats.atk * (1 + (firstAbility.AbilityStatus.Attack / 1000))),
        def: Math.floor(baseMaxNoAscensionStats.def * (1 + (firstAbility.AbilityStatus.Vitality / 1000))),
      }
    },
    maxWithAscension: {
      base: baseMaxWithAscensionStats,
      displayed: {
        hp: Math.floor(baseMaxWithAscensionStats.hp * (1 + (firstAbility.AbilityStatus.Hp / 1000)) * (1 + (secondAbilityMaxLvl.AbilityStatus.Hp / 1000))),
        atk: Math.floor(baseMaxWithAscensionStats.atk * (1 + (firstAbility.AbilityStatus.Attack / 1000)) * (1 + (secondAbilityMaxLvl.AbilityStatus.Attack / 1000))),
        def: Math.floor(baseMaxWithAscensionStats.def * (1 + (firstAbility.AbilityStatus.Vitality / 1000)) * (1 + (secondAbilityMaxLvl.AbilityStatus.Vitality / 1000))),
      }
    },
  }

  return stats;
}


const memGetAllWeapons = pMemoize(getAllWeapons, {
	maxAge: 3600000,
})

export {
	memGetAllWeapons as getAllWeapons,
	getSingleWeapon,
	getWeapon,
}
