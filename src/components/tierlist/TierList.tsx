import Image from "next/image";
import { RANK_THUMBNAILS, TiersTabs } from "@models/tiers";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ReactTooltip from "react-tooltip";

interface TierListProps {
  tier: TiersTabs;
}

export default function TierList({ tier }: TierListProps): JSX.Element {
  const lists = Object.entries(tier.tiers);
  console.log(tier);

  if (lists.length === 0) {
    return (
      <div>
        <span>
          Last updated: {formatDistanceToNow(new Date(tier.lastUpdated))} ago
        </span>

        <p className="text-3xl mb-4">Work In Progress</p>
        {tier.content && (
          <div dangerouslySetInnerHTML={{ __html: tier.content }}></div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 relative">
      <span>
        Last updated: {formatDistanceToNow(new Date(tier.lastUpdated))} ago
      </span>

      {lists.map(([rank, items]) => (
        <div className="tierlist__row" key={rank}>
          <Image src={RANK_THUMBNAILS[rank]} alt={rank} />

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {items.map((item, index) => (
              <div key={`${rank}-${item.name}-${index}`} className="relative">
                {item.tooltip && (
                  <>
                    <div
                      data-tip
                      data-for={`${rank}-${item.name}-${index}`}
                      className="absolute -top-2 right-2 bg-white text-black h-6 w-6 flex justify-center items-center rounded-full z-20"
                    >
                      <span>?</span>
                    </div>

                    <ReactTooltip
                      id={`${rank}-${item.name}-${index}`}
                      aria-haspopup="true"
                      className="tierlist-tooltip"
                      effect="solid"
                      delayHide={500}
                      place="top"
                      multiline
                    >
                      <div
                        className="max-w-xs lg:max-w-md"
                        dangerouslySetInnerHTML={{ __html: item.tooltip }}
                      ></div>
                    </ReactTooltip>
                  </>
                )}
                <Link href={`/characters/${item.name}`} passHref={true}>
                  <a className="flex flex-col items-center gap-y-2 w-28 transform transition-transform ease-out-cubic hover:-translate-y-1">
                    <img
                      height="80"
                      width="80"
                      src={item.thumbnail}
                      alt={`${item.name} thumbnail`}
                    />
                    <span className="text-center font-mono">
                      {item.isEX && <span className="text-rarity-4">EX </span>}
                      {item.name}
                    </span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
