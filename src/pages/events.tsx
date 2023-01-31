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
import { FiBook, FiClock } from "react-icons/fi";
import { MdHourglassTop } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { CostumeThumbnailPin } from "@components/characters/CostumeThumbnailPin";
import useSWR from "swr";
import { fetcher } from "@utils/fetcher";
import { useIntersectionObserver } from "react-intersection-observer-hook";

interface GuidesProps {
  events: Event[];
}

const GROUPS = [
  "Premium Summons",
  "Record",
  "Abyss Tower",
  "Variation",
  "Anecdote",
  "Weekly Summons",
];

const GROUPS_ICONS = {
  Record: <FiBook />,
  "Premium Summons": <img src="/icons/gem.png" alt="gem" />,
  "Weekly Summons": <img src="/icons/gem.png" alt="gem" />,
  "Abyss Tower": (
    <img src="/icons/tower.png" height="48" className="h-12" alt="tower" />
  ),
  Variation: <img src="/icons/variation-ticket.png" alt="tower" />,
  Anecdote: (
    <img src="/icons/panel.jpg" height="32" className="h-8" alt="panel" />
  ),
};

export default function Events({ events }: GuidesProps): JSX.Element {
  const [tabIndex] = useState(0);

  const eventsGroups = GROUPS.reduce((acc, group) => {
    const items = events.filter((item) => {
      return item.attributes.title.includes(group);
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
          <TierlistTab index={0} className="md:col-span-3">
            <span className="text-shadow text-white">All</span>
          </TierlistTab>

          {GROUPS.map((group, index) => {
            const activeEvents: Event[] = eventsGroups[group].filter(
              (item: Event) =>
                new Date(item.attributes.end_date).getTime() > Date.now()
            );

            return (
              <TierlistTab
                key={index + 1}
                index={index + 1}
                style={{
                  background: activeEvents[0]
                    ? `url(${activeEvents[0].attributes.image.data.attributes.formats.small?.url})`
                    : undefined,
                  backgroundPosition: "center",
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
          <TabPanel>
            <EventsListing label="All events" events={events} />
          </TabPanel>

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

export function EventsListing({
  label,
  events,
  cardContainerClasses = "flex flex-col gap-y-12 max-w-3xl mx-auto",
  cardClasses = "grid grid-cols-1 md:grid-cols-2",
}: {
  label: string;
  events: Event[];
  cardContainerClasses?: string | string[];
  cardClasses?: string | string[];
}) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="flex gap-x-2 items-center text-3xl">
          {GROUPS_ICONS[label]}
          {label}
        </h2>

        {events.length > 0 && (
          <p className="bg-brown px-2 py-1">
            {events.length} event{events.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className={classNames(cardContainerClasses)}>
        {events.map((event) => (
          <EventItem key={event.id} {...event} cardClasses={cardClasses} />
        ))}

        {events.length === 0 && <h2 className="text-2xl">No events</h2>}
      </div>
    </div>
  );
}

export function EventItem({
  id,
  attributes,
  cardClasses,
}: Event & { cardClasses?: string[] }) {
  const endDate = new Date(attributes.end_date);
  const startDate = new Date(attributes.start_date);
  const isEnded = endDate.getTime() <= Date.now();
  const isNearlyEnded = differenceInDays(endDate, new Date()) <= 7;
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  return (
    <div ref={ref}>
      <div
        className={classNames(
          cardClasses,
          "relative bg-grey-dark border transition-all hover:border-opacity-100",
          {
            "border-beige border-opacity-20": isEnded,
            "border-green-300 border-opacity-60": !isEnded && !isNearlyEnded,
            "border-orange-300 border-opacity-60": isNearlyEnded && !isEnded,
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
            <span className="flex-1">{attributes.title}</span>
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
            <div className="flex items-end justify-between">
              <p className="text-xs">
                {startDate.toLocaleDateString()} -{" "}
                {endDate.toLocaleDateString()}
              </p>

              {attributes.gems && (
                <p className="flex items-center gap-x-2 text-rarity-4">
                  <img
                    className="h-6"
                    height="24"
                    src="/icons/gem.png"
                    alt="gem"
                  />
                  <span>{attributes.gems}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <Image
          layout="responsive"
          src={
            attributes.image?.data.attributes.formats?.large?.url ??
            attributes.image?.data.attributes.formats?.medium?.url ??
            attributes.image?.data.attributes.formats?.small?.url
          }
          alt={`${attributes.title} thumbnail`}
          height={
            attributes.image?.data.attributes.formats?.large?.height ??
            attributes.image?.data.attributes.formats?.medium?.height ??
            attributes.image?.data.attributes.formats?.small?.height
          }
          width={
            attributes.image?.data.attributes.formats?.large?.width ??
            attributes.image?.data.attributes.formats?.medium?.width ??
            attributes.image?.data.attributes.formats?.small?.width
          }
        />

        <Link href={`/event/${attributes.slug}`} passHref={true}>
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

      {isVisible && <EventCostumes id={id} />}
    </div>
  );
}

function EventCostumes({ id }: { id: number }) {
  const { data: costumes, isLoading } = useSWR(
    `/api/event/costumes/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <>
      {!isLoading && costumes?.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-x-4 bg-grey-dark border border-beige border-opacity-30 border-t-0 p-4 transition-transform ease-out-cubic transform group-hover:-translate-y-1">
          <div className="col-span-5">
            <h3 className="text-xl text-beige mb-2">Obtainable costumes</h3>
          </div>

          {costumes.map((costume) => (
            <CostumeThumbnailPin costume={costume} key={costume.costume_id} />
          ))}
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: JSON.parse(
      JSON.stringify({
        events,
      })
    ),
    revalidate: 30, // Revalidate every 30s
  };
}
