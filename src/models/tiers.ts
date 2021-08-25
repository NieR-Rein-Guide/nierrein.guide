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
}

export interface Tiers {
  S?: Tier[];
  A?: Tier[];
  B?: Tier[];
  C?: Tier[];
  D?: Tier[];
  E?: Tier[];
}

const tiers = [
  {
    index: 0,
    label: "PvE",
    backgroundImg: pveBackgroundImg,
    tiers: {
      S: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      A: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      B: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      C: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      D: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      E: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
    },
  },
  {
    index: 1,
    label: "PvP",
    backgroundImg: pvpBackgroundImg,
    tiers: {
      S: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      A: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      B: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      C: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      D: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      E: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
    },
  },
  {
    index: 2,
    label: "Weapons",
    backgroundImg: weaponsBackgroundImg,
    tiers: {
      S: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      A: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }, { name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      B: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      C: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      D: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
      E: [{ name: '2B', thumbnail: 'https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_1.png' }],
    },
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