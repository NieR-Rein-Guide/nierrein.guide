import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import prisma from "@libs/prisma";
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
import { Chip, Tooltip } from "@mui/material";
import { FiThumbsUp } from "react-icons/fi";
import { useCreatedTierlists } from "@store/created-tierlists";

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

      <section className="flex flex-col gap-y-24">
        <TierlistContent tierlist={tierlist} items={items} />
      </section>
    </Layout>
  );
}

export function TierlistContent({ tierlist, items }) {
  const router = useRouter();
  const localVotes = useTierlistsVotes((state) => state.votes);
  const addVote = useTierlistsVotes((state) => state.addVote);
  const createdTierlist = useCreatedTierlists((state) => state.tierlists);

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

  return (
    <>
      <h2 className="overlap">{tierlist.title}</h2>

      <div className="flex flex-col md:flex-row justify-between">
        <Tooltip
          title={hasVoted ? "You already voted for this tierlist" : "Vote"}
        >
          <Chip
            className="pl-2"
            onClick={hasVoted ? undefined : vote}
            color={hasVoted ? "success" : "default"}
            variant={hasVoted ? "outlined" : "filled"}
            label={tierlist.votes}
            icon={<FiThumbsUp />}
          />
        </Tooltip>

        {isOwner && (
          <button className="absolute top-4 right-4 btn">Edit</button>
        )}

        <p className="text-beige text-sm">
          Last updated:{" "}
          {formatDistanceToNow(new Date(tierlist.updated_at), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className="flex flex-col gap-y-8 relative">
        {tierlist.tiers.map((tier) => (
          <div className="tierlist__row" key={tier.tier}>
            {(RANK_THUMBNAILS[tier.tier] && (
              <Image src={RANK_THUMBNAILS[tier.tier]} alt={tier.tier} />
            )) || <h2 className="text-2xl">{tier.tier}</h2>}

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {tierlist.type === "costumes" && (
                <>
                  {tier.tiers_items.map((tierItem) => {
                    const costume = items.find(
                      (item) => item.costume_id === tierItem.item_id
                    );

                    return (
                      <div
                        className="flex flex-col items-center gap-y-2 w-28 transform transition-transform ease-out-cubic hover:-translate-y-1 font-mono "
                        key={costume.costume_id}
                      >
                        <CostumeThumbnail
                          href={`/characters/${costume.character.slug}/${costume.slug}`}
                          src={`${CDN_URL}${costume.image_path_base}battle.png`}
                          alt={`${costume.title} thumbnail`}
                          rarity={RARITY[costume.rarity]}
                          weaponType={costume.weapon_type}
                        />
                        <p className="text-sm mb-0 leading-none">
                          {costume.is_ex_costume && (
                            <span className="text-rarity-4">EX </span>
                          )}
                          {costume.character.name}
                        </p>
                        <span className="text-xs text-center text-beige line-clamp-1 leading-none">
                          {costume.title}
                        </span>
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
                        className="flex flex-col items-center gap-y-2 w-28 transform transition-transform ease-out-cubic hover:-translate-y-1 font-mono "
                        key={weapon.weapon_id}
                      >
                        <WeaponThumbnail
                          key={`${weapon.weapon_id}-${index}`}
                          href={
                            weapon?.slug
                              ? `/weapons/${weapon?.slug}`
                              : undefined
                          }
                          element={weapon?.attribute}
                          rarity={weapon?.rarity}
                          type={weapon?.weapon_type}
                          isDark={weapon?.is_ex_weapon}
                          alt={weapon?.name}
                          image_path={weapon?.image_path}
                        />
                        <p className="text-sm mb-0 leading-none">
                          {weapon.is_ex_weapon && (
                            <span className="text-rarity-4">EX </span>
                          )}
                          <span className="text-xs text-center text-beige line-clamp-1 leading-none">
                            {weapon.name}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <img
              className="py-8 w-full col-span-full opacity-20"
              src="/border.svg"
              alt=""
            />
          </div>
        ))}
      </div>

      {tierlist.description && (
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: tierlist.description }}
        ></div>
      )}
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  context.res.setHeader("Cache-Control", "public, maxage=86400");

  const tierlist = await prisma.nrg.tierlists.findFirst({
    where: {
      slug: context.query.slug as string,
    },
    include: {
      tiers: {
        include: {
          tiers_items: true,
        },
      },
    },
  });

  let items = [];
  const ids = [];
  for (const tier of tierlist.tiers) {
    ids.push(...tier.tiers_items.map((tier) => tier.item_id));
  }

  if (tierlist.type === "costumes") {
    items = await prisma.dump.costume.findMany({
      include: {
        character: true,
      },
      where: {
        costume_id: {
          in: ids,
        },
      },
    });
  }

  if (tierlist.type === "weapons") {
    items = await prisma.dump.weapon.findMany({
      where: {
        weapon_id: {
          in: ids,
        },
      },
    });
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        tierlist,
        items,
      })
    ),
  };
}
