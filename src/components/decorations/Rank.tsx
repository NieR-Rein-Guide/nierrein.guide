import rankS from "../../../public/ui/search/search_rank_1.png";
import rankA from "../../../public/ui/search/search_rank_2.png";
import rankB from "../../../public/ui/search/search_rank_3.png";
import rankC from "../../../public/ui/search/search_rank_4.png";
import rankD from "../../../public/ui/search/search_rank_5.png";
import rankE from "../../../public/ui/search/search_rank_6.png";
import Image from "next/legacy/image";

type ranks = "S" | "A" | "B" | "C" | "D" | "E";

export default function Rank({ rank }: { rank: ranks }): JSX.Element {
  let img: StaticImageData;
  switch (rank) {
    case "S":
      img = rankS;
      break;
    case "A":
      img = rankA;
      break;
    case "B":
      img = rankB;
      break;
    case "C":
      img = rankC;
      break;
    case "D":
      img = rankD;
      break;
    case "E":
      img = rankE;
      break;
    default:
      img = rankE;
  }
  return <img src={img} alt="Rank" />;
}
