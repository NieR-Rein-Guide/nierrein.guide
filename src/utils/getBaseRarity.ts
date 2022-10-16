interface getBaseRarityArgs {
  rarity: string;
  evolution_order: number;
  is_ex_weapon: boolean;
}

type Rarity = 'S_RARE' | 'SS_RARE' | 'S_RARE' | 'RARE'

export default function getBaseRarity({
  rarity,
  evolution_order,
  is_ex_weapon
}: getBaseRarityArgs): Rarity {
  if (is_ex_weapon) {
    return 'S_RARE';
  }

  if (evolution_order === 2 && rarity === 'LEGEND') {
    return 'SS_RARE'
  }

  if (evolution_order === 2 && rarity === 'SS_RARE') {
    return 'S_RARE';
  }

  if (evolution_order === 2 && rarity === 'S_RARE') {
    return 'RARE';
  }


  return rarity;
}