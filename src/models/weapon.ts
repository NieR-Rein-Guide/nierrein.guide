import { getWeapons } from "@libs/mongo";
import jsonAbilities from "../data/ability.json";
import jsonSkills from "../data/skill.json";
import jsonWeapons from "../data/weapon.json";
import { sheets } from "@libs/s3";
import { Weapon } from '@models/types';
import pMemoize from 'p-memoize';
import calc from '@utils/calcStats'

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

	const weapon = weapons.find((weapon) => {
		console.log(weapon.BaseWeaponId, BaseWeaponId)
		return weapon.BaseWeaponId === BaseWeaponId
	});

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
	return {
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
	};
}


function getWeaponName(AssetId) {
	return jsonWeapons["name"]?.[`wp${AssetId}`]?.["1"]?.["text_"] ?? '';
}

function getWeaponStories(AssetId) {
	const stories = jsonWeapons["story"]?.[`wp${AssetId}`];

	if (stories) {
		return Object.values(stories).map((a) => a['text_'])
	}

	return {}
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

// function getStats(costume) {
//   const { base, maxNoAsc, maxWithAsc } = getCostumeLevelsByRarity(costume.RarityType as CostumeRarity);


//   const firstAbilityStatsNoAsc = costume.Ability[0].AbilityDetail[0].AbilityStatus

//   const firstAbilityStatsWithAsc = costume.Ability[0].AbilityDetail[3].AbilityStatus
//   const secondAbilityStatsWithAsc = costume.Ability[1].AbilityDetail[3].AbilityStatus

//   const baseStats = {
//     hp: calc(base, costume.StatusCalculation.HpFunction.Parameters),
//     atk: calc(base, costume.StatusCalculation.AttackFunction.Parameters),
//     def: calc(base, costume.StatusCalculation.VitalityFunction.Parameters),
//   }

//   const baseMaxNoAscensionStats = {
//     hp: calc(maxNoAsc, costume.StatusCalculation.HpFunction.Parameters),
//       atk: calc(maxNoAsc, costume.StatusCalculation.AttackFunction.Parameters),
//       def: calc(maxNoAsc, costume.StatusCalculation.VitalityFunction.Parameters),
//   }

//   const baseMaxWithAscensionStats = {
//     hp: calc(maxWithAsc, costume.StatusCalculation.HpFunction.Parameters),
//       atk: calc(maxWithAsc, costume.StatusCalculation.AttackFunction.Parameters),
//       def: calc(maxWithAsc, costume.StatusCalculation.VitalityFunction.Parameters),
//   }

//   const stats = {
//     base: {
//       base: baseStats,
//       displayed: {
//         hp: Math.floor(baseStats.hp * (1 + (firstAbilityStatsNoAsc.Hp / 1000))),
//         atk: Math.floor(baseStats.atk * (1 + (firstAbilityStatsNoAsc.Attack / 1000))),
//         def: Math.floor(baseStats.def * (1 + (firstAbilityStatsNoAsc.Vitality / 1000))),
//       }
//     },
//     maxNoAscension: {
//       base: baseMaxNoAscensionStats,
//       displayed: {
//         hp: Math.floor(baseMaxNoAscensionStats.hp * (1 + (firstAbilityStatsNoAsc.Hp / 1000))),
//         atk: Math.floor(baseMaxNoAscensionStats.atk * (1 + (firstAbilityStatsNoAsc.Attack / 1000))),
//         def: Math.floor(baseMaxNoAscensionStats.def * (1 + (firstAbilityStatsNoAsc.Vitality / 1000))),
//       }
//     },
//     maxWithAscension: {
//       base: baseMaxWithAscensionStats,
//       displayed: {
//         // Calculating first and second ability (2nd ability is unlocked after ascension) It is just in case 2 abilities influences the same stat
//         hp: Math.floor(baseMaxWithAscensionStats.hp * (1 + (firstAbilityStatsWithAsc.Hp / 1000)) * (1 + (secondAbilityStatsWithAsc.Hp / 1000))),
//         atk: Math.floor(baseMaxWithAscensionStats.atk * (1 + (firstAbilityStatsWithAsc.Attack / 1000)) * (1 + (secondAbilityStatsWithAsc.Attack / 1000))),
//         def: Math.floor(baseMaxWithAscensionStats.def * (1 + (firstAbilityStatsWithAsc.Vitality / 1000)) * (1 + (secondAbilityStatsWithAsc.Vitality / 1000))),
//       }
//     },
//   }

//   return stats;
// }


const memGetAllWeapons = pMemoize(getAllWeapons, {
	maxAge: 3600000,
})

export {
	memGetAllWeapons as getAllWeapons,
	getSingleWeapon,
	getWeapon,
}
