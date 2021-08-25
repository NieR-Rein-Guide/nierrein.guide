import Image from "next/image";
import { RANK_THUMBNAILS, TiersTabs } from "@models/tiers";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface TierListProps {
  tier: TiersTabs;
}

export default function TierList({ tier }: TierListProps): JSX.Element {
  const lists = Object.entries(tier.tiers);
  console.log(tier);

  if (lists.length === 0) {
    return (
      <div className="text-3xl">
        <p className="mb-4">Work In Progress</p>
        {tier.content && (
          <div dangerouslySetInnerHTML={{ __html: tier.content }}></div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      <span>
        Last updated: {formatDistanceToNow(new Date(tier.lastUpdated))} ago
      </span>

      {lists.map(([rank, items]) => (
        <div className="tierlist__row" key={rank}>
          <Image src={RANK_THUMBNAILS[rank]} alt={rank} />

          <div className="flex flex-wrap gap-4">
            {items.map((item) => (
              <Link
                key={item.thumbnail}
                href={`/characters/${item.name}`}
                passHref={true}
              >
                <a className="flex flex-col items-center gap-y-2 w-28 transform transition-transform ease-out-cubic hover:-translate-y-1">
                  <img
                    height="80"
                    width="80"
                    src={item.thumbnail}
                    alt={`${item.name} thumbnail`}
                  />
                  <span className="text-center font-mono">{item.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
