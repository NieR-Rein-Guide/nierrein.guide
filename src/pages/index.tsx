import dynamic from "next/dynamic";
import Image from "next/image";

import launchedImage from "../../public/launched.jpg";

import { Event } from "@models/types";

import Layout from "@components/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";
import CurrentlyWorkingOn from "@components/CurrentlyWorkingOn";
import FeaturedGuides from "@components/FeaturedGuides";
import CurrentEvents from "@components/CurrentEvents";
import Poll from "@components/Poll";
import Meta from "@components/Meta";
import { getFeaturedGuides, Guide } from "@models/guide";
import { getCurrentEvents } from "@models/event";

const GuerillaTimersWithNoSSR = dynamic(
  () => import("@components/GuerillaTimers"),
  { ssr: false }
);

const DailyInfoWithNoSSR = dynamic(() => import("../components/DailyQuests"), {
  ssr: false,
});

interface HomeProps {
  featuredGuides: Guide[];
  currentEvents: Event[];
}

export default function Home({
  featuredGuides = [],
  currentEvents = [],
}: HomeProps): JSX.Element {
  const recentEventWithPoll = currentEvents.find((event) => {
    if (event.poll) return true;
    return false;
  });

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

      <div className="grid grid-cols-1 xl:grid-cols-with-sidenav gap-x-12 gap-y-24 mt-24">
        <div className="flex flex-col gap-y-24">
          {/* ATM Only show the last event */}
          <CurrentEvents events={[currentEvents[0]]} />
          <Poll event={recentEventWithPoll} />
          <div className="hidden xl:block">
            <Socials />
          </div>
        </div>
        <div className="flex flex-col gap-y-24">
          <FeaturedGuides guides={featuredGuides} />
          <GuerillaTimersWithNoSSR />
          <DailyInfoWithNoSSR />
          <CurrentlyWorkingOn />
          <div className="xl:hidden">
            <Socials />
          </div>
        </div>
      </div>

      <JoinUs />
    </Layout>
  );
}

export async function getStaticProps() {
  const [featuredGuides, currentEvents] = await Promise.all([
    getFeaturedGuides(),
    getCurrentEvents({ currentDate: new Date().toISOString() }),
  ]);

  return {
    props: {
      featuredGuides,
      currentEvents,
    },
    revalidate: 60,
  };
}
