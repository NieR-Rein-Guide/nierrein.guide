const rankS = "/ui/search/search_rank_1.png";
const rankA = "/ui/search/search_rank_2.png";
const rankB = "/ui/search/search_rank_3.png";
const rankC = "/ui/search/search_rank_4.png";
const rankD = "/ui/search/search_rank_5.png";
const rankE = "/ui/search/search_rank_6.png";


type ranks = "S" | "A" | "B" | "C" | "D" | "E";

export default function Rank({ rank }: { rank: ranks }): JSX.Element {
  let img: string;
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
