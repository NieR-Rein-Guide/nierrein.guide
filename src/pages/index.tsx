import dynamic from "next/dynamic";
import Image from "next/image";

import launchedImage from "../../public/launched.jpg";

import Layout from "@components/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";
import CurrentlyWorkingOn from "@components/CurrentlyWorkingOn";
import FeaturedGuides from "@components/FeaturedGuides";
import Meta from "@components/Meta";
import { getFeaturedGuides, Guide } from "@models/guide";

const GuerillaTimersWithNoSSR = dynamic(
  () => import("@components/GuerillaTimers"),
  { ssr: false }
);

const DailyInfoWithNoSSR = dynamic(() => import("../components/DailyInfo"), {
  ssr: false,
});

interface HomeProps {
  featuredGuides: Guide[];
}

export default function Home({ featuredGuides }: HomeProps): JSX.Element {
  return (
    <Layout>
      <Meta />

      <div>
        <Image
          src={launchedImage}
          placeholder="blur"
          alt="NieR Re[in]carnation Launched !"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-with-sidenav gap-x-6 gap-y-24 mt-24">
        <div className="mb-24">
          <h1>Guerilla Timers</h1>
          <h1>Daily Quests</h1>
          <h1>Calendar of Events</h1>
          <h1>Polls</h1>
          <h1>Links</h1>
        </div>
        <div className="flex flex-col gap-y-24">
          <FeaturedGuides guides={featuredGuides} />
          {/* <GuerillaTimersWithNoSSR />
          <DailyInfoWithNoSSR />
          <CurrentlyWorkingOn />
          <JoinUs />
          <Socials /> */}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const featuredGuides = await getFeaturedGuides();

  return {
    props: {
      featuredGuides,
    },
    revalidate: 60,
  };
}
