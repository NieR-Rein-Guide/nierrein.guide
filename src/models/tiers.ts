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

export interface Tier {
  name: string;
  thumbnail: string;
  isJpOnly?: boolean;
  isEX?: boolean;
  tooltip?: string;
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

const tiers: TiersTabs[] = [
  {
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
    lastUpdated: "2021-08-31T12:23:56.157Z",
    coverImg: "https://nierrein.guide/tierlists/cover-pvp.jpg",
    tiers: {
      SS: [
        {
          name: 'Gayle',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881528339628712016/unknown.png',
          isEX: true
        },
      ],
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
        {
          name: 'Levania',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881528236918595634/unknown.png',
          isEX: true,
          tooltip: `Tier below without <a href="https://gamewith.jp/nierreincarnation/article/show/290301" class="text-beige">core of Karakuri weapon</a><br/>This weapon enables him, it has short CD and AGI that he desires turning him into absolute weapon.<br/>And this weapon can't be this effective on other fists users because they don't have enough firepower to fully use it`
        },
        {
          name: 'Fio',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881533397846093874/unknown.png',
          isEX: true
        },
        {
          name: 'Lars',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881527786118971463/unknown.png',
          isEX: true
        },
        {
          name: 'Lars',
          thumbnail: 'https://cdn.discordapp.com/attachments/877323861123809300/882231925039849562/c_i_90.png',
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
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_58.png",
        },
        {
          name: "O63y",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_67.png",
        },
        {
          name: '063y',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881530583925268480/unknown.png',
          isEX: true
        },
        {
          name: 'Akeha',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881533332385570856/unknown.png',
          isEX: true
        },
        {
          name: 'Dimos',
          thumbnail: 'https://share.keziahmoselle.fr/2021/08/HD-Player_e8ipCz97tg.png',
          isEX: true
        },
      ],
      B: [
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
          name: "Argo",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_86.png",
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
          name: "F66x",
          thumbnail: "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_84.png"
        },
        {
          name: 'Rion',
          thumbnail: 'https://share.keziahmoselle.fr/2021/08/HD-Player_t7dsNyZPgL.png',
          isEX: true
        },
        {
          name: 'F66x',
          thumbnail: 'https://share.keziahmoselle.fr/2021/08/HD-Player_mnmZncxRXL.png',
          isEX: true
        },
        {
          name: 'Griff',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881580420695748629/unknown.png',
          isEX: true
        },
        {
          name: 'Noelle',
          thumbnail: 'https://cdn.discordapp.com/attachments/877471250405015592/881529747744628756/unknown.png',
          isEX: true
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
          name: 'Fio',
          thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_52.png'
        },
        {
          name: "Emil",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_35.png",
        },
        {
          name: 'Argo',
          thumbnail: 'https://share.keziahmoselle.fr/2021/08/HD-Player_o6heDyIb2X.png',
          isEX: true
        },
      ],
      D: [
        {
          name: "Akeha",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_5.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_89.png",
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
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_53.png",
        },
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
          name: "F66x",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_28.png",
        },
        {
          name: "Fio",
          thumbnail:
            "https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_82.png",
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
    coverImg: "https://nierrein.guide/tierlists/cover-weapons.jpg",
    content: '<img src="https://share.keziahmoselle.fr/2021/08/brave_NNe3zhirLW.png" alt="Weapons tier list" />',
    tiers: {},
  },
];

export {
  tiers,
  RANK_THUMBNAILS
}