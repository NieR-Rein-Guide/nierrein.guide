import Image from "next/image";
import Link from "next/link";
import { Event } from "@models/types";
import { formatDistanceToNow } from "date-fns";

interface CurrentEventsProps {
  events: Event[];
}

export default function CurrentEvents({
  events,
}: CurrentEventsProps): JSX.Element {
  return (
    <section>
      <h2 className="left-1/2 -translate-x-1/2">
        Current Event{events.length > 1 ? "s" : null}
      </h2>

      <div className="flex flex-col gap-y-4">
        {events.map((event) => (
          <div key={event.title} className="flex flex-col place-items-center">
            <div className="w-full relative">
              <Image
                layout="responsive"
                src={
                  event.image.formats.medium?.url ??
                  event.image.formats.small?.url
                }
                alt={`${event.title} thumbnail`}
                height={
                  event.image.formats.medium?.height ??
                  event.image.formats.small?.height
                }
                width={
                  event.image.formats.medium?.width ??
                  event.image.formats.small?.width
                }
              />
            </div>
            <h3 className="text-4xl xl:text-xl text-beige mb-2 xl:mb-0 mt-4">
              {event.title}
            </h3>
            Ends in {formatDistanceToNow(new Date(event.end_date))}
            <Link href={`/event/${event.slug}`} passHref={true}>
              <a className="mt-2 btn">See Event</a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
