import pveBackgroundImg from "../../public/tierlists/pve.jpg";
import pvpBackgroundImg from "../../public/tierlists/pvp.jpg";
import weaponsBackgroundImg from "../../public/tierlists/weapons.jpg";

import SearchRankS from '../../public/ui/search/search_rank_1.png';
import SearchRankA from '../../public/ui/search/search_rank_2.png';
import SearchRankB from '../../public/ui/search/search_rank_3.png';
import SearchRankC from '../../public/ui/search/search_rank_4.png';
import SearchRankD from '../../public/ui/search/search_rank_5.png';
import SearchRankE from '../../public/ui/search/search_rank_6.png';

export interface Tier {
  name: string;
  thumbnail: string;
  isJpOnly?: boolean;
}

export interface Tiers {
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
}

const tiers: TiersTabs[] = [
  {
    index: 0,
    label: "PvE",
    type: 'characters',
    lastUpdated: "2021-08-25T20:09:04.030Z",
    backgroundImg: pveBackgroundImg,
    tiers: {
      S: [
        {
          name: "2P",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_81.png",
        },
        {
          name: "A2",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_19.png",
        },
        {
          name: "Emil",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_35.png",
        },
        {
          name: "The World Ender",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_33.png",
        },
        {
          name: "Gayle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_85.png",
        },
        {
          name: "Noelle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_88.png",
        },
        {
          name: "Griff",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_62.png",
        },
        {
          name: "Dimos",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_74.png",
        },
      ],
      A: [
        {
          name: "2B",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_17.png",
        },
        {
          name: "Gayle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_69.png",
        },
        {
          name: "Zero",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_57.png",
        },
        {
          name: "Gayle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_4.png",
        },
        {
          name: "Rion",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_71.png",
        },
        {
          name: "Dimos",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_6.png",
        },
        {
          name: "Griff",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_87.png",
        },
        {
          name: "Akeha",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_72.png",
        },
        {
          name: "O63y",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_67.png",
        },
      ],
      B: [
        {
          name: "Levania",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_80.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_58.png",
        },
        {
          name: "Kaine",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_34.png",
        },
        {
          name: "F66x",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_28.png",
        },
        {
          name: "Noelle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_64.png",
        },
        {
          name: "Argo",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_53.png",
        },
      ],
      C: [
        {
          name: "Akeha",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_83.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_82.png",
        },
        {
          name: "Lars",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_48.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_70.png",
        },
        {
          name: 'Rion',
          thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_14.png'
        },
        {
          name: 'Fio',
          thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_52.png'
        }
      ],
      D: [
        {
          name: "Argo",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_86.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_89.png",
        },
        {
          name: "Akeha",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_5.png",
        },
        {
          name: "9S",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_18.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_12.png",
        },
      ],
      E: [
        {
          name: "Argo",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_15.png",
        },
        {
          name: "063y",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_31.png"
        },
        {
          name: "Akeha",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_59.png"
        },
        {
          name: "Rion",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_54.png"
        },
        {
          name: "F66x",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_84.png"
        },
      ],
    },
  },
  {
    index: 1,
    label: "PvP",
    type: 'characters',
    backgroundImg: pvpBackgroundImg,
    lastUpdated: "2021-08-25T20:09:04.030Z",
    tiers: {
      S: [
        {
          name: "2B",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_17.png",
        },
        {
          name: "2P",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_81.png",
        },
        {
          name: "Griff",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_62.png",
        },
        {
          name: "Gayle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_4.png",
        },
        {
          name: "Gayle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_69.png",
        },
        {
          name: "Akeha",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_83.png",
        },
      ],
      A: [
        {
          name: "A2",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_19.png",
        },
        {
          name: "Dimos",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_6.png",
        },
        {
          name: "Lars",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_48.png",
        },
        {
          name: "The World Ender",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_33.png",
        },
        {
          name: "Zero",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_57.png",
        },
        {
          name: "Rion",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_71.png",
        },
        {
          name: "Gayle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_85.png",
        },
        {
          name: "Dimos",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_74.png",
        },
      ],
      B: [
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_58.png",
        },
        {
          name: 'Rion',
          thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_14.png'
        },
        {
          name: "Argo",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_15.png",
        },
        {
          name: "Akeha",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_72.png",
        },
        {
          name: "Levania",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_80.png",
        },
        {
          name: "Noelle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_88.png",
        },
        {
          name: "Noelle",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_64.png",
        },
        {
          name: "Griff",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_87.png",
        },
        {
          name: "O63y",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_67.png",
        },
      ],
      C: [
        {
          name: "Rion",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_54.png"
        },
        {
          name: "Kaine",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_34.png",
        },
        {
          name: "9S",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_18.png",
        },
        {
          name: "Argo",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_86.png",
        },
        {
          name: 'Fio',
          thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_52.png'
        },
        {
          name: "Emil",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_35.png",
        },
      ],
      D: [
        {
          name: "Argo",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_53.png",
        },
        {
          name: "Akeha",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_5.png",
        },
        {
          name: "F66x",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_28.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_12.png",
        },
        {
          name: "F66x",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_84.png"
        },
      ],
      E: [
        {
          name: "Akeha",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_59.png"
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_70.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_82.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_89.png",
        },
        {
          name: "063y",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_31.png"
        },
      ]
    },
  },
  {
    index: 2,
    label: "Weapons",
    type: 'weapons',
    backgroundImg: weaponsBackgroundImg,
    lastUpdated: "2021-08-25T20:09:04.030Z",
    content: '<img src="https://share.keziahmoselle.fr/2021/08/brave_NNe3zhirLW.png" alt="Weapons tier list" />',
    tiers: {},
  },
];

const RANK_THUMBNAILS = {
  S: SearchRankS,
  A: SearchRankA,
  B: SearchRankB,
  C: SearchRankC,
  D: SearchRankD,
  E: SearchRankE,
}

export {
  tiers,
  RANK_THUMBNAILS
}