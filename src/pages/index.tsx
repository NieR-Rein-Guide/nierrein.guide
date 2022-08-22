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
import { Guide, Event } from "@models/types";
import { getCurrentEvents, getFutureEvents } from "@models/event";
import { formatDistanceToNow } from "date-fns";
import { useMedia } from "react-use";
import CostumeArtwork from "@components/CostumeArtwork";
import slug from "slugg";
import prisma from "@libs/prisma";
import WeaponThumbnail from "@components/WeaponThumbnail";
import { BtnSecondary } from "@components/btn";
import Tools from "@components/pages/tools";
import { character, costume, notification, weapon } from "generated/dump";

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
  recentWeapons: weapon[];
  notifications: notification[];
}

export default function Home({
  featuredGuides = [],
  currentEvents = [],
  futureEvents = [],
  endingEvents = [],
  recentCostumes = [],
  recentWeapons = [],
  notifications = [],
}: HomeProps): JSX.Element {
  const isMobile = useMedia("(max-width: 1279px)");

  return (
    <Layout>
      <Meta />

      <div className="flex flex-col gap-x-12 gap-y-16 md:gap-y-32">
        {!isMobile && <AnimatedBanner />}
        <EventsSlider currentEvents={currentEvents} />

        <section className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Tools />
          </div>
        </section>

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

        <div>
          <section>
            <h2 className="overlap">New costumes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentCostumes.map((costume) => (
                <div className="relative" key={costume.costume_id}>
                  <h3 className="text-2xl text-beige text-center">
                    {costume.character.name} - {costume.title}
                  </h3>
                  <CostumeArtwork costume={costume} />
                  <Link
                    href={`/characters/${slug(costume.character.name)}/${slug(
                      costume.title
                    )}`}
                    passHref
                  >
                    <a className="btn absolute z-50 -bottom-2 transform -translate-x-1/2 left-1/2">
                      See costume
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <div className="flex justify-center mt-8">
            <Link href="/characters" passHref>
              <BtnSecondary>See all costumes</BtnSecondary>
            </Link>
          </div>
        </div>

        <div>
          <section>
            <h2 className="overlap">New weapons</h2>
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentWeapons.map((weapon) => (
                <div
                  key={weapon.weapon_id}
                  className="flex items-center gap-x-4 w-80 bg-grey-dark bordered relative p-8 transition hover:bg-grey-lighter"
                >
                  <WeaponThumbnail
                    element={weapon.attribute}
                    rarity={weapon.rarity}
                    type={weapon.weapon_type}
                    isDark={weapon.is_ex_weapon}
                    alt={weapon.name}
                    image_path={weapon.image_path}
                  />
                  <span>{weapon.name}</span>
                  <Link href={`/weapons/${weapon.slug}`} passHref>
                    <a className="absolute inset-0 z-10">
                      <span className="sr-only">
                        See more about {weapon.name}
                      </span>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <div className="flex justify-center mt-8">
            <Link href="/weapons" passHref>
              <BtnSecondary>See all weapons</BtnSecondary>
            </Link>
          </div>
        </div>
        <DailyInfoWithNoSSR />
        <FeaturedGuides guides={featuredGuides} />
        <Socials />
        <JoinUs />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  console.log("Revalidating homepage data props.");

  try {
    const [
      featuredGuides,
      currentEvents,
      futureEvents,
      recentCostumes,
      notificationsData,
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
      prisma.notification.findMany({
        take: 10,
        orderBy: {
          release_time: "desc",
        },
      }),
    ]);

    const recentWeapons = await prisma.weapon.findMany({
      take: 9,
      orderBy: {
        release_time: "desc",
      },
      where: {
        evolution_order: 2,
      },
      distinct: "evolution_group_id",
    });

    const notifications = notificationsData.map((notification) => ({
      ...notification,
      body: notification.body.replaceAll(
        "/images/",
        "https://web.app.nierreincarnation.com/images/"
      ),
    }));

    const endingEvents = [...currentEvents]
      .sort(
        (a, b) =>
          new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
      )
      .slice(0, 3);

    if (notifications.length === 0 || recentCostumes.length === 0) {
      throw new Error("Database is empty.");
    }

    return {
      props: JSON.parse(
        JSON.stringify({
          featuredGuides,
          currentEvents,
          futureEvents,
          endingEvents,
          recentCostumes,
          notifications,
          recentWeapons,
        })
      ),
      revalidate: 43200, // 12 hours in seconds (2 updates per day)
    };
  } catch (error) {
    console.log("Homepage: ", error.message);
  }
}
