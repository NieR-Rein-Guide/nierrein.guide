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
  author: string;
  content: string;
  cover?: {
    width?: number;
    height?: number;
    url?: string;
    formats?: StrapiImageFormats;
  };
  published_at: string;
  updated_at?: string;
}

type CostumeSource = {
  sourceType: string;
  storeName: string;
}

type CostumeStats = {
  agility: number;
  atk: number;
  critDamage: number;
  critRate: number;
  def: number;
  hp: number;
  level: number;
}

export type Costume = {
  id: number;
  name: string;
  title: string;
  rarity: 1 | 2 | 3 | 4 | 5;
  story: string;
  weapon: string;
  weaponType: string;
  actions: {
    abilities: string[];
    skills: string[];
  };
  sources: CostumeSource[];
  stats: {
    base: CostumeStats;
    maxNoAscension: CostumeStats;
    absoluteMax: CostumeStats;
  }
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