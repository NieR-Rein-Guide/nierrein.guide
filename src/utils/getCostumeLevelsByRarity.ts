import { CostumeRarity } from '@models/types'

interface LevelsByRarity {
  base: number;
  maxNoAsc: number;
  maxWithAsc: number;
}

export default function getCostumeLevelsByRarity(rarity: CostumeRarity): LevelsByRarity {
  const base = 1;
  let maxNoAsc = 0;
  let maxWithAsc = 0;

  if (rarity === 'RARE') {
    maxNoAsc = 50;
    maxWithAsc = 70;
  }

  if (rarity === 'S_RARE') {
    maxNoAsc = 60;
    maxWithAsc = 80;
  }

  if (rarity === 'SS_RARE') {
    maxNoAsc = 70;
    maxWithAsc = 90;
  }

  return {
    base,
    maxNoAsc,
    maxWithAsc
  }
}