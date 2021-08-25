import Head from "next/head";
import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import { useState } from "react";

import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import TierList from "@components/tierlist/TierList";
import { tiers } from "@models/tiers";

export default function Home(): JSX.Element {
  const [tabIndex, setTabIndex] = useState(tiers[0].index);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Layout>
      <Head>
        <title>Tier lists - NieR Re[in] Global Guide & Database</title>
      </Head>

      <div className="flex flex-col gap-y-24 mt-12">
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

          <p className="mb-24 md:mb-16 text-lg md:text-xl text-center max-w-4xl mx-auto px-4 border border-beige py-4">
            Tier lists are meant to give a general idea, they are <b>NOT</b> an
            absolute truth.
            <br />
            Follow what you want and do what feel right for you.
            <br />
            Tier lists are made by <code>Insta#9504</code>. They are still WIP.
          </p>

          <TabPanels>
            {tiers.map((tier) => (
              <TabPanel key={tier.index}>
                <section className="mt-8">
                  <h2>{tier.label} Tier List</h2>

                  <TierList tier={tier} />
                </section>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
}
