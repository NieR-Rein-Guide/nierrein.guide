import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import { getTiers, Tierlist } from "@models/tiers";
import Meta from "@components/Meta";
import { useRouter } from "next/router";
import { TierlistContent } from "pages/tierlist/[slug]";
import CommunityTierlists from "@components/CommunityTierlists";
import prisma from "@libs/prisma";
import Link from "next/link";
import { FEATURED_TIERLISTS } from "@config/constants";
import { character } from "@prisma/client";

interface TierlistsPageProps {
  characters: character[];
  defaultTab: number;
  defaultPvpTab: number;
  pve: Tierlist[];
  pvp: Tierlist[];
  seaPveTierlists: Tierlist[];
  seaPvpTierlists: Tierlist[];
  tier;
  tierlists;
}

const TABS_MAPPING = {
  0: "pve",
  1: "pvp",
  2: "community",
};

export default function TierlistsPageProps({
  defaultTab = 0,
  defaultPvpTab = 0,
  pve,
  pvp,
  tierlists,
  characters,
}: TierlistsPageProps): JSX.Element {
  const [tabIndex] = useState(defaultTab);
  const [pvpTabIndex] = useState(defaultPvpTab);

  return (
    <Layout>
      <Meta
        title="Tier Lists"
        cover={
          defaultTab === 0
            ? "https://nierrein.guide/tierlists/cover-pve.jpg"
            : "https://nierrein.guide/tierlists/cover-pvp.jpg"
        }
      />

      <section>
        <h2 className="overlap">Tierlists</h2>

        <div className="text-right hidden lg:block">
          <Link
            href="/tools/tierlist-builder"
            passHref
            className="btn mb-4 md:mb-0 top-3 right-4 md:absolute"
          >
            Create a tierlist
          </Link>
        </div>

        <Tabs.Root
          defaultValue={tabIndex?.toString()}
        >
          <Tabs.List className="relative bordered bg-grey-dark p-4 grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8">
            <TierListTab index={0}>PvE</TierListTab>

            <TierListTab index={1}>PvP</TierListTab>

            <TierListTab className="col-span-2 md:col-span-1" index={2}>
              Community
            </TierListTab>
          </Tabs.List>

          {/* PvE */}
          <Tabs.Content value="0" className="mt-8">
            <TierlistContent
              tierlist={pve[0].tierlist}
              items={pve[0].items}
              characters={characters}
            />
          </Tabs.Content>

          {/* PvP */}
          <Tabs.Content value="1">
            <Tabs.Root
              className="mt-4 md:mt-0"
              defaultValue={pvpTabIndex?.toString()}
            >
              <Tabs.List className="grid grid-cols-1 md:grid-cols-3 gap-y-1 mb-8">
                {pvp.map((tierlist, index) => (
                  <TierListTab
                    index={index}
                    key={tierlist.tierlist.tierlist_id}
                  >
                    {tierlist.tierlist.title}
                  </TierListTab>
                ))}
              </Tabs.List>

              {pvp.map((tierlist, index) => (
                <Tabs.Content
                  value={index?.toString()}
                  key={tierlist.tierlist.tierlist_id}
                >
                  <TierlistContent
                    tierlist={tierlist.tierlist}
                    items={tierlist.items}
                    characters={characters}
                  />
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </Tabs.Content>

          <Tabs.Content value="2">
            <CommunityTierlists tierlists={tierlists} />
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { pve, pvp } = await getTiers();
  const characters = await prisma.dump.character.findMany({});

  const props = {
    characters,
    defaultTab: 0,
    defaultPvpTab: 0,
    pve,
    pvp,
    tierlists: [],
  };

  /**
   * Community tierlists filters
   */
  const where = {
    updated_at: {
      gte: undefined,
    },
  };
  let orderBy = {};

  // Exclude pinned tierlists
  where.tierlist_id = {
    notIn: [...FEATURED_TIERLISTS.pve, ...FEATURED_TIERLISTS.pvp],
  };

  // Exclude unlisted tierlists
  where.is_unlisted = false;

  /**
   * Order by
   */

  orderBy = {
    votes: "desc",
  };

  const tierlists = await prisma.nrg.tierlists.findMany({
    orderBy,
    where,
  });

  props.tierlists = tierlists;

  return JSON.parse(
    JSON.stringify({
      props,
    })
  );
}
