import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import { useState } from "react";
import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import TierList from "@components/tierlist/TierList";
import { getTiers } from "@models/tiers";
import Meta from "@components/Meta";
import slugify from "slugify";
import { useRouter } from "next/router";
import { Costume } from "@models/types";
import prisma from "@libs/prisma";
import Link from "next/link";
import classNames from "classnames";

interface TierlistsPageProps {
  defaultTab: number;
  tiers;
  costumes: Costume[];
}

export default function TierlistsPageProps({
  defaultTab = 0,
  tiers,
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
          cover={
            tiers[tabIndex].coverImg ??
            "https://nierrein.guide/cover-tierlists.jpg"
          }
        />
      )}

      <section className="flex flex-col gap-y-24">
        <h2 className="overlap">Tierlists</h2>
        {!router.isFallback && (
          <Tabs defaultIndex={tabIndex} onChange={handleTabsChange}>
            <TabList className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {tiers.map((tier) => (
                <TierListTab key={tier.index} index={tier.index}>
                  {tier.label}
                </TierListTab>
              ))}

              <Link href="/tierlists/community">
                <a
                  className={classNames(
                    "p-4 transition-colors ease-out-cubic relative bordered text-center",
                    router.asPath === "/tierlists/community"
                      ? "active bg-beige active"
                      : "bg-grey-lighter"
                  )}
                >
                  <span
                    className={classNames(
                      "font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic",
                      router.asPath === "/tierlists/community"
                        ? "text-grey-lighter"
                        : "text-beige"
                    )}
                  >
                    Community
                  </span>
                </a>
              </Link>
            </TabList>

            <TabPanels>
              {tiers.map((tier) => (
                <TabPanel key={tier.index}>
                  <div>
                    <TierList tier={tier} />
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

export async function getStaticProps() {
  const { subjugationTier } = getTiers();

  const tiers = [subjugationTier].map((tier, index) => ({
    ...tier,
    index,
  }));

  return JSON.parse(
    JSON.stringify({
      props: {
        defaultTab: 0,
        tiers,
      },
    })
  );
}
