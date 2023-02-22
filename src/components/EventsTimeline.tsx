/* eslint-disable react/no-render-return-value */
import { Event } from "@models/types";
import { useEffect, useRef } from "react";
import { Timeline } from "vis-timeline/standalone";
import sub from "date-fns/sub";
import Link from "next/link";
import { BtnSecondary } from "./btn";
import { useMedia } from "react-use";
import { EventsListing } from "pages/events";
import { useSettingsStore } from "@store/settings";
import { eventsTypes } from "@utils/eventsTypes";

const GROUPS = Object.entries(eventsTypes).map(([, group]) => group.label);

const groups = GROUPS.map((group, id) => ({
  id,
  content: group,
}));

export default function EventsTimeline({
  items,
  hasBtn = false,
}: {
  items: Event[];
  hasBtn?: boolean;
}) {
  const isMobile = useMedia("(max-width: 1279px)", true);
  const eventsDisplayType = useSettingsStore(
    (state) => state.eventsDisplayType
  );
  const visualization = useRef(null);

  /**
   * Events listing
   */
  const eventsGroups = GROUPS.reduce((acc, group) => {
    const list = items.filter((item) => {
      return (
        item.attributes.title.includes(group) &&
        new Date(item.attributes.end_date).getTime() > Date.now()
      );
    });

    acc[group] = list;
    return acc;
  }, {});

  /**
   * Timeline
   */
  const visItems = items.map((item, id) => {
    const associatedGroup = groups.find((group) =>
      item.attributes.title.includes(group.content)
    );

    const visItem = {
      id,
      content: item.attributes.title,
      start: item.attributes.start_date,
      end: item.attributes.end_date,
      group: associatedGroup?.id,
      selectable: false,
      className: "bg-beige",
      limitSize: false,
      slug: item.attributes.slug,
      image:
        item.attributes.image.data.attributes.formats.large?.url ??
        item.attributes.image.data.attributes.formats.medium?.url ??
        item.attributes.image.data.attributes.formats.small?.url ??
        item.attributes.image.data.attributes.formats.thumbnail.url,
    };

    return visItem;
  });

  useEffect(() => {
    if (!visualization.current || eventsDisplayType === "listing" || isMobile) {
      return;
    }

    const timeline = new Timeline(visualization.current, visItems, {
      start: sub(new Date(), { weeks: 1 }),
      horizontalScroll: true,
      zoomKey: "ctrlKey",
      orientation: "top",
      dataAttributes: ["image"],
      template: (item) => {
        return `<a href="/event/${item.slug}">
          <h4>${item.content}</h4>
          <img src="${item.image}" />
        </a>`;
      },
    });
    timeline.setGroups(groups);
  }, [visualization, eventsDisplayType, isMobile]);

  if (isMobile || eventsDisplayType === "listing") {
    return (
      <div className="px-4 md:px-0">
        {GROUPS.map((group) => {
          const events = eventsGroups[group];
          if (events.length === 0) return null;
          return (
            <EventsListing
              key={group}
              label={group}
              events={events}
              containerClasses="my-8"
              cardClasses="grid grid-cols-1"
              cardContainerClasses="grid lg:grid-cols-2 gap-16"
            />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-[10rem]" ref={visualization}></div>
      {hasBtn && (
        <div className="flex justify-center mt-8">
          <Link href="/events" passHref legacyBehavior>
            <BtnSecondary>See all events</BtnSecondary>
          </Link>
        </div>
      )}
    </div>
  );
}
