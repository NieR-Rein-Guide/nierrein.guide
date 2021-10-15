import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import { useState } from "react";
import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import TierList from "@components/tierlist/TierList";
import { getTiers, Tier, TiersTabs } from "@models/tiers";
import Meta from "@components/Meta";
import { DISCORD_URL } from "@config/constants";
import slugify from "slugify";
import { useRef } from "react";
import { useRouter } from "next/router";
import { getAllCostumes } from "@models/character";
import { Costume } from "@models/types";

interface TierlistsPageProps {
  defaultTab: number;
  tiers: TiersTabs[];
  costumes: Costume[];
}

export default function TierlistsPageProps({
  defaultTab = 0,
  tiers,
  costumes,
}: TierlistsPageProps): JSX.Element {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(defaultTab);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    history.replaceState(
      null,
      null,
      `/tierlists/${slugify(tiers[index].label, { lower: true })}`
    );
  };

  return (
    <Layout>
      {!router.isFallback && (
        <Meta
          title="Tier Lists"
          description="Tier lists for PvE, PvP and Weapons. Work In Progress."
          cover={
            tiers[tabIndex].coverImg ??
            "https://nierrein.guide/cover-tierlists.jpg"
          }
        />
      )}

      <section className="flex flex-col gap-y-24 mt-12">
        <h2 className="overlap">Tierlists</h2>
        {!router.isFallback && (
          <Tabs defaultIndex={tabIndex} onChange={handleTabsChange}>
            <TabList className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 m:mb-14">
              {tiers.map((tier) => (
                <TierListTab key={tier.index} index={tier.index}>
                  {tier.label}
                </TierListTab>
              ))}
            </TabList>

            <TabPanels>
              {tiers.map((tier) => (
                <TabPanel key={tier.index}>
                  <div>
                    <TierList tier={tier} costumes={costumes} />
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const costumes = await getAllCostumes({
    allStats: false,
  });
  const { pveTier, pvpTier, weaponsTier, subjugationTier } = await getTiers();
  const tiers = [pvpTier, subjugationTier, pveTier, weaponsTier].map(
    (tier, index) => ({
      ...tier,
      index,
    })
  );
  let defaultTab = 0;

  if (context?.params?.slug && context.params.slug.length > 0) {
    defaultTab = tiers.findIndex(
      (tier) => slugify(tier.label, { lower: true }) === context.params.slug[0]
    );
  }

  return {
    props: {
      defaultTab,
      tiers,
      costumes,
    },
    revalidate: 120,
  };
}

export async function getStaticPaths() {
  const { pveTier, pvpTier, subjugationTier } = await getTiers();
  const tiers = [pvpTier, pveTier, subjugationTier];

  const paths = tiers.map((tier) => ({
    params: { slug: [slugify(tier.label, { lower: true })] },
  }));

  return {
    paths,
    fallback: true,
  };
}
