import tierlistSubjugation from '../data/tierlist_subjugation.json'

import SearchRankSSS from '../../public/ui/search/search_rank_sss.png';
import SearchRankSS from '../../public/ui/search/search_rank_ss.png';
import SearchRankS from '../../public/ui/search/search_rank_1.png';
import SearchRankA from '../../public/ui/search/search_rank_2.png';
import SearchRankB from '../../public/ui/search/search_rank_3.png';
import SearchRankC from '../../public/ui/search/search_rank_4.png';
import SearchRankD from '../../public/ui/search/search_rank_5.png';
import SearchRankE from '../../public/ui/search/search_rank_6.png';
import SearchRankF from '../../public/ui/search/search_rank_7.png';

export interface SheetCostume {
  name: string;
  points: {
    agility: number;
    atk: number;
    def: number;
    total: number;
  };
  thumb: string;
  tier: string;
  title: string;
}

export interface Tier {
  name: string;
  thumb: string;
  isJpOnly?: boolean;
  isEX?: boolean;
  tooltip?: string;
  title?: string;
  points: {
    agility: number | null;
    atk: number | null;
    def: number | null;
    total: number | null;
  };
}

export interface Tiers {
  SSS?: Tier[];
  SS?: Tier[];
  S?: Tier[];
  A?: Tier[];
  B?: Tier[];
  C?: Tier[];
  D?: Tier[];
  E?: Tier[];
}

export interface TiersTabs {
  index?: number;
  label: string;
  type: 'characters' | 'weapons';
  backgroundImg: StaticImageData;
  lastUpdated: string;
  tiers: {
    label: string;
    characters: {
      src: string;
    }[]
  }[];
  content?: string;
  coverImg?: string;
}

const RANK_THUMBNAILS = {
  SSS: SearchRankSSS,
  SS: SearchRankSS,
  S: SearchRankS,
  A: SearchRankA,
  B: SearchRankB,
  C: SearchRankC,
  D: SearchRankD,
  E: SearchRankE,
  F: SearchRankF,
}

/* function forceToNumber(number: string | number): number | null {
  if (!number) return null
  const string = number.toString().replaceAll(' ', '')
  return Number.parseInt(string, 10)
}

function sheetToTier(sheet) {
  return sheet.reduce((acc, costume) => {
    const newCostume = {
      ...costume,
      isEX: costume.title.toLowerCase().includes('reborn'),
      points: {
        agility: forceToNumber(costume.points.agility),
        atk: forceToNumber(costume.points.atk),
        def: forceToNumber(costume.points.def),
        total: forceToNumber(costume.points.total),
      }
    }

    if (acc[costume.tier]) {
      acc[costume.tier].push(newCostume);
      return acc;
    }

    acc[costume.tier] = [newCostume];

    return acc;
  }, {});
} */

function getTiers() {
  const subjugationTier = {
    label: "Subjugation & Abyss",
    type: 'characters',
    lastUpdated: tierlistSubjugation.updatedAt,
    coverImg: "https://nierrein.guide/tierlists/cover-pve.jpg",
    tiers: tierlistSubjugation.tiers,
  }

  return {
    subjugationTier,
  }
}


export {
  getTiers,
  RANK_THUMBNAILS
}