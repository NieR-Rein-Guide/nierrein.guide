import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Layout from "@components/Layout";
import Socials from "@components/Socials";
import JoinUs from "@components/JoinUs";
import FeaturedGuides from "@components/FeaturedGuides";
import EventsSlider from "@components/EventsSlider";
import AnimatedBanner from "@components/AnimatedBanner";
import ListingEvents from "@components/ListingEvents";
import Meta from "@components/Meta";
import { getFeaturedGuides } from "@models/guide";
import { Guide, Event, NierNotification } from "@models/types";
import { getCurrentEvents, getFutureEvents } from "@models/event";
import { formatDistanceToNow } from "date-fns";
import { useMedia } from "react-use";
import CostumeArtwork from "@components/CostumeArtwork";
import urlSlug from "url-slug";
import { getNotifications } from "@models/notifications";
import { character, costume, PrismaClient } from "@prisma/client";

const DailyInfoWithNoSSR = dynamic(() => import("../components/DailyQuests"), {
  ssr: false,
});
const NotificationsWithNoSSR = dynamic(
  () => import("../components/Notifications"),
  {
    ssr: false,
  }
);

type Costume = costume & {
  character: character;
};

interface HomeProps {
  featuredGuides: Guide[];
  currentEvents: Event[];
  futureEvents: Event[];
  endingEvents: Event[];
  recentCostumes: Costume[];
  notifications: NierNotification[];
}

export default function Home({
  featuredGuides = [],
  currentEvents = [],
  futureEvents = [],
  endingEvents = [],
  recentCostumes = [],
  notifications = [],
}: HomeProps): JSX.Element {
  const isMobile = useMedia("(max-width: 1279px)");

  return (
    <Layout>
      <Meta />

      <div className="flex flex-col gap-x-12 gap-y-16 md:gap-y-32">
        {!isMobile && <AnimatedBanner />}
        <EventsSlider currentEvents={currentEvents} />

        <NotificationsWithNoSSR notifications={notifications} />

        {futureEvents.length > 0 && (
          <section>
            <h2 className="overlap">Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ListingEvents title="Upcoming Events">
                {futureEvents.map((event) => (
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

              {endingEvents.length > 0 && (
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
              )}
            </div>
          </section>
        )}

        <section>
          <h2 className="overlap">New costumes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentCostumes.map((costume) => (
              <div className="relative" key={costume.costume_id}>
                <h3 className="text-2xl text-beige text-center">
                  {costume.character.name} - {costume.title}
                </h3>
                <CostumeArtwork costume={costume} />
                <Link href={`/characters/${costume.costume_id}`} passHref>
                  <a className="btn absolute z-50 -bottom-2 transform -translate-x-1/2 left-1/2">
                    See costume
                  </a>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/characters" passHref>
              <a className="btn mt-12">See all costumes</a>
            </Link>
          </div>
        </section>
        <DailyInfoWithNoSSR />
        <FeaturedGuides guides={featuredGuides} />
        <Socials />
        <JoinUs />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const [
    featuredGuides,
    currentEvents,
    futureEvents,
    recentCostumes,
    notifications,
  ] = await Promise.all([
    getFeaturedGuides(),
    getCurrentEvents({ currentDate: new Date().toISOString() }),
    getFutureEvents({ currentDate: new Date().toISOString() }),
    prisma.costume.findMany({
      orderBy: {
        release_time: "desc",
      },
      include: {
        character: true,
      },
      take: 4,
    }),
    getNotifications(),
  ]);

  const endingEvents = [...currentEvents]
    .sort(
      (a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
    )
    .slice(0, 3);

  return {
    props: JSON.parse(
      JSON.stringify({
        featuredGuides,
        currentEvents,
        futureEvents,
        endingEvents,
        recentCostumes,
        notifications,
      })
    ),
  };
}
