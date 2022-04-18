import Meta from "@components/Meta";
import { Tabs, TabList, TabPanels, TabPanel } from "@reach/tabs";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/Layout";
import { getAllEvents } from "@models/event";
import { Event } from "@models/types";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import TierlistTab from "@components/tierlist/TierListTab";

interface GuidesProps {
  events: Event[];
}

export default function Events({ events }: GuidesProps): JSX.Element {
  const [tabIndex] = useState(0);

  const allEvents = events.map((event) => ({
    ...event,
    endDate: new Date(event.end_date),
    startDate: new Date(event.start_date),
  }));

  const pastEvents = allEvents.filter((event) => event.endDate < new Date());
  const currentEvents = allEvents.filter((event) => event.endDate > new Date());

  return (
    <Layout>
      <Meta
        title="Events"
        description="A list of all past and current events."
        cover="https://nierrein.guide/cover-events.jpg"
      />
      <Tabs defaultIndex={tabIndex}>
        <TabList className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <TierlistTab index={0}>Current Events</TierlistTab>
          <TierlistTab index={1}>Past Events</TierlistTab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <EventsListing label="Current Events" events={currentEvents} />
          </TabPanel>
          <TabPanel>
            <EventsListing label="Past Events" events={pastEvents} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

function EventsListing({ label, events }) {
  return (
    <section className="mt-24">
      <h2 className="overlap">{label}</h2>

      {events.length > 0 && (
        <h2 className="font-labor text-2xl mb-4">
          There is a total of {events.length} events
        </h2>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {events.map((event) => (
          <Link key={event.slug} href={`/event/${event.slug}`} passHref={true}>
            <a className="group flex flex-col relative w-full max-w-xl mx-auto">
              <div className="transform group-hover:scale-110 transition-transform ease-out-cubic border-4 border-beige">
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
              </div>
              <div className="py-6">
                <h3 className="text-2xl text-beige">{event.title}</h3>
                <span>
                  {(event.endDate.getTime() <= Date.now() && (
                    <span>
                      Ended {event.endDate.toLocaleDateString()} (
                      {formatDistanceToNow(event.endDate)})
                    </span>
                  )) || (
                    <span>
                      Ends in {formatDistanceToNow(new Date(event.end_date))}
                    </span>
                  )}
                </span>
              </div>
            </a>
          </Link>
        ))}

        {events.length === 0 && <h2 className="text-2xl">No past events</h2>}
      </div>
    </section>
  );
}

export async function getStaticProps(context) {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
  };
}
