import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from "@components/Layout";
import TierListTab from "@components/tierlist/TierListTab";
import { getTiers, Tierlist } from "@models/tiers";
import Meta from "@components/Meta";
import { TierlistContent } from "pages/tierlist/[slug]";
import CommunityTierlists from "@components/CommunityTierlists";
import prisma from "@libs/prisma";
import Link from "next/link";
import { FEATURED_TIERLISTS } from "@config/constants";
import { character } from "@prisma/client";
import classNames from "classnames";

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

            <a
              href="/community-tierlists"
              className={classNames(
                "p-4 transition-colors ease-out-cubic relative bordered text-center",
              )}
            >
              <span
                className={classNames(
                  "font-display font-bold text-xl tracking-wider transition-colors ease-out-cubic line-clamp-1"
                )}
              >
                Community
              </span>
            </a>
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

  return JSON.parse(
    JSON.stringify({
      props,
    })
  );
}
