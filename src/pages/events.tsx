import Meta from "@components/Meta";
import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/Layout";
import { getAllEvents } from "@models/event";
import { Event } from "@models/types";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import TierlistTab from "@components/tierlist/TierListTab";
import classNames from "classnames";
import { FiClock } from "react-icons/fi";
import { MdHourglassTop } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

interface GuidesProps {
  events: Event[];
}

const GROUPS = [
  "Record",
  "Premium Summons",
  "Weekly Summons",
  "Abyss Tower",
  "Variation",
  "Anecdote",
];

export default function Events({ events }: GuidesProps): JSX.Element {
  const [tabIndex] = useState(0);

  const eventsGroups = GROUPS.reduce((acc, group) => {
    const items = events.filter((item) => {
      return item.title.includes(group);
    });

    acc[group] = items;
    return acc;
  }, {});

  return (
    <Layout hasContainer={false}>
      <Meta
        title="Events"
        description="A list of all past and current events."
        cover="https://nierrein.guide/cover-events.jpg"
      />

      <Tabs className="container" defaultIndex={tabIndex}>
        <TabList className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {GROUPS.map((group, index) => {
            const activeEvents = eventsGroups[group].filter(
              (item) => new Date(item.end_date).getTime() > Date.now()
            );
            return (
              <TierlistTab
                key={index}
                index={index}
                style={{
                  background: activeEvents[0]
                    ? `url(${
                        activeEvents[0].image?.formats?.large?.url ??
                        activeEvents[0].image?.formats?.medium?.url ??
                        activeEvents[0].image?.formats?.small?.url
                      })`
                    : undefined,
                  backgroundPosition: "top",
                }}
              >
                <span className="text-shadow text-white">{group}</span>
                {activeEvents?.length > 0 && (
                  <span className="absolute top-0 right-4 md:-top-4 md:-right-4 text-xs mt-2">
                    <img src="/icons/costumes/awaken_rank_icon_default.png" />
                    <span className="font-labor absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 font-semibold text-white">
                      {activeEvents.length}
                    </span>
                  </span>
                )}
              </TierlistTab>
            );
          })}
        </TabList>

        <TabPanels>
          {GROUPS.map((group, index) => (
            <TabPanel key={index}>
              <EventsListing label={group} events={eventsGroups[group]} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

function EventsListing({ label, events }: { label: string; events: Event[] }) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl">{label}</h2>

        {events.length > 0 && (
          <p className="bg-brown px-2 py-1">{events.length} events</p>
        )}
      </div>

      <div className="flex flex-col gap-y-12 max-w-3xl mx-auto">
        {events.map((event) => {
          const endDate = new Date(event.end_date);
          const startDate = new Date(event.start_date);
          const isEnded = endDate.getTime() <= Date.now();
          const isNearlyEnded = differenceInDays(endDate, new Date()) <= 7;

          return (
            <div
              key={event.slug}
              className={classNames(
                "grid grid-cols-1 md:grid-cols-2 relative bg-grey-dark border transition-transform ease-out-cubic transform hover:-translate-y-1",
                {
                  "border-beige border-opacity-20": isEnded,
                  "border-green-300 border-opacity-60":
                    !isEnded && !isNearlyEnded,
                  "border-orange-300 border-opacity-60":
                    isNearlyEnded && !isEnded,
                }
              )}
            >
              <div className="flex flex-col justify-between p-6">
                <h3 className="flex items-baseline gap-x-2 text-2xl text-beige mb-2 md:mb-0">
                  <span
                    className={classNames("inline-block rounded-full h-3 w-3", {
                      "bg-red-300": isEnded,
                      "bg-green-300": !isEnded && !isNearlyEnded,
                      "bg-orange-300": isNearlyEnded && !isEnded,
                    })}
                  ></span>
                  <span className="flex-1">{event.title}</span>
                </h3>
                <div>
                  <p className="text-sm flex gap-x-1 items-center">
                    {!isEnded && (
                      <>
                        <MdHourglassTop />{" "}
                        <span>Ends in {formatDistanceToNow(endDate)}</span>
                      </>
                    )}
                    {isEnded && (
                      <>
                        <FaCalendarCheck />
                        <span>
                          Ended{" "}
                          {formatDistanceToNow(endDate, {
                            addSuffix: true,
                          })}{" "}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="flex gap-x-1 items-center text-sm">
                    <FiClock /> {differenceInDays(endDate, startDate)} days
                  </p>
                  <p className="text-xs">
                    {startDate.toLocaleDateString()} -{" "}
                    {endDate.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Image
                layout="responsive"
                src={
                  event.image?.formats?.large?.url ??
                  event.image?.formats?.medium?.url ??
                  event.image?.formats?.small?.url
                }
                alt={`${event.title} thumbnail`}
                height={
                  event.image?.formats?.large?.height ??
                  event.image?.formats?.medium?.height ??
                  event.image?.formats?.small?.height
                }
                width={
                  event.image?.formats?.large?.width ??
                  event.image?.formats?.medium?.width ??
                  event.image?.formats?.small?.width
                }
              />

              <Link href={`/event/${event.slug}`} passHref={true}>
                <a title="View event" className="absolute inset-0">
                  <span className="sr-only">View event</span>
                </a>
              </Link>

              {isNearlyEnded && !isEnded && (
                <span className="inline-block py-1 px-2 bg-orange-300 text-black absolute -top-4 md:-right-4 text-sm">
                  Ends in {formatDistanceToNow(endDate)}!
                </span>
              )}
            </div>
          );
        })}

        {events.length === 0 && <h2 className="text-2xl">No events</h2>}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 30, // Revalidate every 30s
  };
}
