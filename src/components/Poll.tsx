import { Event } from "@models/types";


interface PollProps {
  event: Event;
}

export default function Poll({ event }: PollProps): JSX.Element {
  return (
    <section className="px-0 pb-0">
      <h2 className="overlap left-1/2 -translate-x-1/2 w-11/12">
        Is it worth pulling on this banner ?
      </h2>

      <div key={event.title} className="flex flex-col relative">
        <img
          layout="responsive"
          src={event.image.formats.small.url}
          alt={`${event.title} thumbnail`}
          height={event.image.formats.small.height}
          width={event.image.formats.small.width}
        />
        <div dangerouslySetInnerHTML={{ __html: event.poll.embed }}></div>
      </div>
    </section>
  );
}
