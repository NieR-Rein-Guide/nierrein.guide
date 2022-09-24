/* eslint-disable react/no-render-return-value */
import { Event } from "@models/types";
import { useEffect, useRef } from "react";
import { Timeline } from "vis-timeline/standalone";
import sub from "date-fns/sub";
import Link from "next/link";
import { BtnSecondary } from "./btn";

const GROUPS = [
  "Abyss Tower",
  "Record",
  "Variation",
  "Anecdote",
  "Premium Summons",
];

export default function EventsTimeline({ items }: { items: Event[] }) {
  const visualization = useRef(null);

  const groups = GROUPS.map((group, id) => ({
    id,
    content: group,
  }));

  const visItems = items.map((item, id) => {
    const associatedGroup = groups.find((group) =>
      item.title.includes(group.content)
    );

    const visItem = {
      id,
      content: item.title,
      start: item.start_date,
      end: item.end_date,
      group: associatedGroup?.id,
      selectable: false,
      className: "bg-beige",
      limitSize: false,
      style:
        'background-image: url("https://reinguide-assets.s3.eu-central-1.wasabisys.com/large_Fc_LR_4_G9a_UAI_Vql8_ad961b7d96.jpg")',
      slug: item.slug,
      image:
        item.image.formats.large?.url ??
        item.image.formats.medium?.url ??
        item.image.formats.small?.url ??
        item.image.formats.thumbnail.url,
    };

    return visItem;
  });

  useEffect(() => {
    if (!visualization.current) {
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
  }, [visualization]);

  return (
    <div>
      <div className="min-h-[10rem]" ref={visualization}></div>
      <div className="flex justify-center mt-8">
        <Link href="/events" passHref>
          <BtnSecondary>See all events</BtnSecondary>
        </Link>
      </div>
    </div>
  );
}
