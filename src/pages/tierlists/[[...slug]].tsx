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

interface TierlistsPageProps {
  defaultTab: number;
  tiers: TiersTabs[];
}

export default function TierlistsPageProps({
  defaultTab = 0,
  tiers,
}: TierlistsPageProps): JSX.Element {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(defaultTab);
  const content = useRef<HTMLDivElement>(null);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    history.replaceState(
      null,
      null,
      `/tierlists/${slugify(tiers[index].label, { lower: true })}`
    );

    content.current.scrollIntoView({
      behavior: "smooth",
    });
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

      <div className="flex flex-col gap-y-24 mt-12">
        {!router.isFallback && (
          <Tabs defaultIndex={tabIndex} onChange={handleTabsChange}>
            <TabList className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {tiers.map((tier) => (
                <TierListTab
                  key={tier.index}
                  index={tier.index}
                  image={tier.backgroundImg}
                >
                  {tier.label}
                </TierListTab>
              ))}
            </TabList>

            <p className="mb-24 text-lg md:text-xl text-center max-w-4xl mx-auto px-4 border border-beige py-4">
              Tier lists are meant to give a general idea, they are <b>NOT</b>{" "}
              an absolute truth.
              <br />
              Follow what you want and do what feel right for you.
              <br />
              Tier lists are made by <code>Insta#9504</code> and{" "}
              <code>yuuru#0107</code>.
              <br />
              If you have any suggestions or want to update the tier list{" "}
              <span className="wysiwyg">
                <a href={DISCORD_URL} rel="noopener noreferrer" target="_blank">
                  join us on Discord
                </a>
              </span>
            </p>

            <TabPanels ref={content}>
              {tiers.map((tier) => (
                <TabPanel key={tier.index}>
                  <section className="mt-8">
                    <h2 className="overlap">{tier.label} Tier List</h2>

                    <TierList tier={tier} />
                  </section>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { pveTier, pvpTier, weaponsTier } = await getTiers();
  const tiers = [pveTier, pvpTier, weaponsTier];
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
    },
  };
}

export async function getStaticPaths() {
  const { pveTier, pvpTier, weaponsTier } = await getTiers();
  const tiers = [pveTier, pvpTier, weaponsTier];

  const paths = tiers.map((tier) => ({
    params: { slug: [slugify(tier.label, { lower: true })] },
  }));

  return {
    paths,
    fallback: true,
  };
}
