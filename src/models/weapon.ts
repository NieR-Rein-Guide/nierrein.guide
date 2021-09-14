import { getWeapons } from "@libs/mongo";
import jsonAbilities from "../data/ability.json";
import jsonSkills from "../data/skill.json";
import jsonWeapons from "../data/weapon.json";
import { sheets } from "@libs/s3";
import { Weapon } from '@models/types';
import pMemoize from 'p-memoize';

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
	console.log(EvolutionStages)
  return;
}


const memGetAllWeapons = pMemoize(getAllWeapons, {
	maxAge: 3600000,
})

export {
	memGetAllWeapons as getAllWeapons,
	getSingleWeapon,
	getWeapon,
}
