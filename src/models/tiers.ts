import pveBackgroundImg from "../../public/tierlists/pve.jpg";
import pvpBackgroundImg from "../../public/tierlists/pvp.jpg";
import weaponsBackgroundImg from "../../public/tierlists/weapons.jpg";

import SearchRankSS from '../../public/ui/search/search_rank_ss.png';
import SearchRankS from '../../public/ui/search/search_rank_1.png';
import SearchRankA from '../../public/ui/search/search_rank_2.png';
import SearchRankB from '../../public/ui/search/search_rank_3.png';
import SearchRankC from '../../public/ui/search/search_rank_4.png';
import SearchRankD from '../../public/ui/search/search_rank_5.png';
import SearchRankE from '../../public/ui/search/search_rank_6.png';
import { sheets } from "@libs/s3";

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
    agility: number;
    atk: number;
    def: number;
    total: number;
  };
}

export interface Tiers {
  SS?: Tier[];
  S?: Tier[];
  A?: Tier[];
  B?: Tier[];
  C?: Tier[];
  D?: Tier[];
  E?: Tier[];
}

export interface TiersTabs {
  index: number;
  label: string;
  type: 'characters' | 'weapons';
  backgroundImg: StaticImageData;
  lastUpdated: string;
  tiers: Tiers;
  content?: string;
  coverImg?: string;
}

const RANK_THUMBNAILS = {
  SS: SearchRankSS,
  S: SearchRankS,
  A: SearchRankA,
  B: SearchRankB,
  C: SearchRankC,
  D: SearchRankD,
  E: SearchRankE,
}

function forceToNumber(number: string | number) {
  const string = number.toString().replaceAll(' ', '')
  return Number.parseInt(string, 10)
}

async function getTiers() {
  // SheetCostume[]
  const [pvpSheet, pvpSheetInfo] = await Promise.all([
    sheets.get('pvp-tier'),
    sheets.get('pvp-tier-info')
  ])

  const pvpInfo = pvpSheetInfo[0]

  const pvpTiers = pvpSheet.reduce((acc, costume) => {
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

  const pveTier = {
    index: 0,
    label: "PvE",
    type: 'characters',
    lastUpdated: "2021-08-25T20:09:04.030Z",
    backgroundImg: pveBackgroundImg,
    coverImg: "https://nierrein.guide/tierlists/cover-pve.jpg",
    tiers: {
      S: [
        {
          name: "2P",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_81.png",
        },
        {
          name: "A2",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_19.png",
        },
        {
          name: "Emil",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_35.png",
        },
        {
          name: "The World Ender",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_33.png",
        },
        {
          name: "Gayle",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_85.png",
        },
        {
          name: "Noelle",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_88.png",
        },
        {
          name: "Griff",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_62.png",
        },
        {
          name: "Dimos",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_74.png",
        },
      ],
      A: [
        {
          name: "2B",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_17.png",
        },
        {
          name: "Gayle",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_69.png",
        },
        {
          name: "Zero",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_57.png",
        },
        {
          name: "Gayle",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_4.png",
        },
        {
          name: "Rion",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_71.png",
        },
        {
          name: "Dimos",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_6.png",
        },
        {
          name: "Griff",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_87.png",
        },
        {
          name: "Akeha",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_72.png",
        },
        {
          name: "O63y",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_67.png",
        },
      ],
      B: [
        {
          name: "Levania",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_80.png",
        },
        {
          name: "Fio",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_58.png",
        },
        {
          name: "Kaine",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_34.png",
        },
        {
          name: "F66x",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_28.png",
        },
        {
          name: "Noelle",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_64.png",
        },
        {
          name: "Argo",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_53.png",
        },
      ],
      C: [
        {
          name: "Akeha",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_83.png",
        },
        {
          name: "Fio",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_82.png",
        },
        {
          name: "Lars",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_48.png",
        },
        {
          name: "Fio",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_70.png",
        },
        {
          name: 'Rion',
          thumb: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_14.png'
        },
        {
          name: 'Fio',
          thumb: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_52.png'
        }
      ],
      D: [
        {
          name: "Argo",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_86.png",
        },
        {
          name: "Fio",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_89.png",
        },
        {
          name: "Akeha",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_5.png",
        },
        {
          name: "9S",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_18.png",
        },
        {
          name: "Fio",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_12.png",
        },
      ],
      E: [
        {
          name: "Argo",
          thumb:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_15.png",
        },
        {
          name: "063y",
          thumb: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_31.png"
        },
        {
          name: "Akeha",
          thumb: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_59.png"
        },
        {
          name: "Rion",
          thumb: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_54.png"
        },
        {
          name: "F66x",
          thumb: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_84.png"
        },
      ],
    },
    }

  const pvpTier = {
    index: 1,
    label: "PvP",
    type: 'characters',
    backgroundImg: pvpBackgroundImg,
    lastUpdated: pvpInfo.date,
    coverImg: "https://nierrein.guide/tierlists/cover-pvp.jpg",
    content: `<img src="${pvpInfo.image}" alt="" loading="lazy" />`,
    tiers: pvpTiers,
  }

  const weaponsTier = {
    index: 2,
    label: "Weapons",
    type: 'weapons',
    backgroundImg: weaponsBackgroundImg,
    lastUpdated: "2021-08-25T20:09:04.030Z",
    coverImg: "https://nierrein.guide/tierlists/cover-weapons.jpg",
    content: '<img src="https://share.keziahmoselle.fr/2021/08/brave_NNe3zhirLW.png" alt="Weapons tier list" />',
    tiers: {},
  }

  return {
    pveTier,
    pvpTier,
    weaponsTier,
    pvpSheet
  }
}


export {
  getTiers,
  RANK_THUMBNAILS
}