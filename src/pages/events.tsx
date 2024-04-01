import Meta from "@components/Meta";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/legacy/image";
import Link from "next/link";
import Layout from "@components/Layout";
import { getAllEvents } from "@models/event";
import { Event } from "@models/types";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import TierlistTab from "@components/tierlist/TierListTab";
import classNames from "classnames";
import { FiClock } from "react-icons/fi";
import { MdHourglassEmpty, MdHourglassTop } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { CostumeThumbnailPin } from "@components/characters/CostumeThumbnailPin";
import useSWR from "swr";
import { fetcher } from "@utils/fetcher";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { eventsTypes } from "@utils/eventsTypes";

interface GuidesProps {
  events: Event[];
  groups: any;
}

export default function Events({ events, groups }: GuidesProps): JSX.Element {
  const GROUPS = Object.entries(groups);

  return (
    <Layout>
      <Meta
        title="Events"
        description="A list of all past and current events."
        cover="https://nierrein.guide/cover-events.jpg"
      />

      <section>
        <h2 className="overlap">Events</h2>
        <Tabs.Root
          className="grid items-start md:grid-cols-12"
          defaultValue="All"
        >
          <Tabs.List className="md:col-span-2 md:sticky md:top-16">
            <TierlistTab className="w-full" index="All">
              <span className="text-base text-shadow text-white">All</span>
            </TierlistTab>

            {GROUPS.map(([, value], index) => {
              const activeEvents: Event[] = value.events.filter(
                (item: Event) =>
                  new Date(item.attributes.end_date).getTime() > Date.now()
              );

              return (
                <TierlistTab
                  key={value.label}
                  index={value.label}
                  className="w-full"
                >
                  <span className="text-base text-shadow text-white">
                    {value.label}
                  </span>
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
          </Tabs.List>

          <div className="mt-12 md:mt-0 md:col-span-10">
            <Tabs.Content value="All">
              <EventsListing
                type="all"
                containerClasses="md:px-12"
                label="All events"
                events={events}
              />
            </Tabs.Content>

            {GROUPS.map(([type, value]) => (
              <Tabs.Content key={value.label} value={value.label}>
                <EventsListing
                  type={type}
                  containerClasses="md:px-12"
                  label={value.label}
                  events={value.events}
                />
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </section>
    </Layout>
  );
}

export function EventsListing({
  type = "",
  label,
  events,
  containerClasses = "",
  cardContainerClasses = "flex flex-col gap-y-12 mx-auto",
  cardClasses = "grid grid-cols-1 md:grid-cols-2",
}: {
  type: string;
  label: string;
  events: Event[];
  containerClasses?: string | string[];
  cardContainerClasses?: string | string[];
  cardClasses?: string | string[];
}) {
  return (
    <div className={classNames(containerClasses)}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="flex gap-x-2 items-center text-3xl">
          {eventsTypes[type]?.icon}
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
  const isInFuture = startDate > new Date();
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
            "border-beige border-opacity-20": isEnded && !isInFuture,
            "border-green-300 border-opacity-60":
              !isEnded && !isNearlyEnded && !isInFuture,
            "border-orange-300 border-opacity-60":
              isNearlyEnded && !isEnded && !isInFuture,
            "border-violet-400": isInFuture,
          }
        )}
      >
        <div className="flex flex-col justify-between p-6">
          <h3 className="flex items-baseline gap-x-2 text-2xl text-beige mb-2 md:mb-0">
            <span
              className={classNames("inline-block rounded-full h-3 w-3", {
                "bg-red-300": isEnded && !isInFuture,
                "bg-green-300": !isEnded && !isNearlyEnded && !isInFuture,
                "bg-orange-300": isNearlyEnded && !isEnded && !isInFuture,
                "bg-violet-400": isInFuture,
              })}
            ></span>
            <span className="flex-1">{attributes.title}</span>
          </h3>
          <div>
            <p className="text-sm flex gap-x-1 items-center">
              {!isEnded && !isInFuture && (
                <>
                  <MdHourglassTop />{" "}
                  <span>Ends in {formatDistanceToNow(endDate)}</span>
                </>
              )}
              {isInFuture && (
                <>
                  <MdHourglassEmpty />{" "}
                  <span>Starts in {formatDistanceToNow(startDate)}</span>
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

        {attributes?.image && (
          <img
            layout="responsive"
            src={
              attributes.image?.data?.attributes?.formats?.large?.url ??
              attributes.image?.data?.attributes?.formats?.medium?.url ??
              attributes.image?.data?.attributes?.formats?.small?.url
            }
            alt={`${attributes.title} thumbnail`}
            height={
              attributes.image?.data?.attributes?.formats?.large?.height ??
              attributes.image?.data?.attributes?.formats?.medium?.height ??
              attributes.image?.data?.attributes?.formats?.small?.height
            }
            width={
              attributes.image?.data?.attributes?.formats?.large?.width ??
              attributes.image?.data?.attributes?.formats?.medium?.width ??
              attributes.image?.data?.attributes?.formats?.small?.width
            }
          />
        )}

        <Link
          href={`/event/${attributes.slug}`}
          passHref={true}
          title="View event"
          className="absolute inset-0"
        >
          <span className="sr-only">View event</span>
        </Link>

        {isNearlyEnded && !isEnded && !isInFuture && (
          <span className="inline-block py-1 px-2 bg-orange-300 text-black absolute -top-4 md:-right-4 text-sm">
            Ends in {formatDistanceToNow(endDate)}!
          </span>
        )}

        {isInFuture && (
          <span className="inline-block py-1 px-2 bg-grey-dark text-violet-400 absolute -top-4 md:-right-4 text-sm border border-violet-400 border-opacity-50">
            Starts in {formatDistanceToNow(startDate)}!
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
            <h3 className="text-xl text-beige mb-2">
              Obtainable costume{costumes.length > 1 ? "s" : ""}
            </h3>
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
  const events = await getAllEvents({});

  const groups = {};

  for (const [type, value] of Object.entries(eventsTypes)) {
    groups[type] = {
      events: events.filter((event) => event.attributes.type === type),
      label: value.label,
    };
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        events,
        groups,
      })
    ),
  };
}
