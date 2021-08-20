import allCostumes from './characters_stub.json'

const characters = [
    "A2",
]

const stubCostumes = [
    {
        "name": "A2",
        "costumeName": "Vengeful Attacker",
        "story": `An Attacker-type android that deserted YoRHa. Attacker types mainly specialize in close-quarter combat, and served as models for the B-types which were later formally deployed.

All A-type models can access a special function call Berserker mode that offers an explosive increase in attack power at the expense of defense.

This mode was not part of the loadout package for the later B-types.`,
        "skillName": "Low Horizon Bludgeon",
        "lvlOneStats":{
            "force": 534,
            "hp": 2247,
            "attack": 180,
            "defense": 190,
            "agility": 1000,
            "crit": 10,
            "cdmg": 150,
        },
        "lvlMaxStats":{
            "force": 6582,
            "hp": 27481,
            "attack": 2218,
            "defense": 2347,
            "agility": 1000,
            "crit": 10,
            "cdmg": 150,
        },
        "lvlAscStats":{
            "force": 9251,
            "hp": 34979,
            "attack": 3274,
            "defense": 3184,
            "agility": 1000,
            "crit": 10,
            "cdmg": 150,
        },
        "stars": 3,
        "mainWeapon": "2h sword",
        "tier": "SSS+",
        "illustration": "/character/ch003001_full.png"
    }
];

export default stubCostumes;

export {allCostumes}

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
    name: {en: string, ja: string}
    description: {en: string, ja: string}
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

    constructor(values: any) {
        this.character = values.character
        this.name = values.name
        this.description = values.description
        this.stars = values.stars
        this.statsLvl1 = values.stats
        this.statsMax = values.stats
        this.statsMaxAsc = values.stats
        this.skills = values.skills
        this.abilities = values.abilities
        this.weapon = values.weapon
        this.source = values.source
        this.id = values.id
    }
}

export {Stats, CostumeInfo}

const typedCostumes =
    allCostumes
        .map(costume=> new CostumeInfo(costume))
        .sort((a, b) => a.id - b.id) as CostumeInfo[]

const typedCharacters = typedCostumes.reduce((acc, elem) => {
    if (acc.has(elem.character)) {
        acc.get(elem.character).push(elem)
    } else {
        acc.set(elem.character, [elem])
    }
    return acc
}, new Map<CharacterName, CostumeInfo[]>())

console.log(typedCharacters)

export {typedCostumes, typedCharacters}
