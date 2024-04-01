import prisma from "@libs/prisma";
import Layout from "@components/Layout";
import Meta from "@components/Meta";
import CommunityTierlists from "@components/CommunityTierlists";
import { FEATURED_TIERLISTS } from "@config/constants";
import { character } from "@prisma/client";

interface TierlistsPageProps {
  characters: character[];
  tierlists;
}

export default function TierlistsPageProps({
  tierlists,
  characters,
}: TierlistsPageProps): JSX.Element {

  return (
    <Layout>
      <Meta
        title="Community Tierlists"
        cover="https://nierrein.guide/tierlists/cover-pve.jpg"
      />

      <section>
        <h2 className="overlap">Community Tierlists</h2>

        <CommunityTierlists tierlists={tierlists} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const characters = await prisma.dump.character.findMany({});

  const props = {
    characters,
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
