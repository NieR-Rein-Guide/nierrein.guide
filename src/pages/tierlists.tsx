import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import { useState } from "react";

import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import TierList from "@components/tierlist/TierList";
import { tiers } from "@models/tiers";
import Meta from "@components/Meta";
import { DISCORD_URL } from "@config/constants";

export default function Home(): JSX.Element {
  const [tabIndex, setTabIndex] = useState(tiers[0].index);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Layout>
      <Meta
        title="Tier Lists"
        description="Tier lists for PvE, PvP and Weapons. Work In Progress."
        cover="https://nierrein.guide/cover-tierlists.jpg"
      />

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

          <p className="mb-24 text-lg md:text-xl text-center max-w-4xl mx-auto px-4 border border-beige py-4">
            Tier lists are meant to give a general idea, they are <b>NOT</b> an
            absolute truth.
            <br />
            Follow what you want and do what feel right for you.
            <br />
            Tier lists are made by <code>Insta#9504</code>. They are still WIP.
            <br />
            If you have any suggestions or want to update the tier list{" "}
            <span className="wysiwyg">
              <a href={DISCORD_URL} rel="noopener noreferrer" target="_blank">
                join us on Discord
              </a>{" "}
              or contact Insta.
            </span>
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
