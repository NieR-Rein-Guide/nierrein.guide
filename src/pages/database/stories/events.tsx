import Layout from "@components/Layout";
import Meta from "@components/Meta";
import Link from "next/link";
import SVG from "react-inlinesvg";
import prisma from "@libs/prisma";
import { event } from "@prisma/client";
import { CDN_URL } from "@config/constants";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Squares from "@components/decorations/Squares";
import StoriesLayout from "@components/Layout/StoriesLayout";

interface Props {
  events: event[];
}

export default function DatabaseStories({ events }: Props): JSX.Element {
  const [eventIndex, setEventIndex] = useState(events[0].id);

  return (
    <Layout>
      <Meta
        title="Events stories - Database"
        description="Events stories"
        cover="https://nierrein.guide/cover-stories.jpg"
      />

      <nav className="mb-16">
        <Link href="/database" passHref={true} className="btn">
          <SVG src="/decorations/arrow-left.svg" className="h-6" />
          <span>Return to Database</span>
        </Link>
      </nav>

      <StoriesLayout>
        <div className="relative">
          <div className="flex items-center gap-y-4 gap-x-4 bg-grey-dark border border-beige border-opacity-50 p-4 mb-8">
            <FormControl className="flex-1">
              <InputLabel id="season-index">Event</InputLabel>
              <Select
                labelId="season-index"
                value={eventIndex}
                label="Type"
                onChange={(e) => {
                  setEventIndex(e.target.value);
                }}
              >
                {events.map((event) => (
                  <MenuItem
                    className="flex items-center justify-between"
                    key={event.id}
                    value={event.id}
                  >
                    <span>{event.name}</span>
                    <img
                      className="h-16"
                      src={`${CDN_URL}${event.image_path}.png`}
                      alt={event.name}
                      loading="lazy"
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <article className="relative bordered bg-grey-dark p-4 rounded-lg">
            <Squares />
            {events
              .filter((event) => event.id === eventIndex)
              .map((event) => (
                <div key={event.id}>
                  {event.stories.map(({ story, image_path }, index) => (
                    <div key={index} className="my-4">
                      <img
                        className="mb-4"
                        src={`${CDN_URL}${image_path}`}
                        alt={`Story ${index + 1} image`}
                        loading="lazy"
                      />
                      <p
                        className="whitespace-pre-wrap mb-4 pl-4"
                        dangerouslySetInnerHTML={{
                          __html: story,
                        }}
                      ></p>
                    </div>
                  ))}
                </div>
              ))}
          </article>
        </div>
      </StoriesLayout>
    </Layout>
  );
}

export async function getStaticProps() {
  const events = await prisma.dump.event.findMany();

  return {
    props: JSON.parse(
      JSON.stringify({
        events,
      })
    ),
  };
}
