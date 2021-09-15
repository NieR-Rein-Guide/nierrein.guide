import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Layout from "@components/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";
import CurrentlyWorkingOn from "@components/CurrentlyWorkingOn";
import FeaturedGuides from "@components/FeaturedGuides";
import EventsSlider from "@components/EventsSlider";
import AnimatedBanner from "@components/AnimatedBanner";
import ListingEvents from "@components/ListingEvents";
import Meta from "@components/Meta";
import { getFeaturedGuides } from "@models/guide";
import { Guide, Event } from "@models/types";
import { getCurrentEvents, getFutureEvents } from "@models/event";
import { formatDistanceToNow } from "date-fns";

const DailyInfoWithNoSSR = dynamic(() => import("../components/DailyQuests"), {
  ssr: false,
});

interface HomeProps {
  featuredGuides: Guide[];
  currentEvents: Event[];
  futureEvents: Event[];
  endingEvents: Event[];
}

export default function Home({
  featuredGuides = [],
  currentEvents = [],
  futureEvents = [],
  endingEvents = [],
}: HomeProps): JSX.Element {
  return (
    <Layout>
      <Meta />

      <div className="flex flex-col gap-x-12 gap-y-16 md:gap-y-32">
        <AnimatedBanner />
        <EventsSlider currentEvents={currentEvents} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ListingEvents title="Upcoming Events">
            {futureEvents.slice(0, 3).map((event) => (
              <Link
                key={event.slug}
                href={`/event/${event.slug}`}
                passHref={true}
              >
                <a className="slider__other-event">
                  <div className="border-2 border-beige-text border-opacity-60 hover:border-beige transition-colors relative select-none h-32">
                    <div className="absolute bottom-0 w-full p-2 bg-grey-lighter bg-opacity-70 z-20 flex justify-center gap-x-3">
                      <span>
                        Starts{" "}
                        {formatDistanceToNow(new Date(event.start_date), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      height={128}
                      width={232}
                      src={
                        event.image.formats?.medium?.url ??
                        event.image.formats?.small.url ??
                        event.image.formats?.thumbnail?.url
                      }
                      alt={`Thumbnail ${event.title}`}
                      placeholder="blur"
                      blurDataURL={
                        event.image.formats?.medium?.hash ??
                        event.image.formats?.small.hash ??
                        event.image.formats?.thumbnail?.hash
                      }
                    />
                  </div>
                </a>
              </Link>
            ))}
          </ListingEvents>
          <ListingEvents title="Events Ending soon">
            {endingEvents.map((event) => (
              <Link
                key={event.slug}
                href={`/event/${event.slug}`}
                passHref={true}
              >
                <a className="slider__other-event">
                  <div className="border-2 border-beige-text border-opacity-60 hover:border-beige transition-colors relative select-none h-32">
                    <div className="absolute bottom-0 w-full p-2 bg-grey-lighter bg-opacity-70 z-20 flex justify-center gap-x-3">
                      <span>
                        Ends{" "}
                        {formatDistanceToNow(new Date(event.end_date), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      height={128}
                      width={232}
                      src={
                        event.image.formats?.medium?.url ??
                        event.image.formats?.small.url ??
                        event.image.formats?.thumbnail?.url
                      }
                      alt={`Thumbnail ${event.title}`}
                      placeholder="blur"
                      blurDataURL={
                        event.image.formats?.medium?.hash ??
                        event.image.formats?.small.hash ??
                        event.image.formats?.thumbnail?.hash
                      }
                    />
                  </div>
                </a>
              </Link>
            ))}
          </ListingEvents>
        </div>
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
  const [featuredGuides, currentEvents, futureEvents] = await Promise.all([
    getFeaturedGuides(),
    getCurrentEvents({ currentDate: new Date().toISOString() }),
    getFutureEvents({ currentDate: new Date().toISOString() }),
  ]);

  const endingEvents = [...currentEvents]
    .sort(
      (a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
    )
    .slice(0, 3);

  return {
    props: {
      featuredGuides,
      currentEvents,
      futureEvents,
      endingEvents,
    },
    revalidate: 60,
  };
}
