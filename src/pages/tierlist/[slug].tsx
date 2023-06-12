import Image from "next/legacy/image";
import { formatDistanceToNow, differenceInDays } from "date-fns";
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
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
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
import { useSettingsStore } from "@store/settings";
import { hideSEASpoiler } from "@utils/hideSEASpoiler";
import Element from "@components/Element";
import ATTRIBUTES from "@utils/attributes";
import prisma from "@libs/prisma";
import { Checkbox as MuiCheckbox } from "@mui/material";

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
  characters: character[];
}

export default function TierList({
  tierlist,
  items,
  characters,
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
        <Link href="/tierlists/community" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Go back to tierlists</span>
        </Link>
      </nav>

      <section className="pt-8">
        <TierlistContent
          tierlist={tierlist}
          items={items}
          characters={characters}
        />
      </section>
    </Layout>
  );
}

export function TierlistContent({
  tierlist,
  items,
  characters,
}: TierListProps) {
  const router = useRouter();
  const region = useSettingsStore((state) => state.region);
  const localVotes = useTierlistsVotes((state) => state.votes);
  const addVote = useTierlistsVotes((state) => state.addVote);
  const createdTierlist = useCreatedTierlists((state) => state.tierlists);
  const ownedCostumes = useInventoryStore((state) => state.costumes);
  const ownedWeapons = useInventoryStore((state) => state.weapons);
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  const addCostumePanel = usePanelStore((state) => state.addCostume);

  const [hasReadMore, setHasReadMore] = useState(false);
  const [showNotesInline, setShowNotesInline] = useState(false);
  const [showOnlyInventory, setShowOnlyInventory] = useState(false);
  const [shownStats] = useState(
    tierlist.type === "weapons"
      ? DEFAULT_WEAPON_STAT_PROPERTIES
      : DEFAULT_COSTUME_STAT_PROPERTIES
  );
  const [isStatsEnabled, setIsStatsEnabled] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [attribute, setAttribute] = useState("all");
  const [hidingMode, setHidingMode] = useState<"dim" | "hide">("dim");
  const [characterId, setCharacterId] = useState<number | string>("all");

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

  /**
   * Highlight
   */
  useEffect(() => {
    if (!router.query.highlight) {
      return;
    }

    document
      .querySelector(`[id*="${router.query.highlight}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
  }, [router.query]);

  return (
    <>
      <div className="grid lg:grid-cols-12 bg-grey-dark p-8 rounded-t-xl">
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

          <FormControl className="w-36 mt-8 md:mt-0">
            <InputLabel id="attribute-select-label">Hiding mode</InputLabel>
            <Select
              labelId="attribute-select-label"
              value={hidingMode}
              label="Hiding mode"
              onChange={(e) => setHidingMode(e.target.value)}
            >
              <MenuItem value="dim">Dim</MenuItem>
              <MenuItem value="hide">Hide</MenuItem>
            </Select>
          </FormControl>

          <div className="block lg:hidden">
            <Checkbox
              label={`${hidingMode === "dim" ? "Highlight" : "Show"} owned`}
              isChecked={showOnlyInventory}
              setState={(e) => setShowOnlyInventory(e.target.checked)}
            />
          </div>
          <div className="block lg:hidden">
            <Checkbox
              label="Show notes inline"
              isChecked={showNotesInline}
              setState={(e) => setShowNotesInline(e.target.checked)}
            />
          </div>

          <div className="block lg:hidden">
            <Checkbox
              label="Show stats"
              isChecked={isStatsEnabled}
              setState={() => setIsStatsEnabled(!isStatsEnabled)}
            />
          </div>
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

      <div className="z-50 fixed bottom-0 left-0 rounded-t-xl w-full lg:sticky lg:top-0 bg-grey-dark p-4 lg:rounded-b-xl lg:rounded-t-none flex gap-x-2 justify-between items-center">
        <div className="flex gap-4 items-center overflow-hidden">
          <FormControl className="w-36 mt-2 lg:mt-4 md:mt-0">
            <InputLabel id="attribute-select-label">Character</InputLabel>
            <Select
              labelId="attribute-select-label"
              value={characterId}
              label="Character"
              onChange={(e) => setCharacterId(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {characters.map((character) => (
                <MenuItem
                  key={character.character_id}
                  value={character.character_id}
                >
                  <img
                    style={{
                      minWidth: "24px",
                      maxWidth: "24px",
                      minHeight: "24px",
                      maxHeight: "24px",
                    }}
                    className="select-none object-contain"
                    alt={character.name}
                    title={character.name}
                    src={`${CDN_URL}${character.image_path}`}
                  />
                  <span className="inline-block ml-1">{character.name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="w-36 mt-2 lg:mt-4 md:mt-0">
            <InputLabel id="attribute-select-label">Attribute</InputLabel>
            <Select
              labelId="attribute-select-label"
              value={attribute}
              label="Attribute"
              onChange={(e) => setAttribute(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {ATTRIBUTES.map((attribute) => (
                <MenuItem key={attribute} value={attribute}>
                  <Element size={24} type={attribute} />
                  <span className="inline-block ml-1">{attribute}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="lg:hidden">
            <FormControlLabel
              value={showOnlyInventory}
              checked={showOnlyInventory}
              onChange={(e) => setShowOnlyInventory(e.target.checked)}
              control={<MuiCheckbox />}
              label="Inventory"
              labelPlacement="bottom"
            />
          </div>

          <div className="hidden lg:block">
            <Checkbox
              label={`${hidingMode === "dim" ? "Highlight" : "Show"} owned`}
              isChecked={showOnlyInventory}
              setState={(e) => setShowOnlyInventory(e.target.checked)}
            />
          </div>
          <div className="hidden lg:block">
            <Checkbox
              label="Show notes inline"
              isChecked={showNotesInline}
              setState={(e) => setShowNotesInline(e.target.checked)}
            />
          </div>

          <div className="hidden lg:block">
            <Checkbox
              label="Show stats"
              isChecked={isStatsEnabled}
              setState={() => setIsStatsEnabled(!isStatsEnabled)}
            />
          </div>
        </div>

        <Button
          onClick={hasVoted ? undefined : vote}
          variant={hasVoted ? "text" : "outlined"}
          color={hasVoted ? "success" : "primary"}
          startIcon={<FiThumbsUp className="pl-1" />}
          className={classNames(
            hasVoted ? "pointer-events-none" : "",
            "hidden lg:flex"
          )}
        >
          {hasVoted ? "Liked" : "Like"} ({tierlist.votes})
        </Button>
      </div>

      <div className="flex flex-col gap-y-8 relative mt-12">
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

                    let isSpoiler =
                      !showUnreleasedContent &&
                      new Date() < new Date(costume.release_time);

                    if (region === "SEA" && !showUnreleasedContent) {
                      isSpoiler = !hideSEASpoiler(costume.release_time);
                    }

                    let isDimmed = false;

                    if (
                      showOnlyInventory &&
                      !ownedCostumes.includes(tierItem.item_id)
                    ) {
                      isDimmed = true;
                    }

                    if (
                      characterId !== "all" &&
                      costume.character_id !== characterId
                    ) {
                      isDimmed = true;
                    }

                    if (
                      attribute !== "all" &&
                      costume.attribute !== attribute
                    ) {
                      isDimmed = true;
                    }

                    return (
                      <div
                        className={classNames(
                          showNotesInline ? "col-span-3 flex w-full" : "",
                          isSpoiler ? "hidden" : "",
                          isDimmed && hidingMode === "hide" ? "hidden" : ""
                        )}
                        key={costume.costume_id}
                      >
                        <div
                          id={`${tierItem.id}-${costume.costume_id}`}
                          className={classNames(
                            "group relative flex flex-col items-center gap-y-2 w-28 font-mono filter transition ease-out-cubic",
                            isDimmed && hidingMode === "dim"
                              ? "brightness-50"
                              : ""
                          )}
                        >
                          {differenceInDays(
                            new Date(),
                            new Date(costume.release_time)
                          ) <= 31 && (
                            <Tooltip
                              enterTouchDelay={0}
                              className="cursor-help"
                              title={
                                <p>
                                  This costume has been released{" "}
                                  {formatDistanceToNow(
                                    new Date(costume.release_time),
                                    { addSuffix: true }
                                  )}
                                </p>
                              }
                            >
                              <span className="absolute -top-4 text-xs mt-2 z-10 bg-green-300 text-black py-1 px-2 rounded-full font-semibold">
                                NEW
                              </span>
                            </Tooltip>
                          )}

                          {tierItem.tooltip && !showNotesInline && (
                            <Tooltip
                              enterTouchDelay={0}
                              className="cursor-help"
                              title={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: tierItem.tooltip,
                                  }}
                                ></div>
                              }
                            >
                              <div
                                className={classNames(
                                  "absolute bottom-12 right-2 z-20 flex items-center justify-center rounded-full h-6 w-6 text-lg font-labor",
                                  tierItem.tooltip_is_important
                                    ? "bg-red-500 text-white font-black"
                                    : "",
                                  !tierItem.tooltip_is_important
                                    ? "bg-white text-black"
                                    : ""
                                )}
                              >
                                {tierItem.tooltip_is_important ? "!" : "?"}
                              </div>
                            </Tooltip>
                          )}
                          {tierItem.awakening_step > 0 && (
                            <Tooltip
                              enterTouchDelay={0}
                              className="cursor-help"
                              title={
                                <p>
                                  Preferred Awakening Level for this costume is
                                  Lv. {tierItem.awakening_step}
                                </p>
                              }
                            >
                              <span className="absolute -top-4 right-1 text-xs mt-2 transform scale-90 z-20">
                                <img
                                  src={
                                    tierItem.awakening_step === 5
                                      ? "/icons/costumes/awaken_rank_icon_rainbow.png"
                                      : "/icons/costumes/awaken_rank_icon_default.png"
                                  }
                                />
                                <span className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 font-semibold text-lg">
                                  {tierItem.awakening_step}
                                </span>
                              </span>
                            </Tooltip>
                          )}
                          {tierItem.attribute && (
                            <Tooltip
                              enterTouchDelay={0}
                              className="cursor-help"
                              title={
                                <p>
                                  Preferred Attribute for this costume is{" "}
                                  {tierItem.attribute}
                                </p>
                              }
                            >
                              <span className="absolute top-4 right-1 text-xs mt-2 z-10">
                                <Element type={tierItem.attribute} size={30} />
                              </span>
                            </Tooltip>
                          )}

                          <CostumeThumbnail
                            href={`/characters/${costume.character.slug}/${costume.slug}`}
                            src={`${CDN_URL}${costume.image_path_base}battle.png`}
                            alt={`${costume.title} thumbnail`}
                            rarity={RARITY[costume.rarity]}
                            weaponType={costume.weapon_type}
                            className={classNames(
                              "transform transition-transform ease-out-cubic hover:-translate-y-1",
                              router.query.highlight ===
                                costume.costume_id.toString()
                                ? "border-2 border-green-300"
                                : ""
                            )}
                            attribute={costume.attribute}
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
                            className="wysiwyg flex-1 ml-4 max-w-xl"
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
                              enterTouchDelay={0}
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
  const { tierlist, items } = await getTierlist({
    slug: context.query.slug,
  });

  const characters = await prisma.dump.character.findMany({});

  return {
    props: JSON.parse(
      JSON.stringify({
        tierlist,
        items,
        characters,
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
