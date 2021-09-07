import allCostumes from './characters_stub.json'
import { getCostumes } from "@libs/mongo";
import jsonAbilities from "../data/ability.json";
import jsonSkills from "../data/skill.json";
import jsonCostumes from "../data/costume.json";
import jsonCharacters from "../data/character.json";
import { sheets } from "@libs/s3";
import { Costume } from '@models/types';

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

    return allCostumes
}

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


class Stats {
    force: number
    hp: number
    attack: number
    defence: number
    agility: number
    criticalRate: number
    criticalDamage: number
}
type CharacterName = string
class CostumeInfo {
    character: CharacterName
    name: { en: string, ja: string }
    description: { en: string, ja: string }
    stars: number
    statsLvl1: Stats
    statsMax: Stats
    statsMaxAsc: Stats
    skills: string[]
    abilities: string[]
    weapon: string[]
    source: {
        banners: string[]
        story: string[]
    }
    id: number

    get illustrationURL(): string {
        return `/character/ch${this.id.toString().padStart(6, '0')}_full.png`
    }

    get mediumURL(): string {
        return `/character_medium/ch${this.id.toString().padStart(6, '0')}_full-1920-1080.png`
    }

    get thumbnailURL(): string {
        return `/character/thumbnails/ch${this.id.toString().padStart(6, '0')}_thumbnail.png`
    }

    get iconURL(): string {
        switch (this.id) {
            case 1003: return `/ui/actor/ch001003_01_actor_icon.png` // 2P
        }
        // id = 19005
        const id = Math.floor(this.id / 1000) * 1000 + 1
        // id = 19001
        const v = `/ui/actor/ch${id.toString().padStart(6, '0')}_01_actor_icon.png`

        return v;
    }

    constructor(values: any) {
        this.character = values.character
        this.name = values.name
        this.description = values.description
        this.stars = values.stars
        this.statsLvl1 = new Stats()
        this.statsMax = new Stats()
        this.statsMaxAsc = values.stats
        this.skills = values.skills
        this.abilities = values.abilities
        this.weapon = values.weapon
        this.source = values.source
        this.id = values.id
    }
}

const typedCostumes =
    allCostumes
        .map(costume => new CostumeInfo(costume))
        .sort((a, b) => a.id - b.id) as CostumeInfo[]

const typedCharacters = typedCostumes.reduce((acc, elem) => {
    if (acc.has(elem.character)) {
        acc.get(elem.character).push(elem)
    } else {
        acc.set(elem.character, [elem])
    }
    return acc
}, new Map<CharacterName, CostumeInfo[]>())

export { typedCostumes, typedCharacters, Stats, CostumeInfo, getAllCostumes }
