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
import { getCurrentEvents, getFutureEvents, getAllEvents } from "@models/event";
import { formatDistanceToNow } from "date-fns";
import { useMedia } from "react-use";
import CostumeArtwork from "@components/CostumeArtwork";
import slug from "slugg";
import prisma from "@libs/prisma";
import WeaponThumbnail from "@components/WeaponThumbnail";
import { BtnSecondary } from "@components/btn";
import Tools from "@components/pages/tools";
import { character, costume, notification, weapon } from "@prisma/client";
import { loadouts } from "@prisma/client-nrg";
import LoadoutListingItem from "@components/LoadoutListingItem";
import { useSettingsStore } from "../store/settings";
import classNames from "classnames";
const EventsTimeline = dynamic(() => import("../components/EventsTimeline"), {
  ssr: false,
});
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
  loadouts: loadouts[];
}

export default function Home({
  featuredGuides = [],
  currentEvents = [],
  futureEvents = [],
  endingEvents = [],
  recentCostumes = [],
  recentWeapons = [],
  notifications = [],
  loadouts = [],
}: HomeProps): JSX.Element {
  const isMobile = useMedia("(max-width: 1279px)");
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  return (
    <Layout>
      <Meta />

      <div className="flex flex-col gap-x-12 gap-y-16 md:gap-y-32">
        {!isMobile && <AnimatedBanner />}
        <EventsTimeline items={currentEvents} />

        <section className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Tools />
          </div>
        </section>

        <NotificationsWithNoSSR notifications={notifications} />

        {/* NEW COSTUMES */}
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

                  {!showUnreleasedContent &&
                    new Date() < new Date(costume.release_time) && (
                      <div className="absolute inset-0 z-50 bg-grey-lighter bordered flex items-center justify-center">
                        <span className="text-beige text-3xl">
                          Hidden costume
                        </span>
                      </div>
                    )}
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

        {/* NEW WEAPONS */}
        <div>
          <section>
            <h2 className="overlap">New weapons</h2>
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentWeapons
                .filter((weapon) => {
                  if (showUnreleasedContent) return true;
                  return new Date() > new Date(weapon.release_time);
                })
                .map((weapon, index) => (
                  <div
                    key={weapon.weapon_id}
                    className={classNames(
                      "flex items-center gap-x-4 w-80 bg-grey-dark bordered relative p-8 transition hover:bg-grey-lighter",
                      index > 2 ? "hidden md:flex" : ""
                    )}
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

        {/* NEW LOADOUTS */}
        <div>
          <section>
            <h2 className="overlap">New community loadouts</h2>
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadouts.length === 0 && (
                <div className="bg-grey-dark text-beige transition-colors w-full border-b border-beige-inactive border-opacity-50 p-8 text-center rounded-lg md:col-span-2 lg:col-span-3">
                  <img
                    className="inline-block"
                    src="/decorations/fio-confused.png"
                    alt="Fio confused"
                  />
                  <p className="mt-4">Sorry, no loadouts found.</p>
                  <div className="flex justify-center mt-4">
                    <Link href="/tools/loadout-builder" passHref>
                      <a className="btn">Create one!</a>
                    </Link>
                  </div>
                </div>
              )}

              {loadouts.map((loadout) => (
                <LoadoutListingItem key={loadout.loadout_id} {...loadout} />
              ))}
            </div>
          </section>
          <div className="flex justify-center mt-8">
            <Link href="/loadouts" passHref>
              <BtnSecondary>See all loadouts</BtnSecondary>
            </Link>
          </div>
        </div>

        <FeaturedGuides guides={featuredGuides} />
        <DailyInfoWithNoSSR />
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
      loadouts,
    ] = await Promise.all([
      getFeaturedGuides(),
      getAllEvents(),
      //getCurrentEvents({ currentDate: new Date().toISOString() }),
      getFutureEvents({ currentDate: new Date().toISOString() }),
      prisma.dump.costume.findMany({
        orderBy: {
          release_time: "desc",
        },
        include: {
          character: true,
        },
        take: 4,
      }),
      prisma.dump.notification.findMany({
        take: 10,
        orderBy: {
          release_time: "desc",
        },
      }),
      prisma.nrg.loadouts.findMany({
        take: 6,
        orderBy: {
          votes: "desc",
        },
      }),
    ]);

    const recentWeapons = await prisma.dump.weapon.findMany({
      take: 6,
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
          loadouts,
        })
      ),
      revalidate: 43200, // 12 hours in seconds (2 updates per day)
    };
  } catch (error) {
    console.log("Homepage: ", error.message);
  }
}
