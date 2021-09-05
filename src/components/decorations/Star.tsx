import one from "../../../public/icons/stars/1_star_single.svg";
import two from "../../../public/icons/stars/2_star_single.svg";
import three from "../../../public/icons/stars/3_star_single.svg";
import four from "../../../public/icons/stars/4_star_single.svg";
import five from "../../../public/icons/stars/5_star_single.svg";
import Image from "next/image";

const STAR_RARITY = {
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
};

interface StarProps {
  rarity: 1 | 2 | 3 | 4 | 5 | number;
}

export default function Star({ rarity }: StarProps): JSX.Element {
  return <Image src={STAR_RARITY[rarity]} alt={`Star rarity lvl ${rarity}`} />;
}
