import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import TierList from "@components/tierlist/TierList";
import { getTiers, Tierlist } from "@models/tiers";
import Meta from "@components/Meta";
import { useRouter } from "next/router";
import { TierlistContent } from "pages/tierlist/[slug]";
import { NextPageContext } from "next";
import { Tooltip } from "@mui/material";
import CommunityTierlists, {
  defaultFromDate,
} from "@components/CommunityTierlists";
import prisma from "@libs/prisma";
import Link from "next/link";
import { FEATURED_TIERLISTS } from "@config/constants";

interface TierlistsPageProps {
  defaultTab: number;
  defaultPvpTab: number;
  pve: Tierlist[];
  pvp: Tierlist[];
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
}: TierlistsPageProps): JSX.Element {
  const router = useRouter();
  const [tabIndex] = useState(defaultTab);
  const [pvpTabIndex] = useState(defaultPvpTab);

  const handleTabsChange = (index) => {
    router.push(`/tierlists/${TABS_MAPPING[index]}`);
  };

  const handlePvpTabsChange = (index) => {
    history.replaceState(
      null,
      null,
      `/tierlists/pvp/${pvp[index].tierlist.slug}`
    );
  };

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

        <div className="text-right">
          <Link href="/tools/tierlist-builder" passHref>
            <a className="btn mb-4 md:mb-0 top-3 right-4 md:absolute">
              Create a tierlist
            </a>
          </Link>
        </div>

        <Tabs defaultIndex={tabIndex} onChange={handleTabsChange}>
          <TabList className="relative bordered bg-grey-dark p-4  grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-8">
            <TierListTab index={0}>PvE</TierListTab>

            <TierListTab index={1}>PvP</TierListTab>

            <TierListTab index={2}>Community</TierListTab>
            {/* <Link href="/tierlists/community">
              <a
                className={classNames(
                  "p-4 transition-colors ease-out-cubic relative bordered flex justify-center items-center gap-x-2",
                  router.asPath === "/tierlists/community"
                    ? "active bg-beige active"
                    : "bg-grey-dark",
                  router.asPath === "/tierlists/community"
                    ? "text-grey-lighter"
                    : "text-beige"
                )}
              >
                <span className="font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic">
                  Community
                </span>
                <FiExternalLink size="18" />
              </a>
            </Link> */}
          </TabList>

          <TabPanels>
            {/* PvE */}
            <TabPanel className="mt-8">
              <TierlistContent
                tierlist={pve[0].tierlist}
                items={pve[0].items}
              />
            </TabPanel>

            {/* PvP */}
            <TabPanel>
              <Tabs defaultIndex={pvpTabIndex} onChange={handlePvpTabsChange}>
                <TabList className="grid grid-cols-1 md:grid-cols-3 gap-y-4 mb-8">
                  {pvp.map((tierlist, index) => (
                    <TierListTab
                      index={index}
                      key={tierlist.tierlist.tierlist_id}
                    >
                      {tierlist.tierlist.title}
                    </TierListTab>
                  ))}
                </TabList>

                <TabPanels>
                  {pvp.map((tierlist, index) => (
                    <TabPanel index={index} key={tierlist.tierlist.tierlist_id}>
                      <TierlistContent
                        tierlist={tierlist.tierlist}
                        items={tierlist.items}
                      />
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </TabPanel>

            <TabPanel>
              <CommunityTierlists tierlists={tierlists} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { pve, pvp } = await getTiers();

  const props = {
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
      gte: defaultFromDate.toISOString(),
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
    notIn: [...FEATURED_TIERLISTS.pve, ...FEATURED_TIERLISTS.pvp],
  };

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
