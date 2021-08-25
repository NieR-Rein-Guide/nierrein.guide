import Image from "next/image";
import { RANK_THUMBNAILS, Tiers } from "@models/tiers";

interface TierListProps {
  tiers: Tiers;
}

export default function TierList({ tiers }: TierListProps): JSX.Element {
  const lists = Object.entries(tiers);

  return (
    <div className="flex flex-col gap-y-8">
      {lists.map(([rank, items]) => (
        <div className="tierlist__row" key={rank}>
          <Image src={RANK_THUMBNAILS[rank]} alt={rank} />

          <div className="flex flex-wrap gap-4">
            {items.map((item) => (
              <div className="tierlist__item" key={item.name}>
                <img src={item.thumbnail} alt={`${item.name} thumbnail`} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
