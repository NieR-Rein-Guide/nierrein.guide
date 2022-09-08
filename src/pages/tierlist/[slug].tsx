import Image from "next/image";
import { RANK_THUMBNAILS } from "@models/tiers";
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
        cover="https://nierrein.guide/cover-tierlists.jpg"
      />

      <section className="flex flex-col gap-y-24">
        <h2 className="overlap">{tierlist.title}</h2>
        <div className="flex flex-col gap-y-8 relative">
          {tierlist.tiers.map((tier) => (
            <div className="tierlist__row" key={tier.tier}>
              {(RANK_THUMBNAILS[tier.tier] && (
                <Image src={RANK_THUMBNAILS[tier.tier]} alt={tier.tier} />
              )) || <h2 className="text-2xl">{tier.tier}</h2>}

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {tier.tiers_items.map((tierItem) => {
                  const costume = items.find(
                    (item) => item.costume_id === tierItem.item_id
                  );

                  return (
                    <CostumeThumbnail
                      key={costume.costume_id}
                      href={`/characters/${costume.character.slug}/${costume.slug}`}
                      src={`${CDN_URL}${costume.image_path_base}battle.png`}
                      alt={`${costume.title} thumbnail`}
                      rarity={RARITY[costume.rarity]}
                      weaponType={costume.weapon_type}
                    />
                  );
                })}
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
      </section>
    </Layout>
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

  return {
    props: JSON.parse(
      JSON.stringify({
        tierlist,
        items,
      })
    ),
  };
}
