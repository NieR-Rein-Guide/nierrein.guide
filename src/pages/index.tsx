import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "@components/Layout";
import JoinUs from "@components/JoinUs";
import FeaturedGuides from "@components/FeaturedGuides";
import Meta from "@components/Meta";
import { getFeaturedGuides } from "@models/guide";
import { Guide, Event } from "@models/types";
import { getAllEvents } from "@models/event";
import prisma from "@libs/prisma";
import { BtnSecondary } from "@components/btn";
import { character, costume, notification, weapon } from "@prisma/client";
import { loadouts } from "@prisma/client-nrg";
import LoadoutListingItem from "@components/LoadoutListingItem";
import NewCostumes from "@components/NewCostumes";
import NewWeapons from "@components/NewWeapons";
import NewNotices from "@components/NewNotices";
import alterWeaponToAddCostume from "@utils/alterWeaponToAddCostume";
import alterCostumeToAddWeapon from "@utils/alterCostumeToAddWeapon";
import { MAMA_INVITE_URL } from "@config/constants";
import { useSettingsStore } from "@store/settings";
import classNames from "classnames";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MdViewList } from "react-icons/md";
import { CiViewTimeline } from "react-icons/ci";
const EventsTimeline = dynamic(() => import("../components/EventsTimeline"), {
  ssr: false,
});
const DailyInfoWithNoSSR = dynamic(() => import("../components/DailyQuests"), {
  ssr: false,
});

type Costume = costume & {
  character: character;
  weapon: weapon;
};

type Weapon = weapon & {
  costume: costume;
};

interface HomeProps {
  featuredGuides: Guide[];
  events: Event[];
  recentCostumes: Costume[];
  recentWeapons: Weapon[];
  notifications: notification[];
  loadouts: loadouts[];
}

export default function Home({
  featuredGuides = [],
  events = [],
  recentCostumes = [],
  recentWeapons = [],
  notifications = [],
  loadouts = [],
}: HomeProps): JSX.Element {
  const eventsDisplayType = useSettingsStore(
    (state) => state.eventsDisplayType
  );
  const setEventsDisplayType = useSettingsStore(
    (state) => state.setEventsDisplayType
  );

  return (
    <Layout hasContainer={false}>
      <Meta />

      <div className="grid md:grid-cols-2 mb-16 md:mb-0 px-8 gap-8">
        <div
          className="strawpoll-embed flex flex-col max-w-xl w-full h-96 place-self-end"
          id="strawpoll_NoZr3q46Gy3"
        >
          <iframe
            title="StrawPoll Embed"
            id="strawpoll_iframe_NoZr3q46Gy3"
            src="https://strawpoll.com/embed/polls/NoZr3q46Gy3"
            className="static visible block w-full flex-1"
            frameBorder="0"
            allowFullScreen
            allowTransparency
          >
            Loading...
          </iframe>
        </div>

        <div
          className="strawpoll-embed flex flex-col max-w-xl w-full h-96 place-self-start"
          id="strawpoll_PKgl3675anp"
        >
          <iframe
            title="StrawPoll Embed"
            id="strawpoll_iframe_PKgl3675anp"
            src="https://strawpoll.com/embed/polls/PKgl3675anp"
            className="static visible block w-full flex-1"
            frameBorder="0"
            allowFullScreen
            allowTransparency
          >
            Loading...
          </iframe>
        </div>
      </div>

      <div className="flex flex-col gap-x-12 gap-y-16 md:gap-y-32">
        <div className="relative bg-grey-dark border-y border-beige border-opacity-50 lg:pt-16 pb-8">
          <div className="container">
            <div className="absolute -top-4">
              <div className="absolute">
                <h3 className="relative mb-4">
                  <span className="absolute left-12 inline-block text-2xl -top-5">
                    Notices
                  </span>
                  <img
                    className="max-w-none"
                    src="/decorations/parts_decoration_head.png"
                    alt=""
                  />
                </h3>
              </div>
            </div>
          </div>
          <div className="container">
            <NewNotices notifications={notifications} />
          </div>
        </div>

        <div className="container">
          <div
            className={classNames(
              "hidden lg:flex items-center justify-between",
              eventsDisplayType === "timeline" ? "mb-4" : ""
            )}
          >
            <Link href="/events" passHref>
              <a className="btn">See all events</a>
            </Link>

            <ToggleButtonGroup
              className="mb-6"
              value={eventsDisplayType}
              exclusive
              onChange={(e, newValue) => setEventsDisplayType(newValue)}
              aria-label="View"
            >
              <ToggleButton value="listing" aria-label="listing">
                <MdViewList /> <p className="ml-2">Listing</p>
              </ToggleButton>
              <ToggleButton value="timeline" aria-label="timeline">
                <CiViewTimeline /> <p className="ml-2">Timeline</p>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <EventsTimeline items={events} />
        </div>

        <div>
          <div className="bg-grey-dark border-y border-beige border-opacity-50">
            <NewCostumes costumes={recentCostumes} />
          </div>
          <div className="bg-grey-dark border-y border-beige border-opacity-50">
            <NewWeapons weapons={recentWeapons} />
          </div>
        </div>

        {/* NEW LOADOUTS */}
        <div className="container">
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

        <div className="container">
          <FeaturedGuides guides={featuredGuides} />
        </div>
        <div className="container">
          <DailyInfoWithNoSSR />
        </div>
        <div className="container">
          <div className="bg-grey-lighter rounded-lg pt-8 px-4 pb-64 border border-beige border-opacity-50"></div>

          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:px-24 -mt-64">
            <div className="text-center md:max-w-md">
              <div className="p-4 pb-6 bg-grey-dark max-w-xs mx-auto rounded-xl">
                <div className="flex items-center justify-center mb-6">
                  <img
                    className="h-10 w-10"
                    src="/images/mama-direct.png"
                    alt="Mama"
                  />
                  <h4 className="text-xl ml-2">
                    Mama
                    <span className="inline-block p-1 bg-[#5865F2] rounded-md text-xs font-labor ml-2">
                      BOT
                    </span>
                  </h4>
                </div>
                <a
                  href={MAMA_INVITE_URL}
                  className="rounded-sm bg-[#5865F2] hover:bg-opacity-80 focus:bg-opacity-60 transition ease-out-cubic text-sm py-2 px-8 text-center -mt-12"
                >
                  Add to Server
                </a>
              </div>
              <img
                className="w-full px-8 md:px-0 mt-8 rounded-lg transition-transform transform hover:-translate-y-2"
                src="/images/mama-costume.jpg"
                alt="Mama Costume Embed"
              />
            </div>
            <img
              className="w-full px-8 md:px-0 rounded-lg transition-transform transform hover:-translate-y-2 "
              src="/images/mama-weapon.jpg"
              alt="Mama Weapon Embed"
            />
          </div>
        </div>
        <div className="container">
          <JoinUs />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    console.time("Homepage props");
    const [
      featuredGuides,
      events,
      recentCostumes,
      notificationsData,
      loadouts,
    ] = await Promise.all([
      getFeaturedGuides(),
      getAllEvents(),
      prisma.dump.costume.findMany({
        orderBy: {
          release_time: "desc",
        },
        include: {
          character: true,
          emblem: true,
        },
        take: 6,
      }),
      prisma.dump.notification.findMany({
        take: 20,
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

    for (const costume of recentCostumes) {
      await alterCostumeToAddWeapon(costume);
    }

    for (const weapon of recentWeapons) {
      await alterWeaponToAddCostume(weapon);
    }

    const notifications = notificationsData.map((notification) => ({
      ...notification,
      body: notification.body.replaceAll(
        "/images/",
        "https://web.app.nierreincarnation.com/images/"
      ),
    }));

    if (notifications.length === 0 || recentCostumes.length === 0) {
      throw new Error("Database is empty.");
    }

    console.timeEnd("Homepage props");

    return {
      props: JSON.parse(
        JSON.stringify({
          featuredGuides,
          events,
          recentCostumes,
          notifications,
          recentWeapons,
          loadouts,
        })
      ),
      revalidate: 30, // Revalidate every 30s
    };
  } catch (error) {
    console.log("Homepage: ", error.message);
  }
}
