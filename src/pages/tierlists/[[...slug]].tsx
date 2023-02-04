import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import { getTiers, Tierlist } from "@models/tiers";
import Meta from "@components/Meta";
import { useRouter } from "next/router";
import { TierlistContent } from "pages/tierlist/[slug]";
import { NextPageContext } from "next";
import CommunityTierlists from "@components/CommunityTierlists";
import prisma from "@libs/prisma";
import Link from "next/link";
import { FEATURED_TIERLISTS, SEA_FEATURED_TIERLISTS } from "@config/constants";
import { useSettingsStore } from "@store/settings";

interface TierlistsPageProps {
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
  seaPveTierlists,
  seaPvpTierlists,
  tierlists,
}: TierlistsPageProps): JSX.Element {
  const router = useRouter();
  const region = useSettingsStore((state) => state.region);
  const [tabIndex] = useState(defaultTab);
  const [pvpTabIndex] = useState(defaultPvpTab);

  const handleTabsChange = (index) => {
    router.push(`/tierlists/${TABS_MAPPING[index]}`, null, {
      shallow: true,
      scroll: false,
    });
  };

  const handlePvpTabsChange = (index) => {
    history.replaceState(
      null,
      null,
      `/tierlists/pvp/${pvp[index].tierlist.slug}`
    );
  };

  // Database is empty.
  if (pve?.[0].items?.length === 0) {
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

          <h2 className="text-center text-2xl">
            Database is being updated... Try again in 10 minutes.
          </h2>
        </section>
      </Layout>
    );
  }

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
          onChange={handleTabsChange}
        >
          <Tabs.List className="relative bordered bg-grey-dark p-4 grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-8">
            <TierListTab index={0}>
              {region === "SEA" ? "(SEA) " : ""} PvE
            </TierListTab>

            <TierListTab index={1}>
              {region === "SEA" ? "(SEA) " : ""} PvP
            </TierListTab>

            <TierListTab className="col-span-2 md:col-span-1" index={2}>
              Community
            </TierListTab>
          </Tabs.List>

          {region === "SEA" && (
            <>
              {/* PvE */}
              <Tabs.Content value="0" className="mt-8">
                <TierlistContent
                  tierlist={seaPveTierlists[0].tierlist}
                  items={seaPveTierlists[0].items}
                />
              </Tabs.Content>

              {/* PvP */}
              <Tabs.Content value="1" className="mt-8">
                <TierlistContent
                  tierlist={seaPvpTierlists[0].tierlist}
                  items={seaPvpTierlists[0].items}
                />
              </Tabs.Content>
            </>
          )}

          {region !== "SEA" && (
            <>
              {/* PvE */}
              <Tabs.Content value="0" className="mt-8">
                <TierlistContent
                  tierlist={pve[0].tierlist}
                  items={pve[0].items}
                />
              </Tabs.Content>

              {/* PvP */}
              <Tabs.Content value="1">
                <Tabs.Root
                  className="mt-4 md:mt-0"
                  defaultValue={pvpTabIndex?.toString()}
                  onChange={handlePvpTabsChange}
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
                      />
                    </Tabs.Content>
                  ))}
                </Tabs.Root>
              </Tabs.Content>
            </>
          )}

          <Tabs.Content value="2">
            <CommunityTierlists tierlists={tierlists} />
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { pve, pvp, seaPveTierlists, seaPvpTierlists } = await getTiers();

  const props = {
    defaultTab: 0,
    defaultPvpTab: 0,
    pve,
    pvp,
    tierlists: [],
    seaPveTierlists,
    seaPvpTierlists,
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

  /**
   * Filters
   */
  if (context.query.attribute) {
    if (context.query.attribute !== "all") {
      where["attribute"] = context.query.attribute;
    }
  }

  if (context.query.type !== "all") {
    where["type"] = context.query.type;
  }

  if (context.query.from) {
    where.updated_at.gte = context.query.from;
  }

  // Exclude pinned tierlists
  where.tierlist_id = {
    notIn: [
      ...FEATURED_TIERLISTS.pve,
      ...FEATURED_TIERLISTS.pvp,
      ...SEA_FEATURED_TIERLISTS.pve,
      ...SEA_FEATURED_TIERLISTS.pvp,
    ],
  };

  // Exclude unlisted tierlists
  where.is_unlisted = false;

  /**
   * Order by
   */

  if (context.query.sortBy) {
    orderBy = {
      [context.query.sortBy as string]: "desc",
    };
  } else {
    orderBy = {
      votes: "desc",
    };
  }

  const tierlists = await prisma.nrg.tierlists.findMany({
    orderBy,
    where,
  });

  props.tierlists = tierlists;

  /**
   * /tierlists/pve | /tierlists/pvp
   */
  if (context.query.slug) {
    const [type] = context.query.slug;

    const tabsMappings = Object.entries(TABS_MAPPING);
    const index = tabsMappings.findIndex(([, value]) => value === type);
    props.defaultTab = index;
  }

  /**
   * /tierlists/pvp/[slug]
   */
  if (context.query.slug?.length > 1) {
    const [, slug] = context.query.slug;

    const defaultPvpTab = pvp.findIndex(
      (tierlist) => tierlist.tierlist.slug === slug
    );

    props.defaultPvpTab = defaultPvpTab;
  }

  return JSON.parse(
    JSON.stringify({
      props,
    })
  );
}
