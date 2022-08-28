import { Event } from "@models/types";
import Calendar from "@components/Calendar";

interface EventsSlider {
  currentEvents: Event[];
}

export default function EventsSlider({
  currentEvents,
}: EventsSlider): JSX.Element {
  const groups = currentEvents.map((event, index) => ({
    id: index,
    title: event.title,
  }));

  const items = currentEvents.map((event, index) => ({
    id: index,
    group: index,
    title: event.title,
    start_time: new Date(event.start_date),
    end_time: new Date(event.end_date),
    canMove: false,
    canResize: false,
    image: event.image,
    slug: event.slug,
  }));

  return <Calendar items={items} groups={groups} />;
}
