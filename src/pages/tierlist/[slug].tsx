import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { tiers, tiers_items, tierlists } from "@prisma/client-nrg";
import { NextPageContext } from "next";
import { character, costume } from "@prisma/client";
import CostumeThumbnail from "@components/CostumeThumbnail";
import { CDN_URL } from "@config/constants";
import RARITY from "@utils/rarity";
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import WeaponThumbnail from "@components/WeaponThumbnail";
import { RANK_THUMBNAILS } from "@utils/rankThumbnails";
import { useTierlistsVotes } from "@store/tierlist-votes";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Chip, Tooltip } from "@mui/material";
import { FiArrowDown, FiEdit, FiThumbsUp } from "react-icons/fi";
import { useCreatedTierlists } from "@store/created-tierlists";
import Link from "next/link";
import { getTierlist } from "@models/tiers";
import { useInventoryStore } from "@store/inventory";
import Checkbox from "@components/form/Checkbox";
import { useEffect, useRef, useState } from "react";
import getBaseRarity from "@utils/getBaseRarity";
import SVG from "react-inlinesvg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { statsColors } from "@utils/statsColors";
import classNames from "classnames";
import Lines from "@components/decorations/Lines";
import { AiOutlinePushpin } from "react-icons/ai";
import { usePanelStore } from "@store/panels";

/* const COSTUME_STAT_PROPERTIES = [
  "atk",
  "vit",
  "agi",
  "hp",
  "crit_atk",
  "crit_rate",
  "eva_rate",
  "level",
];

const WEAPON_STAT_PROPERTIES = ["atk", "vit", "hp", "level"]; */

const DEFAULT_COSTUME_STAT_PROPERTIES = ["atk", "vit", "agi", "hp"];

const DEFAULT_WEAPON_STAT_PROPERTIES = ["atk", "vit", "hp"];

interface TierListProps {
  tierlist: tierlists & {
    tiers: (tiers & {
      tiers_items: tiers_items[];
    })[];
  };
  items: (costume & {
    character: character;
  })[];
}

export default function TierList({
  tierlist,
  items,
}: TierListProps): JSX.Element {
  return (
    <Layout>
      <Meta
        title={`${tierlist.title} - Tier List`}
        description="A community created tier list."
        cover={
          tierlist.type === "costumes"
            ? "https://nierrein.guide/tools/tierlist-costumes.jpg"
            : "https://nierrein.guide/tools/tierlist-weapons.jpg"
        }
      />

      <nav className="mb-16">
        <Link href="/tierlists/community" passHref={true}>
          <a className="btn">
            <SVG src="/decorations/arrow-left.svg" className="h-6" />
            <span>Go back to tierlists</span>
          </a>
        </Link>
      </nav>

      <section className="pt-8">
        <TierlistContent tierlist={tierlist} items={items} />
      </section>
    </Layout>
  );
}

export function TierlistContent({ tierlist, items }: TierListProps) {
  const router = useRouter();
  const localVotes = useTierlistsVotes((state) => state.votes);
  const addVote = useTierlistsVotes((state) => state.addVote);
  const createdTierlist = useCreatedTierlists((state) => state.tierlists);
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const ownedWeapons = useInventoryStore((state) => state.weapons);

  const addCostumePanel = usePanelStore((state) => state.addCostume);

  const [hasReadMore, setHasReadMore] = useState(false);
  const [showNotesInline, setShowNotesInline] = useState(false);
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const [isStatsEnabled, setIsStatsEnabled] = useState(false);
  const [shownStats] = useState(
    tierlist.type === "weapons"
      ? DEFAULT_WEAPON_STAT_PROPERTIES
      : DEFAULT_COSTUME_STAT_PROPERTIES
  );
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const wysiwyg = useRef<HTMLDivElement>(null);

  const maxStats = {
    atk: findMaxStat(items, "atk"),
    vit: findMaxStat(items, "vit"),
    agi: findMaxStat(items, "agi"),
    hp: findMaxStat(items, "hp"),
  };

  const isOwner = createdTierlist.find(
    (tier) => tier.tierlist_id === tierlist.tierlist_id
  );

  const hasVoted = localVotes.includes(tierlist.tierlist_id);

  async function vote() {
    if (hasVoted) {
      return;
    }

    await axios.post("/api/tierlists/vote", {
      tierlist_id: tierlist.tierlist_id,
    });

    addVote(tierlist.tierlist_id);

    router.replace(router.asPath, undefined, {
      scroll: false,
    });
  }

  function toggleContent() {
    wysiwyg.current.classList.toggle("max-h-36");
    setIsContentExpanded(!isContentExpanded);
  }

  /**
   * Read more
   */
  useEffect(() => {
    if (!wysiwyg.current) {
      return;
    }

    // Content is overflowing
    if (wysiwyg.current.scrollHeight > wysiwyg.current.clientHeight) {
      setHasReadMore(true);
    }
  }, [wysiwyg]);

  return (
    <>
      <div className="grid lg:grid-cols-12 bg-grey-dark p-8 rounded-xl mb-12">
        <div className="flex flex-col items-start justify-between lg:col-span-8">
          <div>
            {!router.asPath.startsWith("/tierlists") && (
              <h2 className="text-4xl mb-2">{tierlist.title}</h2>
            )}
            <p className=" text-beige text-xs mb-2">
              Last updated:{" "}
              {formatDistanceToNow(new Date(tierlist.updated_at), {
                addSuffix: true,
              })}
            </p>
            {tierlist.description && (
              <>
                <div
                  ref={wysiwyg}
                  className="wysiwyg max-h-36 my-4"
                  dangerouslySetInnerHTML={{ __html: tierlist.description }}
                ></div>
                {hasReadMore && (
                  <div className="text-center">
                    <button
                      className="btn flex gap-x-4"
                      onClick={toggleContent}
                    >
                      <span>{isContentExpanded ? "Hide" : "Read more"}</span>
                      <FiArrowDown
                        className={classNames(
                          "transform transition",
                          isContentExpanded ? "rotate-180" : ""
                        )}
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <Button
            onClick={hasVoted ? undefined : vote}
            variant={hasVoted ? "text" : "outlined"}
            color={hasVoted ? "success" : "primary"}
            startIcon={<FiThumbsUp className="pl-1" />}
            className={classNames(
              hasVoted ? "pointer-events-none" : "",
              "hidden lg:flex mt-4"
            )}
          >
            {hasVoted ? "Liked" : "Like"} ({tierlist.votes})
          </Button>
        </div>

        <div className="flex flex-col mt-6 gap-y-8 lg:mt-0 lg:items-end lg:gap-y-4 lg:col-span-4">
          {isOwner && (
            <div className="hidden lg:block">
              <Button
                variant="contained"
                component="a"
                LinkComponent={Link}
                href={`/tools/tierlist-builder/${isOwner.type}?edit_key=${isOwner.edit_key}`}
                startIcon={<FiEdit className="pl-1" />}
              >
                Edit
              </Button>
            </div>
          )}

          <Checkbox
            label="Highlight owned"
            isChecked={showOnlyInventory}
            setState={(e) => setShowOnlyInventory(e.target.checked)}
          />

          <Checkbox
            label="Show notes inline"
            isChecked={showNotesInline}
            setState={(e) => setShowNotesInline(e.target.checked)}
          />

          <Checkbox
            label="Show stats"
            isChecked={isStatsEnabled}
            setState={() => setIsStatsEnabled(!isStatsEnabled)}
          />
        </div>

        <div className="flex justify-center mt-6 lg:hidden">
          <Button
            onClick={hasVoted ? undefined : vote}
            variant={hasVoted ? "text" : "outlined"}
            color={hasVoted ? "success" : "primary"}
            startIcon={<FiThumbsUp className="pl-1" />}
            className={classNames(hasVoted ? "pointer-events-none" : "")}
          >
            {hasVoted ? "Liked" : "Like"} ({tierlist.votes})
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-8 relative">
        {tierlist.tiers.map((tier) => (
          <div className="tierlist__row" key={tier.tier}>
            <div className="mb-4 md:mb-0">
              {(RANK_THUMBNAILS[tier.tier] && (
                <Image src={RANK_THUMBNAILS[tier.tier]} alt={tier.tier} />
              )) || <h2 className="text-2xl">{tier.tier}</h2>}
            </div>

            <div className="grid grid-cols-3 md:flex md:flex-wrap place-items-center md:justify-start gap-4">
              {tierlist.type === "costumes" && (
                <>
                  {tier.tiers_items.map((tierItem) => {
                    const costume = items.find(
                      (item) => item.costume_id === tierItem.item_id
                    );

                    return (
                      <div
                        className={
                          showNotesInline ? "col-span-3 flex w-full" : ""
                        }
                        key={costume.costume_id}
                      >
                        <div
                          className={classNames(
                            "group relative flex flex-col items-center gap-y-2 w-28 font-mono filter transition ease-out-cubic",
                            showOnlyInventory &&
                              !ownedCostumes.includes(tierItem.item_id)
                              ? "brightness-50"
                              : ""
                          )}
                        >
                          {tierItem.tooltip && !showNotesInline && (
                            <Tooltip
                              className="cursor-help"
                              title={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: tierItem.tooltip,
                                  }}
                                ></div>
                              }
                            >
                              <div className="absolute -top-2 right-2 z-20 flex items-center justify-center bg-white text-black rounded-full h-6 w-6 text-lg font-labor">
                                {tierItem.tooltip_is_important ? "!" : "?"}
                              </div>
                            </Tooltip>
                          )}
                          <CostumeThumbnail
                            href={`/characters/${costume.character.slug}/${costume.slug}`}
                            src={`${CDN_URL}${costume.image_path_base}battle.png`}
                            alt={`${costume.title} thumbnail`}
                            rarity={RARITY[costume.rarity]}
                            weaponType={costume.weapon_type}
                            className="transform transition-transform ease-out-cubic hover:-translate-y-1"
                          />
                          <p className="text-center text-sm mb-0 leading-none">
                            {costume.is_ex_costume && (
                              <span className="text-rarity-4">EX </span>
                            )}
                            {costume.character.name}
                          </p>
                          <span className="text-xs text-center text-beige line-clamp-1 leading-none transition-opacity ease-out-cubic group-hover:opacity-0">
                            {costume.title}
                          </span>
                          <button
                            onClick={() => addCostumePanel(costume.costume_id)}
                            className="absolute bottom-0 flex gap-x-1 rounded-full bg-brown px-2 py-1 transition hover:bg-opacity-80 ease-out-cubic translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 umami--click--pin-costume-button"
                          >
                            <AiOutlinePushpin />
                            <span className="text-xs">PIN</span>
                          </button>
                          {isStatsEnabled && (
                            <div className="w-28 my-2 text-center bg-grey-dark rounded-xl px-2 py-4">
                              {shownStats.map((stat) => (
                                <div key={stat} className="h-6">
                                  <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                  >
                                    <BarChart
                                      layout="vertical"
                                      data={[costume.costume_stat[0]]}
                                    >
                                      <XAxis
                                        type="number"
                                        hide
                                        domain={[0, maxStats[stat]]}
                                      />
                                      <YAxis
                                        type="category"
                                        width={1}
                                        dataKey="name"
                                      />
                                      <Bar
                                        dataKey={stat}
                                        fill={statsColors[stat]}
                                      >
                                        <LabelList
                                          dataKey={stat}
                                          position="center"
                                          className={classNames(
                                            ["atk", "vit", "agi"].includes(stat)
                                              ? "fill-white text-shadow"
                                              : "fill-black",
                                            "text-xs"
                                          )}
                                        />
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {showNotesInline && (
                          <div
                            className="flex-1 ml-4 max-w-xl"
                            dangerouslySetInnerHTML={{
                              __html: tierItem.tooltip,
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {tierlist.type === "weapons" && (
                <>
                  {tier.tiers_items.map((tierItem, index) => {
                    const weapon = items.find(
                      (item) => item.weapon_id === tierItem.item_id
                    );

                    return (
                      <div
                        className={showNotesInline ? "flex w-full" : ""}
                        key={weapon.weapon_id}
                      >
                        <div
                          className={classNames(
                            "relative flex flex-col items-center gap-y-2 w-28 font-mono filter transition ease-out-cubic",
                            showOnlyInventory &&
                              !ownedWeapons.includes(tierItem.item_id)
                              ? "brightness-50"
                              : ""
                          )}
                        >
                          {tierItem.tooltip && (
                            <Tooltip
                              className="cursor-help"
                              title={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: tierItem.tooltip,
                                  }}
                                ></div>
                              }
                            >
                              <div className="absolute -top-2 right-2 z-20 flex items-center justify-center bg-white text-black rounded-full h-6 w-6 text-lg font-labor">
                                {tierItem.tooltip_is_important ? "!" : "?"}
                              </div>
                            </Tooltip>
                          )}
                          <WeaponThumbnail
                            key={`${weapon.weapon_id}-${index}`}
                            href={
                              weapon?.slug
                                ? `/weapons/${weapon?.slug}`
                                : undefined
                            }
                            element={weapon?.attribute}
                            rarity={getBaseRarity({
                              rarity: weapon?.rarity,
                              is_ex_weapon: weapon?.is_ex_weapon,
                              evolution_order: weapon?.evolution_order,
                            })}
                            type={weapon?.weapon_type}
                            isDark={weapon?.is_ex_weapon}
                            alt={weapon?.name}
                            image_path={weapon?.image_path}
                            className="transform transition-transform ease-out-cubic hover:-translate-y-1"
                          />
                          <p className="text-center text-sm mb-0 leading-none">
                            {weapon.is_ex_weapon && (
                              <span className="text-rarity-4">EX </span>
                            )}
                            <span className="text-xs text-center text-beige line-clamp-1 leading-none">
                              {weapon.name}
                            </span>
                          </p>
                          {isStatsEnabled && (
                            <div className="w-28 my-2 text-center bg-grey-dark rounded-xl px-2 py-4">
                              {shownStats.map((stat) => (
                                <div key={stat} className="h-6">
                                  <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                  >
                                    <BarChart
                                      layout="vertical"
                                      data={[weapon.weapon_stat[0]]}
                                    >
                                      <XAxis
                                        type="number"
                                        hide
                                        domain={[0, maxStats[stat]]}
                                      />
                                      <YAxis
                                        type="category"
                                        width={1}
                                        dataKey="name"
                                      />
                                      <Bar
                                        dataKey={stat}
                                        fill={statsColors[stat]}
                                      >
                                        <LabelList
                                          dataKey={stat}
                                          position="center"
                                          className={classNames(
                                            ["atk", "vit", "agi"].includes(stat)
                                              ? "fill-white text-shadow"
                                              : "fill-black",
                                            "text-xs"
                                          )}
                                        />
                                      </Bar>
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {showNotesInline && (
                          <div
                            className="flex-1 ml-4 max-w-xl"
                            dangerouslySetInnerHTML={{
                              __html: tierItem.tooltip,
                            }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {tier.description && (
              <div
                className="border-l-4 border-l-grey-detail pl-4 mt-4 md:col-start-2"
                dangerouslySetInnerHTML={{
                  __html: tier.description,
                }}
              ></div>
            )}

            <img
              className="pt-8 md:py-8 w-full col-span-full opacity-20"
              src="/border.svg"
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="p-4">
        <Lines
          className="mb-8"
          containerClass="justify-center"
          svgClass="w-96 xl:w-42"
        >
          <h2 className="text-2xl">Comments</h2>
        </Lines>

        <CusdisComments
          pageId={tierlist.tierlist_id}
          pageTitle={tierlist.title}
        />
      </div>
    </>
  );
}

function CusdisComments({ pageId, pageTitle }) {
  const threadEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadEl.current) {
      const iframe = window.CUSDIS?.renderTo(threadEl.current);

      if (iframe) {
        threadEl.current.append(iframe);
        console.log(iframe);
      }
    }
  }, [threadEl]);

  return (
    <div
      ref={threadEl}
      data-host="https://cusdis.com"
      data-app-id="0a1806c7-9423-4b59-b034-071c617018ce"
      data-page-id={pageId}
      data-page-url="{{ PAGE_URL }}"
      data-page-title={pageTitle}
    />
  );
}

export async function getServerSideProps(context: NextPageContext) {
  context.res.setHeader("Cache-Control", "public, maxage=86400");

  const { tierlist, items } = await getTierlist({
    slug: context.query.slug,
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        tierlist,
        items,
      })
    ),
  };
}

function findMaxStat(items, property: "agi" | "atk" | "hp" | "vit") {
  return items.reduce((acc, item) => {
    const itemStatProperty = item.costume_stat ?? item.weapon_stat;
    const stat = itemStatProperty[0][property];

    if (!stat) {
      return 0;
    }

    if (acc >= stat) {
      return acc;
    }

    return stat;
  }, 0);
}
