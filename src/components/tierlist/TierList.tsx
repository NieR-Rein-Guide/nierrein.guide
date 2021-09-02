import Image from "next/image";
import { RANK_THUMBNAILS, Tier, TiersTabs } from "@models/tiers";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import classNames from "classnames";
import { FiBarChart2 } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { coerceInputValue } from "graphql";

interface TierListProps {
  tier: TiersTabs;
}

function findMaxStat(lists, property: "atk" | "def" | "agility") {
  return lists.reduce((acc, [, list]) => {
    const max = list.reduce((acc, costume) => {
      const stat = costume.points[property];

      if (acc >= stat) {
        return acc;
      }

      return stat;
    }, 0);

    if (acc >= max) {
      return acc;
    }

    return max;
  }, 0);
}

export default function TierList({ tier }: TierListProps): JSX.Element {
  const [isStatsEnabled, setIsStatsEnabled] = useState(false);
  const [maxAtk, setMaxAtk] = useState(10000);
  const [maxDef, setMaxDef] = useState(10000);
  const [maxAgi, setMaxAgi] = useState(10000);
  const lists = Object.entries(tier.tiers);

  useEffect(() => {
    if (!isStatsEnabled) {
      return;
    }

    setMaxAtk(findMaxStat(lists, "atk"));
    setMaxDef(findMaxStat(lists, "def"));
    setMaxAgi(findMaxStat(lists, "agility"));
  }),
    [isStatsEnabled];

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
      <div className="flex justify-between">
        <span>
          Last updated: {formatDistanceToNow(new Date(tier.lastUpdated))} ago
        </span>

        {lists[0][1][0].points && (
          <div className="flex gap-x-4">
            <div className="w-28">
              <p className="flex items-center gap-x-2">
                <span className="w-4 h-4 bg-red-400 inline-block"></span> ATK
              </p>
              <p className="flex items-center gap-x-2">
                <span className="w-4 h-4 bg-blue-400 inline-block"></span> DEF
              </p>
              <p className="flex items-center gap-x-2">
                <span className="w-4 h-4 bg-green-400 inline-block"></span>{" "}
                AGILITY
              </p>
            </div>

            <label className="flex items-center cursor-pointer w-96">
              <li
                className={classNames(
                  "inline-flex items-center py-6 px-8 rounded-sm w-full relative transition hover:bg-grey-dark border border-beige-inactive",
                  isStatsEnabled ? "bg-grey-dark" : "bg-grey-foreground"
                )}
              >
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={isStatsEnabled}
                  onChange={() => setIsStatsEnabled(!isStatsEnabled)}
                />
                <div className="ml-6 inline pr-6">Show costume stats</div>

                <FiBarChart2 className="absolute right-8 top-1/2 transform -translate-y-1/2 h-8 w-8" />

                <img
                  className={classNames(
                    "absolute h-16 left-2 transform scale-90 ease-out-cubic transition-all",
                    isStatsEnabled ? "opacity-100 scale-100" : "opacity-0"
                  )}
                  src="/ui/costume_emblem/costume_emblem099_full.png"
                  alt="Checked"
                />
              </li>
            </label>
          </div>
        )}
      </div>

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
                      src={item.thumb}
                      alt={`${item.name} thumbnail`}
                    />
                    <span className="text-center font-mono">
                      {item.isEX && <span className="text-rarity-4">EX </span>}
                      {item.name}
                    </span>
                  </a>
                </Link>

                {isStatsEnabled && item.points && (
                  <div className="w-28 my-2 text-center">
                    <span className="text-sm">
                      {Math.round(item.points.total)} points
                    </span>
                    <div className="h-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[item.points]}>
                          <XAxis type="number" hide domain={[0, maxAtk]} />
                          <YAxis type="category" width={1} dataKey="name" />
                          <Bar dataKey="atk" fill="#F87171" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[item.points]}>
                          <XAxis type="number" hide domain={[0, maxDef]} />
                          <YAxis type="category" width={1} dataKey="name" />
                          <Bar dataKey="def" fill="#60A5FA" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[item.points]}>
                          <XAxis type="number" hide domain={[0, maxAgi]} />
                          <YAxis type="category" width={1} dataKey="name" />
                          <Bar dataKey="agility" fill="#34D399" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
