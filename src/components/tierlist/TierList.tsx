import Image from "next/legacy/image";
import { formatDistanceToNow } from "date-fns";
import { RANK_THUMBNAILS } from "@utils/rankThumbnails";

/* import Link from "next/link";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
import classNames from "classnames";
import { FiBarChart2 } from "react-icons/fi";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import slugify from "slugify";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { Costume } from "@models/types"; */

/* function findMaxStat(lists, property: "atk" | "def" | "agility") {
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
} */

export default function TierList({ tier }): JSX.Element {
  /* const [isStatsEnabled, setIsStatsEnabled] = useState(false);
  const [maxAtk, setMaxAtk] = useState(10000);
  const [maxDef, setMaxDef] = useState(10000);
  const [maxAgi, setMaxAgi] = useState(10000);
  const lists = Object.entries(tier.tiers);

  const hasStats = lists?.[0]?.[1]?.[0]?.points;

  useEffect(() => {
    if (!isStatsEnabled) {
      return;
    }

    setMaxAtk(findMaxStat(lists, "atk"));
    setMaxDef(findMaxStat(lists, "def"));
    setMaxAgi(findMaxStat(lists, "agility"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatsEnabled]); */

  /* if (lists.length === 0) {
    return (
      <div>
        <p>
          Last updated: {formatDistanceToNow(new Date(tier.lastUpdated))} ago
        </p>

        {tier.content && (
          <div dangerouslySetInnerHTML={{ __html: tier.content }}></div>
        )}
      </div>
    );
  } */

  return (
    <div className="flex flex-col gap-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between pb-8 w-full">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="mb-4">
              Last updated: {formatDistanceToNow(new Date(tier.updated_at))} ago
            </p>
            <p>
              This tierlist has been made by{" "}
              <span className="text-beige">Raon Miru#7516</span>
            </p>
          </div>
          <div className="text-center mt-8 max-w-xl mx-auto">
            <p>
              Damage dealers are ranked from SSS tier to B tier, while
              characters of other roles are not ranked in different tier but
              only from left to right
            </p>
            <a
              className="text-beige border-b border-dotted hover:border-transparent"
              href="https://docs.google.com/document/d/1YNG8cR9lTYwNUFBOOeEAU3bNPP48MQIUGXCfpl1POwA/edit?usp=sharing"
            >
              More info on categorizing can be read here
            </a>
          </div>
        </div>

        {/* {hasStats && (
          <div className="flex flex-row-reverse md:flex-row flex-wrap justify-center mt-4 md:mt-0 gap-4">
            <div className="w-full md:w-28 order-2 md:order-1">
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

            <label className="flex items-center cursor-pointer w-96 order-1 md:order-2">
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
                <div className="ml-6 inline pr-6">Show costume statistics</div>

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
        )} */}
      </div>

      {tier.tiers.map((tier) => (
        <div className="tierlist__row" key={tier.label}>
          {(RANK_THUMBNAILS[tier.label] && (
            <Image src={RANK_THUMBNAILS[tier.label]} alt={tier.label} />
          )) || <h2 className="text-2xl">{tier.label}</h2>}

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {tier.characters.map((character) => (
              <div
                className="h-20 w-20 bg-contain"
                style={{
                  backgroundImage: `url(${character.src})`,
                }}
                key={character.src}
              ></div>
            ))}

            {/* {items.map((item, index) => {
              const costume = costumes.find(
                (costume) => costume.costume.name.en === item.title
              );

              return (
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
                  <Link
                    href={`/characters/${slugify(item.name, { lower: true })}${
                      item.title
                        ? "/" + slugify(item.title, { lower: true })
                        : ""
                    }`}
                    passHref
                  >
                    <a className="flex flex-col items-center w-28 transform transition-transform ease-out-cubic hover:-translate-y-1">
                      {(costume && (
                        <CostumeThumbnail
                          src={`/character/thumbnails/${costume.ids.actor}_thumbnail.png`}
                          rarity={costume.costume.rarity}
                          weaponType={costume.costume.weaponType}
                          alt=""
                        />
                      )) || (
                        <img
                          height="80"
                          width="80"
                          src={item.thumb}
                          alt={`${item.name} thumbnail`}
                        />
                      )}
                      <span className="text-center font-mono line-clamp-1 mt-1">
                        {item.isEX && (
                          <span className="text-rarity-4">EX </span>
                        )}
                        {item.name}
                      </span>
                      {item.title && (
                        <span className="text-xs text-center text-beige line-clamp-1">
                          {item.title}
                        </span>
                      )}
                    </a>
                  </Link>

                  {isStatsEnabled && item.points && (
                    <div className="w-28 my-2 text-center">
                      <span className="text-sm">
                        {Math.round(item.points.total)} points
                      </span>
                      {item.points.atk && (
                        <div className="h-6">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={[item.points]}>
                              <XAxis type="number" hide domain={[0, maxAtk]} />
                              <YAxis type="category" width={1} dataKey="name" />
                              <Bar dataKey="atk" fill="#F87171" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      {item.points.def && (
                        <div className="h-6">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={[item.points]}>
                              <XAxis type="number" hide domain={[0, maxDef]} />
                              <YAxis type="category" width={1} dataKey="name" />
                              <Bar dataKey="def" fill="#60A5FA" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      {item.points.agility && (
                        <div className="h-6">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={[item.points]}>
                              <XAxis type="number" hide domain={[0, maxAgi]} />
                              <YAxis type="category" width={1} dataKey="name" />
                              <Bar dataKey="agility" fill="#34D399" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })} */}
          </div>
          <img
            className="py-8 w-full col-span-full opacity-20"
            src="./border.svg"
            alt=""
          />
        </div>
      ))}

      {/* {hasStats && (
        <span>
          The tier list and statistics were done by <code>yuuru#0107</code>
        </span>
      )} */}
    </div>
  );
}
