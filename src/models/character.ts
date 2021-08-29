import { sheets } from '@libs/s3'
import { Costume } from '@models/types'
import allCostumes from './characters_stub.json'

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

export { Stats, CostumeInfo }

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

async function getCharacters() {
  const characters = await sheets.getCharacters();


const typedCostumes =
    characters
        .sort((a, b) => a.id - b.id)

const typedCharacters = typedCostumes.reduce((acc, elem) => {
    if (acc.has(elem.name)) {
        acc.get(elem.name).push(elem)
    } else {
        acc.set(elem.name, [elem])
    }
    return acc
}, new Map<CharacterName, Costume[]>())


  // Converted back to an array because Next.js can't return a Map to client.
  return Array.from(typedCharacters.values())
}

export { typedCostumes, typedCharacters, getCharacters }
