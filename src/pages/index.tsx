import dynamic from "next/dynamic";
import Layout from "@components/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";
import CurrentlyWorkingOn from "@components/CurrentlyWorkingOn";
import FeaturedGuides from "@components/FeaturedGuides";
import EventsSlider from "@components/EventsSlider";
import Meta from "@components/Meta";
import { getFeaturedGuides } from "@models/guide";
import { Guide, Event } from "@models/types";
import { getCurrentEvents } from "@models/event";

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
  return (
    <Layout>
      <Meta />

      <div className="flex flex-col gap-x-12 gap-y-32 mt-32">
        <EventsSlider currentEvents={currentEvents} />
        <DailyInfoWithNoSSR />
        <FeaturedGuides guides={featuredGuides} />
        <CurrentlyWorkingOn />
        <Socials />
        <JoinUs />
      </div>
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
