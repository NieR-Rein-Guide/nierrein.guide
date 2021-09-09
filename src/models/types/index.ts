export interface StrapiImageFormats {
  large?: StrapiImage;
  small?: StrapiImage;
  medium?: StrapiImage;
  thumbnail?: StrapiImage;
}

export type Poll = {
  title: string;
  embed: string;
}

export type StrapiImage = {
  ext?: string
  url?: string
  hash?: string
  mime?: string
  name?: string
  path?: string
  size?: number
  width?: number
  height?: number
}

export type FanContent = {
  type: 'art' | 'video';
  author?: string;
  link?: string;
  image?: {
    url?: string;
    formats: StrapiImageFormats;
  };
  published_at?: string;
}

export type Event = {
  title: string;
  slug: string;
  content?: string;
  image?: {
    formats: StrapiImageFormats;
  };
  start_date: string;
  end_date?: string;
  poll?: Poll;
}

export type Guide = {
  slug: string;
  title: string;
  description: string;
  author: string;
  content: string;
  cover?: {
    width?: number;
    height?: number;
    url?: string;
    formats?: StrapiImageFormats;
  };
  thumbnail?: {
    formats?: StrapiImageFormats;
  };
  published_at: string;
  updated_at?: string;
}

export type Story = {
  type: string;
  slug: string;
  cover: {
    formats: StrapiImageFormats;
  };
  title: string;
  content: string;
  released_date: string;
  character_id: number;
}

type WeaponType = "SWORD" | "BIG_SWORD" | "SPEAR" | "FIST" | "STAFF" | "GUN";
type CostumeRarity = "RARE" | "S_RARE" | "SS_RARE"

export type CostumeStats = {
  agility: {
    base: number;
    displayed: number;
  };
  atk: {
    displayed: number,
    base: number
  };
  critDamage: {
    displayed: number,
    base: number
  };
  critRate: {
    displayed: number,
    base: number
  };
  def: {
    displayed: number,
    base: number
  };
  hp: {
    displayed: number,
    base: number
  };
  level: number;
}
export type CostumeSource = {
  difficulty: string;
  groupName: string;
  questName: string;
  questType: string;
  sourceType: string;
}

export type CostumeSkill = {
  DescriptionSkillTextId: number;
  LevelLowerLimit: number;
  NameSkillTextId: number;
  SkillCooltimeValue: number;
  description: {
    short: string;
    long: string;
  }
  name: string;
}

export type CostumeAbility = {
  DescriptionSkillTextId: number;
  LevelLowerLimit: number;
  NameSkillTextId: number;
  description: {
    short: string;
    long: string;
  }
  name: string;
}

export type Costume = {
  ids: {
    costume: number,
    character: number,
    emblem: number,
    actor: string,
  },
  character: {
    en: string,
  },
  costume: {
    name: {
      en: string,
    },
    description: {
      en: string,
    },
    emblem: {

    },
    weaponType: WeaponType,
    rarity: CostumeRarity,
    stats: {
      base: {
        hp: number;
        atk: number;
        def: number;
      },
      maxNoAscension: {
        hp: number;
        atk: number;
        def: number;
      },
      maxWithAscension: {
        hp: number;
        atk: number;
        def: number;
      },
    }
  },
  skills: CostumeSkill[][];
  abilities: CostumeAbility[][];
  metadata: {
    name: string;
    title: string;
    id: number;
    rarity: number;
    weapon: string;
    weaponType: string;
    story: string;
    actions: {
      skills: [];
      abilities: [];
    };
    stats: {
      absoluteMax: CostumeStats
      maxNoAscension: CostumeStats
      min: CostumeStats
    };
    sources: CostumeSource[]
  },
}