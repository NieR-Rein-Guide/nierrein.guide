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
  name:              string;
  alternativeText:   string;
  caption:           string;
  width:             number;
  height:            number;
  formats:           FluffyFormats;
  hash:              string;
  ext:               EXT;
  mime:              MIME;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          string;
  provider_metadata: null;
  createdAt:         Date;
  updatedAt:         Date;
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

export interface FAQ {
    id:         number;
    attributes: FAQAttributes;
}

export interface FAQAttributes {
    createdAt:     Date;
    updatedAt:     Date;
    locale:        string;
    qa:            QA[];
    localizations: Localizations;
}

export interface QA {
    id:       number;
    question: string;
    answer:   string;
}

export interface Event {
  id:         number;
  attributes: EventAttributes;
}

export interface EventAttributes {
  title:         string;
  createdAt:     Date;
  updatedAt:     Date;
  publishedAt:   Date;
  content:       string;
  start_date:    Date;
  end_date:      Date;
  slug:          string;
  Type:          null;
  gems:          null;
  locale:        string;
  image:         Image;
  localizations: Localizations;
}

export interface Image {
  data: ImageData;
}

export interface ImageData {
  id:         number;
  attributes: StrapiImageAttributes;
}

export interface StrapiImageAttributes {
  name:              string;
  alternativeText:   string;
  caption:           string;
  width:             number;
  height:            number;
  formats:           Formats;
  hash:              string;
  ext:               string;
  mime:              string;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          string;
  provider_metadata: null;
  createdAt:         Date;
  updatedAt:         Date;
}

export interface Formats {
  large:     Large;
  small:     Large;
  medium:    Large;
  thumbnail: Large;
}

export interface Large {
  ext:    string;
  url:    string;
  hash:   string;
  mime:   string;
  name:   string;
  path:   null;
  size:   number;
  width:  number;
  height: number;
}

export interface Localizations {
  data: any[];
}

export interface Guide {
    id:         number;
    attributes: DatumAttributes;
}

export interface DatumAttributes {
    content:       string;
    title:         string;
    slug:          string;
    author:        string;
    description:   null | string;
    createdAt:     Date;
    updatedAt:     Date;
    publishedAt:   Date;
    locale:        string;
    cover:         Cover;
    thumbnail:     Thumbnail;
    localizations: Localizations;
}

export interface Cover {
    data: CoverData;
}

export interface CoverData {
    id:         number;
    attributes: PurpleAttributes;
}

export interface PurpleAttributes {
    name:              string;
    alternativeText:   string;
    caption:           string;
    width:             number;
    height:            number;
    formats:           PurpleFormats;
    hash:              string;
    ext:               EXT;
    mime:              MIME;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export enum EXT {
    Jpg = ".jpg",
    PNG = ".png",
}

export interface PurpleFormats {
    large:     Large;
    small:     Large;
    medium:    Large;
    thumbnail: Large;
}

export interface Large {
    ext:    EXT;
    url:    string;
    hash:   string;
    mime:   MIME;
    name:   string;
    path:   null;
    size:   number;
    width:  number;
    height: number;
}

export enum MIME {
    ImageJPEG = "image/jpeg",
    ImagePNG = "image/png",
}

export interface Localizations {
    data: any[];
}

export interface Thumbnail {
    data: ThumbnailData;
}

export interface ThumbnailData {
    id:         number;
    attributes: FluffyAttributes;
}

export interface FluffyAttributes {
    name:              string;
    alternativeText:   string;
    caption:           string;
    width:             number;
    height:            number;
    formats:           FluffyFormats;
    hash:              string;
    ext:               EXT;
    mime:              MIME;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface FluffyFormats {
    small?:    Large;
    thumbnail: Large;
}

export type Story = {
  id:         number;
  attributes: {
    type:          string;
    title:         string;
    content:       string;
    released_date: Date | null;
    character_id:  null;
    slug:          string;
    createdAt:     Date;
    updatedAt:     Date;
    locale:        Locale;
    cover:         Cover;
    localizations: Localizations;
  };
}

export type WeaponType = "SWORD" | "BIG_SWORD" | "SPEAR" | "FIST" | "STAFF" | "GUN";

export type ElementTypes = "DARK" | "LIGHT" | "FIRE" | "WATER" | "WIND";

export type WeaponEvolutionStage = {
  AssetId: string;
  RarityType: CostumeRarity;
}

export type WeaponSkillStage = {
  name: string;
  description: {
    long?: string;
    short?: string;
  }
  DescriptionSkillTextId: number;
  LevelLowerLimit: number;
  NameSkillTextId: number;
  SkillAssetCategoryId: number;
  SkillAssetVariationId: number;
  SkillCooltimeValue: number;
}

export type WeaponAbilityStage = {
  name: string;
  description: {
    long?: string;
    short?: string;
  }
  DescriptionAbilityTextId: number;
  LevelLowerLimit: number;
  NameAbilityTextId: number;
  AbilityAssetCategoryId: number;
  AbilityAssetVariationId: number;
  AbilityCooltimeValue: number;
}

export type Weapon = {
  ids: {
    base: number;
    asset: string;
    catalogSort: number;
    catalogId: number;
  },
  name: {
    en: string,
  },
  skills: WeaponSkillStage[];
  abilities: WeaponAbilityStage[];
  evolutions: WeaponEvolutionStage[];
  stories: string[];
  rarity: CostumeRarity,
  type: WeaponType,
  attribute: ElementTypes,
  isDark: boolean;
  isStory: boolean;
  isRestrictDiscard: boolean;
  metadata?: {
    character: {
      id: number;
      inLibrary: boolean;
      initialLevel: number;
      sources: {
        firstClear: boolean;
        groupName: string;
        isBookOnly: boolean;
        questName: string;
        questType: string;
        sourceType: string;
      }[];
      spoiler: null | string;
      weapon: string;
      weaponId: string;
    };
    weapon: {
      id: string,
      inLibrary: boolean,
      isDarkWeapon: boolean,
      characterName: string,
      characterTitle: string,
      sources: {
        difficulty: string;
        firstClear: boolean;
        groupName: string;
        questName: string;
        questType: string;
        sourceType: string,
        storeName: string
      }[]
    };
  }
}

export type CostumeRarity = "RARE" | "S_RARE" | "SS_RARE" | "LEGEND"


export type CostumeStats = {
  agility: number;
  atk: number;
  cd: number;
  cr: number;
  def: number;
  hp: number;
}

export type CostumeStatsList = {
  base: {
    base: CostumeStats;
    displayed: CostumeStats;
  };
  maxNoAscension: {
    base: CostumeStats;
    displayed: CostumeStats;
  };
  maxWithAscension: {
    base: CostumeStats;
    displayed: CostumeStats;
  }
}

export type CostumeSource = {
  banner?: string;
  sourceType?: string;
  isBookOnly?: boolean;
  difficulty?: string;
  groupName?: string;
  questName?: string;
  questType?: string;
  storeName?: string;
}

export type CostumeSkill = {
  SkillAssetCategoryId: number;
  SkillAssetVariationId: number;
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
  AssetCategoryId: number;
  AssetVariationId: number;
  DescriptionSkillTextId: number;
  LevelLowerLimit: number;
  NameSkillTextId: number;
  AbilityBehaviorType: string;
  description: {
    short: string;
    long: string;
  }
  name: string;
}

export type CharacterRank = {
  amount: number;
  stat: string;
  type: 'percent' | 'flat'
}

export type Costume = {
  ids: {
    costume: number,
    character: number,
    emblem: number,
    actor: string,
    material: number;
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

    };
    weaponType: WeaponType,
    weapon: Weapon | null;
    rarity: CostumeRarity,
    stats: CostumeStatsList,
  },
  skills: CostumeSkill[][];
  abilities: CostumeAbility[][];
  metadata: {
    name: string;
    title: string;
    inLibrary: boolean;
    id: number;
    rarity: number;
    weapon: string;
    weaponId: string | null;
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
    sources: CostumeSource[];
    ranks: {
      name: string;
      ranks: CharacterRank[];
      totals: {
        agility: {
          flat: number;
          percent: number;
        }
        atk: {
          flat: number;
          percent: number;
        }
        critDamage: {
          flat: number;
          percent: number;
        }
        critRate: {
          flat: number;
          percent: number;
        }
        def: {
          flat: number;
          percent: number;
        }
        hp: {
          flat: number;
          percent: number;
        }
      }
    };
    releaseDate: string | null;
  },
}

export interface NierNotification {
  informationId: number
  informationType: string
  postscriptDatetime: number
  publishStartDatetime: number
  thumbnailImagePath: string | null
  title: string
  webviewMissionId: number
  body?: string
}